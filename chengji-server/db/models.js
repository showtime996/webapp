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
  sex: { type: String, trim: true },
  affiliation: { type: String, trim: true },
  age: { type: Number },
  IDcard: { type: Number },
  startDate: { type: String, trim: true },
  endDate: { type: String, trim: true },
  nation: { type: String, trim: true },
  region: { type: String, trim: true },
  phone: { type: Number },
  eMail: { type: String, trim: true },
  street: { type: String, trim: true },
  address: { type: String, trim: true },
  recommend: { type: String, trim: true },
});
const UserModel = mongoose.model("user", userSchema);
// 向外暴露Model
exports.UserModel = UserModel;
