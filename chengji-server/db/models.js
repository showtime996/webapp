const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chengji");
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
  header: { type: String }, // 头像名称
  post: { type: String }, // 职位
  info: { type: String }, // 个人或职位简介
  school: { type: String },
  salary: { type: String }, // 月薪
});
const UserModel = mongoose.model("user", userSchema);
// 向外暴露Model
exports.UserModel = UserModel;
