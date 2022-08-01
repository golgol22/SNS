const { body } = require("express-validator");
const response = require("./response");

const checkJoinEmail = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage(response.EMAIL_EMPTY)
    .bail()
    .isEmail()
    .withMessage(response.EMAIL_WARNING), 
];

const checkJoinNum = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage(response.EMAIL_EMPTY)
    .bail()
    .isEmail()
    .withMessage(response.EMAIL_WARNING), 
  body("randomNum")
    .trim()
    .notEmpty()
    .withMessage(response.RANDOM_NUM_EMPTY)
    .bail()
    .isNumeric()
    .withMessage(response.RANDOM_NUM_WARNING), 
];

const checkJoin = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage(response.EMAIL_EMPTY)
    .bail()
    .isEmail()
    .withMessage(response.EMAIL_WARNING), 
  body("userPw")
    .trim()
    .notEmpty()
    .withMessage(response.PW_EMPTY)
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g)
    .withMessage(response.PW_WARNING),
  body("confirmPw")
    .trim()
    .notEmpty()
    .withMessage(response.CONFIRM_PW_EMPTY)
    .bail()
    .custom((value, {req}) => {
      if (value !== req.body.userPw) {
        throw new Error(response.COMFIRM_PW_WARNING)
      }
      return true
    }),
  body("userName")
    .trim()
    .notEmpty()
    .withMessage(response.USERNAME_EMPTY)
    .bail()
    .isLength({ min: 2, max: 10 })
    .withMessage(response.USERNAME_LENGTH)
    .bail()
    .not().matches(/\<|\>|\"|\'|\%|\;|\&|\+|\-/g)
    .not().matches(/[&\\+\-%@=\/\\\:;,\.\'\"\^`~\_|\!\/\?\*$<>()\[\]\{\}]/i)
    .withMessage(response.USERNAME_INCLUDE_SCRIPT),
  body("emailConfirm")
    .trim()
    .equals(1)
    .withMessage(response.JOIN_EMAIL_CONFIRM)  
];

const checkLogin = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage(response.EMAIL_EMPTY)
    .bail()
    .isEmail()
    .withMessage(response.EMAIL_WARNING),
  body("userPw")
    .trim()
    .notEmpty()
    .withMessage(response.PW_EMPTY)
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g)
    .withMessage(response.PW_WARNING), 
];

module.exports = { checkJoinEmail, checkJoinNum, checkJoin, checkLogin };