module.exports = {
  BAD_REQUEST: { status: 400, message: "Bad Request", detail: "잘못된 요청입니다." },
  FORBIDDEN: { status: 403, message: "Forbidden", detail: "권한이 없는 사용자입니다." },
  NOT_FOUND: { status: 404, message: "Not Found", detail: "올바른 경로로 접속하세요." },
  INTERNAL_SERVER_ERROR: { status: 500, message: "Internal Server Error", detail: "서버 에러입니다. 관리자에게 문의하세요." },
  
  // res & log
  CREATE: "포스팅 되었습니다.",
  CREATE_FAIL: "포스팅에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  UPDATE: "게시글이 수정되었습니다.",
  UPDATE_FAIL: "게시글이 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  DELETE: "게시글이 삭제되었습니다. 삭제된 게시글은 복원할 수 있습니다.",
  DELETE_FAIL: "게시글 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  DETAIL: "상세정보가 조회되었습니다.",
  DETAIL_FAIL: "상세정보 조회에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  LIKE: "해당 게시글에 좋아요를 표시했습니다.", 
  LIKE_CANCEL: "해당 게시글에 좋아요를 취소했습니다.",
  LIKE_FAIL: "좋아요 실패하였습니다. 잠시 후 다시 시도해주세요.",
  DELETE_ALREADY: "이미 삭제된 게시글입니다.",
  DELETE_LIST: "삭제된 게시물을 조회했습니다.",
  DELETE_LIST_NONE: "삭제된 게시물이 없습니다.",
  DELETE_LIST_FAIL: "삭제된 게시물을 불러오는데 실패하였습니다. 잠시 후 다시 시도해주세요.",
  RESTORE: "게시글이 복원되었습니다.",
  RESTORE_FAIL: "게시글 복원에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  LIST: "게시글 목록을 조회했습니다.",
  LIST_NONE: "게시글이 없습니다.",
  LIST_FAIL: "게시글 조회에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  CREATE_COMMENT: "게시글에 댓글을 달았습니다.",
  CREATE_COMMENT_FAIL: "게시글 댓글 달기에 실패하였습니다. 잠시 후 다시 시도해주세요.",
  UPDATE_COMMENT: "댓글을 수정했습니다.",
  UPDATE_COMMENT_FAIL: "댓글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.",

  JOIN_ID_DUPLICATE: "이미 사용중인 이메일입니다.",
  JOIN: "회원가입이 되었습니다.",
  JOIN_FAIL: "회원가입에 실패하였습니다.",
  JOIN_EMAIL_CONFIRM_FAIL: "이메일 본인 확인 메일 보내는 것에 실패하였습니다.", 
  JOIN_RANDOM_NUM_CONFIRM_FAIL: "이메일 본인 확인 인증번호 인증에 실패하였습니다.", 
  LOGIN: "로그인 되었습니다.",
  LOGIN_NO_MATCH: "아이디나 비밀번호가 일치하지 않습니다.", 
  LOGIN_FAIL: "로그인에 실패하였습니다.",
  SEND_FIND_PW_MAIL: "해당 메일로 임시 비밀번호를 발급했습니다. 해당 비밀번호는 3분간 유효하며 해당 비밀번호로 로그인하고 꼭 비밀번호를 수정하시기 바랍니다.",
  NOT_USER: "해당 이메일로 가입된 적이 없습니다.",
  FINDPW_FAIL: "비밀번호 찾기에 실패하였습니다.",
  SEARCH_BY_NAME: "으로 사용자 검색하였습니다.",
  SEARCH_BY_NAME_FAIL: "으로 사용자 검색에 실패하였습니다.",
  CAN_NOT_FOLLOW_ME: "나를 팔로우할 수 없습니다.",
  NOT_EXIST_USER: "존재하지 않는 유저입니다.",
  FOLLOW_CANCELED: "팔로우 취소 되었습니다",
  FOLLOWED: "팔로우되었습니다.",
  FOLLOW_FAIL: "팔로우 동작에 실패했습니다.",
  FOLLOWING_LIST_NONE: "팔로잉 리스트가 없습니다.",
  FOLLOWING_LIST: "팔로잉 리스트를 조회했습니다.",
  FOLLOWING_LIST_FAIL: "팔로잉 리스트를 불러오는데 실패했습니다",
  FOLLOWER_LIST_NONE: "팔로우 리스트가 없습니다.",
  FOLLOWER_LIST: "팔로우 리스트를 조회했습니다.",
  FOLLOWER_LIST_FAIL: "팔로우 리스트를 불러오는데 실패했습니다",
  USER_INFO: "사용자 정보를 조회했습니다.",
  USER_INFO_FAIL: "사용자 정보 조회에 실패했습니다.",
  UPDATE_USER_INFO: "사용자 정보를 수정했습니다.",
  UPDATE_USER_INFO_FAIL: "사용자 정보를 수정에 실패하였습니다.",
  LIKE_LIST: "좋아요 누른 게시글을 조회했습니다.",
  LIKE_LIST_FAIL: "좋아요 누른 게시글을 조회에 실패했습니다.",
  LIKE_LIST_NONE: "좋아요 누른 게시글이 없습니다.",

  ACCESS_DENIED: "접속이 제한되었습니다.",
  NOT_BOT: "BOT 접근을 금지합니다.",
  SEND_EMAIL_CONFIRM: "이메인 본인 확인 메일을 보냈습니다. 확인해주세요.",
  JOIN_EMAIL_CONFIRM_SEND_MAIL: "에게 이메일 본인 확인 메일을 보냈습니다.",
  JOIN_EMAIL_RANDOM_NUM_OK: "인증번호가 확인되었습니다.",
  JOIN_EMAIL_RANDOM_NUM_NO: "인증번호가 올바르지 않습니다.",
  JOIN_EMAIL_RANDOM_NUM_NOT_VALID: "인증번호가 만료되었습니다.",
  LOGIN_CONFIRM_SEND_MAIL: "에게 로그인 확인 메일을 보냈습니다.",
  SETTING_ACCESSLOGS_CONFIRM: "사용자가 로그인 확인 메일에 반응을 보냈습니다.",
  FIND_PW_SEND_MAIL: "에게 임시 비밀번호 발급 메일을 보냈습니다.",

  // validator
  RANDOM_NUM_EMPTY: "인증번호를 입력해주세요.",
  RANDOM_NUM_INTEGER_WARNING: "인증번호는 숫자입니다.",
  RANDOM_NUM_LENGTH_WARNING: "인증번호는 6자입니다.",
  EMAIL_EMPTY: "이메일을 입력해주세요.",
  EMAIL_WARNING: "이메일 형식에 맞게 작성해주세요.", 
  PW_EMPTY: "비밀번호를 입력해주세요.",
  PW_WARNING: "최소 8자리 이상: 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 조합", 
  CONFIRM_PW_EMPTY: "비밀번호 확인을 입력해주세요.", 
  COMFIRM_PW_WARNING: "비밀번호와 일치하지 않습니다.", 
  USERNAME_EMPTY: "이름을 입력해주세요.",
  USERNAME_LENGTH: "2글자이상 10글자미만으로 작성해주세요.",
  USERNAME_INCLUDE_SCRIPT: "이름에 특수문자를 포함할 수 없습니다.",
  JOIN_EMAIL_CONFIRM: "이메일 인증을 해주세요.",
  LOGIN_REQUIRED: "로그인을 해주세요.",
  TITLE_EMPTY: "제목을 입력해주세요.",
  TITLE_LENGTH: "2글자이상 30글자 미만으로 입력해주세요.",
  CONTENT_EMPTY: "내용을 입력해주세요.",
  CONTENT_LENGTH: "2글자이상 255글자 미만으로 입력해주세요.",
  TITLE_INCLUDE_SCRIPT: "제목에 특정 특수문자를 포함시킬 수 없습니다.",
  CONTENT_INCLUDE_SCRIPT: "내용에 특정 특수문자를 포함시킬 수 없습니다.",
  HASHTAG_INCLUDE_SCRIPT: "해시태그에 특정 특수문자를 포함할 수 없습니다.",
  COMMENT_EMPTY: "댓글을 입력해주세요.",
  COMMENT_LENGTH: "2글자이상 255글자 미만으로 입력해주세요.",
  COMMENT_INCLUDE_SCRIPT: "댓글에 특정 특수문자를 포함시킬 수 없습니다.",

  // mail
  EMAIL_CONFIRM_FROM_SNS: "SNS에서 이메일 주소를 확인합니다.",
  EMAIL_SECRET_KEY: "인증키를 입력해주세요.",
  EMAIL_NEW_LOGIN: "새로운 환경에서 로그인 되었습니다.",
  EMAIL_LOGIN_INFO: "로그인 정보",
  EMAIL_LOGIN_TIME: "시간",
  EMAIL_LOGIN_LOCATION: "위치",
  EMAIL_LOGIN_DEVICE: "기기",
  EMAIL_IS_IT_YOU: "본인이 맞습니까?",
  EMAIL_YES: "예",
  EMAIL_NO: "아니오",
  EMAIL_TEMP_PW: "새로운 임시 비밀번호를 알려드립니다.",
  EMAIL_TEMP_PW_WARNING: "임시 비밀번호는 3분간 유효하며, 임시 비밀번호로 로그인 하신 후 반드시 비밀번호를 수정해 주세요.",
};