const mongoose = require('mongoose');
const MONGO_USERNAME = 'SleepUsr23';
const MONGO_PASSWORD = 'SleepPassword';
const MONGO_HOSTNAME = 'localhost';
const MONGO_PORT = '27017';
const MONGO_DB = 'SleepAppDB';
//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
mongoose.connect(url, {useNewUrlParser: true});