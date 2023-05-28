const {
    successResponse,
    errorResponse,
    successResponseWithData,
    unauthorizedResponse,
    registeredUserResponse
} = require("../helpers/Response");
var ObjectID = require("mongoose").Types.ObjectId;
const authservices = require("../services/auth-service");
const translate = require("../locales/translate");

//Exist Mobile No in User Collection
const checkUserAvailable = async (req, res) => {
    authservices.checkUserExistService(req)
        .then((data) => {
            return successResponse(
                res,
                translate[req.headers["x-language-key"]].USER_MOBILE_AVAILABLE
            );
        })
        .catch((err) => {
            return errorResponse(
                res,
                translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS
            );
        });
};
//User Signup Action
const Signup = async (req, res) => {
    authservices.signupService(req)
        .then((data) => {
            return successResponseWithData(
                res,
                translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,
                data
            );
        })
        .catch((err) => {
            return errorResponse(
                res,
                err
            );
        });
};
//User Login Action
const Login = async (req, res) => {
    authservices.LoginService(req)
        .then((data) => {
            return successResponseWithData(
                res,
                translate[req.headers["x-language-key"]].LOGIN_SUCCESS,
                data
            );
        })
        .catch((err) => {
            return unauthorizedResponse(
                res,
                err.message
            );
        });
};

//Auth User info
const authTokenInfo = async (req, res) => {
    authservices
        .authTokenInfoService(req)
        .then((data) => {
            return successResponseWithData(
                res,
                translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,
                data
            );
        })
        .catch((err) => {
            return errorResponse(
                res,
                translate[req.headers["x-language-key"]][err.message]
            );
        });
};

const Logout = async (req, res) => {
    authservices.logoutService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const UpdateStruggling = async (req, res) => {
    authservices.updateStrugglingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const UpdateSleepStartTime = async (req, res) => {
    authservices.updateSleepStartTimeService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const UpdateSleepEndTime = async (req, res) => {
    authservices.updateSleepEndTimeService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const UpdateSleepHours = async (req, res) => {
    authservices.updateSleepHoursService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    checkUserAvailable,
    Signup,
    Login,
    authTokenInfo,
    Logout,
    UpdateStruggling,
    UpdateSleepStartTime,
    UpdateSleepEndTime,
    UpdateSleepHours,
};
