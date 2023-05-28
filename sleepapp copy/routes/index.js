var express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const AuthController = require('../controller/AuthController')
const { adminAuthCheck, customerAuthCheck } = require('../middlewares/AuthTypeCheck')
const { LoginValidation, SignupValidation, UsernameValidation, StrugglingValidation, SleepStartTimeValidation, SleepEndTimeValidation, SleepHoursValidation } = require('../validations/Validator')
const destroyAuthToken = require("../helpers/Utility")
/*== Auth Routes ==*/
router.post("/signup", SignupValidation , AuthController.Signup);
router.post("/login", LoginValidation ,AuthController.Login);
router.post("/usernameExist", UsernameValidation ,AuthController.checkUserAvailable);
router.post("/updateStruggling", [ customerAuthCheck , StrugglingValidation] ,AuthController.UpdateStruggling);
router.post("/updateSleepStartTime", [ customerAuthCheck ,SleepStartTimeValidation ] ,AuthController.UpdateSleepStartTime);
router.post("/updateSleepEndTime", [ customerAuthCheck ,SleepEndTimeValidation] ,AuthController.UpdateSleepEndTime);
router.post("/updateSleepHours", [ customerAuthCheck , SleepHoursValidation] ,AuthController.UpdateSleepHours);
router.post("/logout", customerAuthCheck, AuthController.Logout);
module.exports = router;
