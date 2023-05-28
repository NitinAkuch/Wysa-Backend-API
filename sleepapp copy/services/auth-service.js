const { Users } = require("../models/UserModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");
const { JWT_SECRET } = require("../config/constants.js");
const { WEB_HOST_URL } = require("../config/constants.js");

/* == Exist Mobile No in Users Service == */
const checkUserExistService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      var userData = await Users.isUserExists(req.body.username);
      if (!userData) {
        resolve(true);
      } else {
        reject({ message: "VALIDATION_FIELD_EXISTS" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//User Signup Service
const signupService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.body.password) {
        req.body.password = await Utility.encryptPassword(req.body.password);
      }
      req.body.active = true;
      const query = new Users(req.body);
      query
        .save()
        .then(async (result) => {
          result = await Utility.convertObject(result);
          result["token"] = await Utility.generateAuthToken(result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};
//Login Service
const LoginService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userData = await Users.findUserForLogin(req.body.username);
    if (!userData) {
      reject({ message: "USER_NOT_FOUND" });
    }
    else {
      var isPasswordMatched = await Utility.checkPassword(
        req.body.password,
        userData.password
      );
      if (isPasswordMatched) {
        userData = await Utility.convertObject(userData);
        delete userData["password"];
        userData["token"] = await Utility.generateAuthToken(userData);
        resolve(userData);
      } else {
        reject({ message: "USER_PASSWORD_NOT_MATCH" });
      }
    }
  });
};

const updateStrugglingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        { struggling: req.body.struggling },
        { new: true, useFindAndModify: false }
      );
      
      if (!user) {
        throw { message: "USER_NOT_FOUND" };
      }
      
      resolve(user);
    } catch (err) {
      reject({ message: "USER_NOT_FOUND" });
    }
  });
};

const updateSleepStartTimeService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        { sleepStartTime: req.body.sleepStartTime },
        { new: true, useFindAndModify: false }
      );
      
      if (!user) {
        throw { message: "USER_NOT_FOUND" };
      }
      
      resolve(user);
    } catch (err) {
      reject({ message: "USER_NOT_FOUND" });
    }
  });
};

const updateSleepEndTimeService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        { sleepEndTime: req.body.sleepEndTime },
        { new: true, useFindAndModify: false }
      );
      
      if (!user) {
        throw { message: "USER_NOT_FOUND" };
      }
      
      resolve(user);
    } catch (err) {
      reject({ message: "USER_NOT_FOUND" });
    }
  });
};

const updateSleepHoursService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        { sleepHours: req.body.sleepHours },
        { new: true, useFindAndModify: false }
      );
      
      if (!user) {
        throw { message: "USER_NOT_FOUND" };
      }
      
      resolve(user);
    } catch (err) {
      reject({ message: "USER_NOT_FOUND" });
    }
  });
};


//Auth Token Info Service
const authTokenInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.user._id })
      .select(
        "firstName lastName mobile email password mobileVerified emailVerified userType active"
      )
      .then(async (user) => {
        if (!user) reject({ message: "USER_NOT_FOUND" });
        resolve(user);
      });
  });
};

const logoutService = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.user._id })
      // .select(
      //   "mobile email"
      // )
      .then(async (user) => {
        if (!user) {
          reject({ message: "USER_NOT_FOUND" });
        } else {
          // deleteToken(user)
          resolve("USER_LOGOUT_SUCCESSFULLY");
        }
      });
  });
};

module.exports = {
  checkUserExistService,
  signupService,
  LoginService,
  updateStrugglingService,
  updateSleepStartTimeService,
  updateSleepEndTimeService,
  updateSleepHoursService,
  authTokenInfoService,
  logoutService,
};
