const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/student");
const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("db connect success!");
});
//字义Schema
const userSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String, required: true },
  sex: { type: String },
  affiliation: { type: String },
  age: { type: Number },
  IDcard: { type: Number },
  startDate: { type: String },
  nation: { type: String },
  region: { type: String },
  phone: { type: Number },
  eMail: { type: String },
  recommend: { type: String },
});
const UserModel = mongoose.model("user", userSchema);
// 向外暴露Model
exports.UserModel = UserModel;
