const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: { type: String, maxLength: 126, required: true},
  username: { type: String, maxLength: 126, required: true, unique: true},
  mobile: { type: String , trim: true, unique: true, sparse: true},
  avatar: { type: String, default: "" },
  password: { type: String, default: "" },
  struggling: { type: String, maxLength: 126, required: true},
  sleepStartTime: { type: String},
  sleepEndTime: { type: String},
  sleepHours: { type: String},
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

class UserClass {
  static async isUserExists(username) {
    var result = false;
    const data = await this.findOne({ username: username }).select('username').exec();
    if (data) result = true;
    return result;
  }
  static async findUserForLogin(username) {
    var result = null;
    const data = await this.findOne({ username: username }).select('fullName username mobile email password active').exec();
    if (data) result = data;
    return result;
  }
}
UserSchema.loadClass(UserClass);
UserSchema.index({'location': "2dsphere"});
const Users = mongoose.model("Users", UserSchema);
module.exports = { Users };