const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_TOKEN_EXPIRESDAYS,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USERNAME,
  EMAIL_SMTP_PASSWORD,
} = require("../config/constants.js");
const fs = require("fs");
const encryptPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, 10, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const generateRandomNumber = (length = 4) => {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
};

const generateAuthToken = (userinfo) => {
  var token = "";
  const jwtConfig = { expiresIn: JWT_TOKEN_EXPIRESDAYS };
  token = jwt.sign(userinfo, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (req, res, token) => {
  var result = false;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err)
        return Response.unauthorizedResponse(
          res,
          "User not authorized to access (invalid token)."
        );
      req.user = user;
      result = true;
    });
  }
  return result;
};

const destroyAuthToken = (token) => {
  var tokenexpaire = "";

  tokenexpaire = jwtr.destroy(token);
  return tokenexpaire;
};
const checkPassword = (password, hashPassword) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(
      password.toString(),
      hashPassword.toString(),
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
const convertObject = (data) => {
  var result = null;
  var us1 = JSON.stringify(data);
  var us2 = JSON.parse(us1);
  result = us2;
  return result;
};

module.exports = {
  encryptPassword,
  generateRandomNumber,
  generateAuthToken,
  verifyToken,
  checkPassword,
  convertObject,
  destroyAuthToken,
};
