const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CGXT");
const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("数据库连接成功!");
});
//字义Schema

const studentSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
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
const StudentModel = mongoose.model("studentInfo", studentSchema);

const teacherSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
  sex: { type: String, trim: true },
  affiliation: { type: String, trim: true },
  age: { type: Number },
  salary: { type: Number },
  endSchool: { type: String, trim: true },
  experience: { type: String, trim: true },
  IDcard: { type: Number },
  startDate: { type: String, trim: true },
  nation: { type: String, trim: true },
  region: { type: String, trim: true },
  phone: { type: Number },
  eMail: { type: String, trim: true },
  street: { type: String, trim: true },
  address: { type: String, trim: true },
});
const TeacherModel = mongoose.model("teacherInfo", teacherSchema);

const adminSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
  sex: { type: String, trim: true },
  affiliation: { type: String, trim: true },
  age: { type: Number },
  department: { type: String, trim: true },
  duty: { type: String, trim: true },
  IDcard: { type: Number },
  startDate: { type: String, trim: true },
  phone: { type: Number },
  eMail: { type: String, trim: true },
  address: { type: String, trim: true },
});
const AdminModel = mongoose.model("adminInfo", adminSchema);
// 向外暴露Model
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;
exports.AdminModel = AdminModel;
