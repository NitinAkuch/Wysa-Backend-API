
const successResponse = (res, msg) => {
    var idata = {
        status: 200,
        message: msg,
    };
    return res.status(200).json(idata);
}

const successResponseWithData = (res, msg, data) => {
    var idata = {
        status: 200,
        message: msg,
        data: data,
    };
    return res.status(200).json(idata);
}

const errorResponse = (res, msg) =>  {
    var idata = {
      status: 201,
      message: msg,
    };
    return res.status(200).json(idata);
}
const notFoundResponse = (res, msg) => {
    var idata = {
      status: 201,
      message: msg,
    };
    return res.status(200).json(idata);
}

const unauthorizedResponse = (res, msg) => {
    var idata = {
      status: 201,
      message: msg,
    };
    return res.status(200).json(idata);
}

const registeredUserResponse = (res, msg , data) => {
  var idata = {
    status: 205,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const validatioErrorResponse = (res, msg) =>  {
    var idata = {
      status: 202,
      message: msg,
    };
    return res.status(200).json(idata);
}

module.exports = {
    successResponse,
    successResponseWithData,
    errorResponse,
    notFoundResponse,
    unauthorizedResponse,
    validatioErrorResponse,
    registeredUserResponse,
};
