const { body, validationResult } = require('express-validator');
const { validatioErrorResponse } = require('../helpers/Response');

exports.LoginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required').bail().isLength({ min: 3, max: 126 }).withMessage('Username is must be at least 3 characters long').bail(),
  body('password').trim().notEmpty().withMessage('Password is required').bail().isLength({ min: 3, max: 126 }).withMessage('Username is must be at least 3 characters long').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SignupValidation = [
  body('fullName').trim().notEmpty().withMessage('fullName is required').bail().isLength({ min: 3, max: 126 }).withMessage('fullName is must be at least 3 characters long').bail()
  .isString().withMessage('fullName is must be string').bail(),
  body('username').trim().notEmpty().withMessage('username is required').bail().isLength({ min: 3, max: 126 }).withMessage('username is must be at least 3 characters long').bail()
  .isString().withMessage('username is must be string').bail().custom((value, { req }) => {
    return Users.findOne({ username: value, _id: { $nin: [req.params.id] } }).select('username').then((user) => {
      if (user) {
        return Promise.reject('username is must be unique');
      }
    });
  }).bail(),
  body('mobile').trim().notEmpty().withMessage('mobile is required').bail().isLength({ min: 10, max: 10 }).withMessage('username is must be at least 10 Number').bail()
  .isNumeric().withMessage('mobile is must be Number').bail().custom((value, { req }) => {
    return Users.findOne({ mobile: value, _id: { $nin: [req.params.id] } }).select('mobile').then((user) => {
      if (user) {
        return Promise.reject('mobile is must be unique');
      }
    });
  }).bail(),

  body('password').trim().notEmpty().withMessage('Password is required').bail().isLength({ min: 3, max: 126 }).withMessage('Username is must be at least 3 characters long').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.UsernameValidation = [
  body('username').trim().notEmpty().withMessage('Username is required').bail().isLength({ min: 3, max: 126 }).withMessage('Username is must be at least 3 characters long').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.StrugglingValidation = [
  body('struggling').trim().notEmpty().withMessage('Struggling week is required').bail().isLength({ min: 3, max: 126 }).withMessage('Struggling is must be at least 3 characters long').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SleepStartTimeValidation = [
  body('sleepStartTime').trim().notEmpty().withMessage('sleepStartTime is required').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SleepEndTimeValidation = [
  body('sleepEndTime').trim().notEmpty().withMessage('sleepEndTime is required').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.SleepHoursValidation = [
  body('sleepHours').trim().notEmpty().withMessage('sleepHours is required').bail(),
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];


