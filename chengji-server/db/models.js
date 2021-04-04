const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CGXT");
const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("数据库连接成功!");
});
//字义Schema

const studentSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  _id: Number,
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
  sex: { type: String, trim: true },
  affiliation: { type: String },
  age: { type: Number },
  IDcard: { type: Number },
  cname: { type: String },
  classno: { type: String, trim: true },
  years: { type: String, trim: true },
  term: { type: String },
  department: { type: String, trim: true },

  nation: { type: String, trim: true },
  region: { type: String },
  phone: { type: Number },
  eMail: { type: String },
  street: { type: String },
  address: { type: String },
  recommend: { type: String },
});
const StudentModel = mongoose.model("studentInfo", studentSchema);

const teacherSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  _id: Number,
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
  years: { type: String },
  term: { type: String },
  cname: { type: String, trim: true },
  classno: { type: String, trim: true },
  sex: { type: String, trim: true },
  department: { type: String, trim: true },
  affiliation: { type: String, trim: true },
  age: { type: Number },
  duty: { type: String, trim: true },
  IDcard: { type: Number },
  nation: { type: String, trim: true },
  region: { type: String, trim: true },
  phone: { type: Number },
  eMail: { type: String, trim: true },
  street: { type: String, trim: true },
  diploma: { type: String },
});
const TeacherModel = mongoose.model("teacherInfo", teacherSchema);

const adminSchema = mongoose.Schema({
  _id: Number,
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
  diploma: { type: String },
  phone: { type: Number },
  eMail: { type: String, trim: true },
});
const AdminModel = mongoose.model("adminInfo", adminSchema);

// 成绩
const gradeSchema = mongoose.Schema({
  classno: { type: String },
  username: { type: String },
  realName: { type: String },
  courseNo: { type: String },
  credit: { type: String },
  courseType: { type: String },
  courseName: { type: String },
  grade: { type: Number },
  cheat: { type: String },
  cname: { type: String },
  gpa: { type: Number },
});
const GradeModel = mongoose.model("GradeManagement", gradeSchema);

// 向外暴露Model
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;
exports.AdminModel = AdminModel;

exports.GradeModel = GradeModel;
