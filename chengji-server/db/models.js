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
  header: { type: String },
  post: { type: String },
  info: { type: String },
  company: { type: String },
  salary: { type: String },
});
const UserModel = mongoose.model("user", userSchema);
// 向外暴露Model
exports.UserModel = UserModel;
