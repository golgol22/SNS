const { validationResult } = require("express-validator");
const PostService = require("../services/post.service");
const response = require("../utils/response");
const accessUrl = require("../utils/accessUrl");
const logger = require("../utils/winston");

class PostController {
  static async createPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors.map(obj => obj.msg) });
    }
    logger.info(accessUrl.CREATE);
    const userId = req.user.id;
    const { title, content, hashtags } = req.body;
    try {
      await PostService.setPost(userId, title, content, hashtags);
      logger.info(`[${accessUrl.CREATE}] ${userId} ${response.CREATE}`);
      res.status(201).json({ message: response.CREATE });
    } catch (err) {
      logger.error(`[${accessUrl.CREATE}] ${userId} ${err}`);
      res.status(500).json({ message: response.CREATE_FAIL });
    }
  }

  static async updatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors.map(obj => obj.msg) });
    }
    logger.info(accessUrl.UPDATE);
    const userId = req.user.id;
    const postId = req.params.postId;
    const { title, content, hashtags } = req.body;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.UPDATE}] ${userId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const writer = await PostService.getWriter(postId);
      if (userId != writer) {
        logger.warn(`[${accessUrl.UPDATE}] ${userId} ${response.FORBIDDEN}`);
        return res.status(403).json(response.FORBIDDEN);
      }
      await PostService.setUpdatePost(postId, title, content, hashtags);
      logger.info(`[${accessUrl.UPDATE}] ${userId} ${response.UPDATE}`);
      res.status(200).json({ message: response.UPDATE });
    } catch (err) {
      logger.error(`[${accessUrl.UPDATE}] ${userId} ${err}`);
      res.status(500).json({ message: response.UPDATE_FAIL });
    }
  }

  static async deletePost(req, res) {
    logger.info(accessUrl.DELETE);
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.DELETE}] ${userId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      if (isExist.state == 1) {
        logger.warn(`[${accessUrl.DELETE}] ${userId} ${response.DELETE_ALREADY}`);
        return res.status(400).json({ message: response.DELETE_ALREADY });
      }
      const writer = await PostService.getWriter(postId);
      if (userId != writer) {
        logger.warn(`[${accessUrl.DELETE}] ${userId} ${response.FORBIDDEN}`);
        return res.status(403).json(response.FORBIDDEN);
      }
      await PostService.setDeletePost(postId);
      logger.info(`[${accessUrl.DELETE}] ${userId} ${response.DELETE}`);
      res.status(200).json({ message: response.DELETE });
    } catch (err) {
      logger.error(`[${accessUrl.DELETE}] ${userId} ${err}`);
      res.status(500).json({ message: response.DELETE_FAIL });
    }
  }

  static async detailPost(req, res) {
    logger.info(accessUrl.DETAIL);
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.DETAIL}] ${userId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const haveSeen = await PostService.getPostLog(postId, userId);
      if (haveSeen) {
        await PostService.setAddMyViews(haveSeen.id);
      } else {
        await PostService.setPostLog(postId, userId);
        await PostService.setAddViews(postId);
      }
      const detailPostInfo = await PostService.getDetail(postId);
      logger.info(`[${accessUrl.DETAIL}] ${userId} ${response.DETAIL}`);
      res.status(200).json({
        message: response.DETAIL,
        detailInfo: detailPostInfo,
      });
    } catch (err) {
      logger.error(`[${accessUrl.DETAIL}] ${userId} ${err}`);
      res.status(500).json({ message: response.DETAIL_FAIL });
    }
  }

  static async deletedListPost(req, res) {
    logger.info(accessUrl.DELETEDLIST);
    const userId = req.user.id;
    try {
      const deletedListInfo = await PostService.getDeletedList(userId);
      if (deletedListInfo.length == 0) {
        logger.info(`[${accessUrl.DELETEDLIST}] ${userId} ${response.DELETE_LIST_NONE}`);
        return res.status(200).json({ message: response.DELETE_LIST_NONE });
      }
      logger.info(`[${accessUrl.DELETEDLIST}] ${userId} ${response.DELETE_LIST}`);
      res.status(200).json({
        message: response.DELETE_LIST,
        deletedListInfo: deletedListInfo,
      });
    } catch (err) {
      logger.error(`[${accessUrl.DELETEDLIST}] ${userId} ${err}`);
      res.status(500).json({ message: response.DELETE_LIST_FAIL });
    }
  }

  static async restorePost(req, res) {
    logger.info(accessUrl.RESTORE);
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.RESTORE}] ${userId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const writer = await PostService.getWriter(postId);
      if (userId != writer) {
        logger.warn(`[${accessUrl.RESTORE}] ${userId} ${response.FORBIDDEN}`);
        return res.status(403).json(response.FORBIDDEN);
      }
      await PostService.setRestorePost(postId);
      logger.info(`[${accessUrl.RESTORE}] ${userId} ${response.RESTORE}`);
      res.status(200).json({ message: response.RESTORE });
    } catch (err) {
      logger.error(`[${accessUrl.RESTORE}] ${userId} ${err}`);
      res.status(500).json({ message: response.RESTORE_FAIL });
    }
  }

  static async likePost(req, res) {
    logger.info(accessUrl.LIKE);
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.LIKE}] ${userId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const isClickedLikePost = await PostService.getClickedLikePost(postId, userId);
      if (isClickedLikePost) {
        await PostService.setMinusLikes(postId);
        await PostService.setMinusLikeUser(postId, userId);
        logger.info(`[${accessUrl.LIKE}] ${userId} ${response.LIKE_CANCEL}`);
        return res.status(200).json({ message: response.LIKE_CANCEL });
      }
      await PostService.setAddLikes(postId);
      await PostService.setAddLikeUser(postId, userId);
      logger.info(`[${accessUrl.LIKE}] ${userId} ${response.LIKE}`);
      res.status(200).json({ message: response.LIKE });
    } catch (err) {
      logger.error(`[${accessUrl.LIKE}] ${userId} ${err}`);
      res.status(500).json({ message: response.LIKE_FAIL });
    }
  }

  static async ListPost(req, res) {
    logger.info(accessUrl.LIST);
    const userId = req.user.id;
    let { search, sort, orderBy, hashtags, perPage, page } = req.query;
    if (search == undefined) {
      search = "";
    }
    if (sort == undefined) {
      sort = "createdAt";
    }
    if (orderBy == undefined) {
      orderBy = "desc";
    }
    if (hashtags == undefined) {
      hashtags = null;
    }
    if (perPage == undefined) {
      perPage = 10;
    } else {
      perPage *= 1;
    }
    if (page == undefined) {
      page = 1;
    } else {
      page *= 1;
    }
    const filter = { search: search, sort: sort, orderBy: orderBy, hashtags: hashtags, perPage: perPage, page: page };
    try {
      const listInfo = await PostService.getList(search, sort, orderBy, hashtags, perPage, page);
      if (listInfo.length == 0) {
        logger.info(`[${accessUrl.LIST}] ${userId} ${response.LIST_NONE}`);
        return res.status(200).json({
          message: response.LIST_NONE,
          filter: filter,
        });
      }
      logger.info(`[${accessUrl.LIST}] ${userId} ${response.LIST}`);
      res.status(200).json({
        message: response.LIST,
        filter: filter,
        listInfo: listInfo,
      });
    } catch (err) {
      logger.error(`[${accessUrl.LIST}] ${userId} ${err}`);
      res.status(500).json({ message: response.LIST_FAIL });
    }
  }

  static async newListPost(req, res) {
    logger.info(accessUrl.NEW_LIST);
    const userId = req.user.id;
    try {
      const newPostList = await PostService.getNewPostList(userId);
      if (newPostList.length == 0) {
        logger.info(`[${accessUrl.NEW_LIST}] ${userId} ${response.NEW_LIST_NONE}`);
        return res.status(200).json({ message: response.NEW_LIST_NONE });
      }
      logger.info(`[${accessUrl.NEW_LIST}] ${userId} ${response.NEW_LIST}`);
      res.status(200).json({
        message: response.NEW_LIST,
        newPostList: newPostList,
      });
    } catch (err) {
      logger.error(`[${accessUrl.NEW_LIST}] ${userId} ${err}`);
      res.status(500).json({ message: response.NEW_LIST_FAIL });
    }
  }

  static async createComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors.map(obj => obj.msg) });
    }
    logger.info(accessUrl.CREATE_COMMENT);
    const userId = req.user.id;
    const postId = req.params.postId;
    const { comment } = req.body;
    try {
      await PostService.setComment(postId, userId, comment);
      logger.info(`[${accessUrl.CREATE_COMMENT}] ${userId} ${postId} ${response.CREATE_COMMENT}`);
      res.status(201).json({ message: response.CREATE_COMMENT });
    } catch (err) {
      logger.error(`[${accessUrl.CREATE_COMMENT}] ${userId} ${postId} ${err}`);
      res.status(500).json({ message: response.CREATE_COMMENT_FAIL });
    }
  }

  static async updateComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors.map(obj => obj.msg) });
    }
    logger.info(accessUrl.UPDATE_COMMENT);
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const { comment } = req.body;
    try {
      const isExist = await PostService.getByCommentId(commentId);
      if (!isExist) {
        logger.warn(`[${accessUrl.UPDATE_COMMENT}] ${userId} ${commentId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const writer = await PostService.getCommentWriter(commentId);
      if (userId != writer) {
        logger.warn(`[${accessUrl.UPDATE_COMMENT}] ${userId} ${commentId} ${response.FORBIDDEN}`);
        return res.status(403).json(response.FORBIDDEN);
      }
      await PostService.setUpdateComment(commentId, comment);
      logger.info(`[${accessUrl.UPDATE_COMMENT}] ${userId} ${commentId} ${response.UPDATE_COMMENT}`);
      res.status(201).json({ message: response.UPDATE_COMMENT });
    } catch (err) {
      logger.error(`[${accessUrl.UPDATE_COMMENT}] ${userId} ${commentId} ${err}`);
      res.status(500).json({ message: response.UPDATE_COMMENT_FAIL });
    }
  }

  static async deleteComment(req, res) {
    logger.info(accessUrl.DELETE_COMMENT);
    const userId = req.user.id;
    const commentId = req.params.commentId;
    try {
      const isExist = await PostService.getByCommentId(commentId);
      if (!isExist) {
        logger.warn(`[${accessUrl.DELETE_COMMENT}] ${userId} ${commentId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const writer = await PostService.getCommentWriter(commentId);
      if (userId != writer) {
        logger.warn(`[${accessUrl.DELETE_COMMENT}] ${userId} ${commentId} ${response.FORBIDDEN}`);
        return res.status(403).json(response.FORBIDDEN);
      }
      await PostService.setDeleteComment(commentId);
      logger.info(`[${accessUrl.DELETE_COMMENT}] ${userId} ${commentId} ${response.DELETE_COMMENT}`);
      res.status(201).json({ message: response.DELETE_COMMENT });
    } catch (err) {
      logger.error(`[${accessUrl.DELETE_COMMENT}] ${userId} ${commentId} ${err}`);
      res.status(500).json({ message: response.DELETE_COMMENT_FAIL });
    }
  }

  static async likeComment(req, res) {
    logger.info(accessUrl.LIKE_COMMENT);
    const userId = req.user.id;
    const commentId = req.params.commentId;
    try {
      const isExist = await PostService.getByCommentId(commentId);
      if (!isExist) {
        logger.warn(`[${accessUrl.LIKE_COMMENT}] ${userId} ${commentId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const isClickedLikeComment = await PostService.getClickedLikeComment(commentId, userId);
      if (isClickedLikeComment) {
        await PostService.setMinusCommentLikes(commentId);
        await PostService.setMinusCommentLikeUser(commentId, userId);
        logger.info(`[${accessUrl.LIKE_COMMENT}] ${userId} ${commentId} ${response.LIKE_COMMENT_CANCEL}`);
        return res.status(200).json({ message: response.LIKE_COMMENT_CANCEL });
      }
      await PostService.setAddCommentLikes(commentId);
      await PostService.setAddCommentLikeUser(commentId, userId);
      logger.info(`[${accessUrl.LIKE_COMMENT}] ${userId} ${commentId} ${response.LIKE_COMMENT}`);
      res.status(200).json({ message: response.LIKE_COMMENT });
    } catch (err) {
      logger.error(`[${accessUrl.LIKE_COMMENT}] ${userId} ${commentId} ${err}`);
      res.status(500).json({ message: response.LIKE_COMMENT_FAIL });
    }
  }

  static async listComment(req, res) {
    logger.info(accessUrl.LIST_COMMENT);
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const isExist = await PostService.getById(postId);
      if (!isExist) {
        logger.warn(`[${accessUrl.LIST_COMMENT}] ${userId} ${postId} ${response.NOT_FOUND}`);
        return res.status(404).json(response.NOT_FOUND);
      }
      const commentList = await PostService.getPostCommentList(postId);
      if (commentList.length == 0) {
        logger.info(`[${accessUrl.LIST_COMMENT}] ${userId} ${postId} ${response.LIST_COMMENT_NONE}`);
        return res.status(200).json({ message: response.LIST_COMMENT_NONE });
      }
      logger.info(`[${accessUrl.LIST_COMMENT}] ${userId} ${postId} ${response.LIST_COMMENT}`);
      res.status(200).json({
        message: response.LIST_COMMENT,
        commentList: commentList,
      });
    } catch (err) {
      logger.error(`[${accessUrl.LIST_COMMENT}] ${userId} ${postId} ${err}`);
      res.status(500).json({ message: response.LIST_COMMENT_FAIL });
    }
  }
}

module.exports = PostController;