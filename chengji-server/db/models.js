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
  affiliation: { type: String, trim: true },
  age: { type: Number },
  IDcard: { type: Number },
  cname: { type: String, trim: true },
  classno: { type: String, trim: true },
  
  department: { type: String, trim: true },
 
  nation: { type: String, trim: true },
  region: { type: String, trim: true },
  phone: { type: Number },
  eMail: { type: String, trim: true },
  street: { type: String, trim: true },
  address: { type: String, trim: true },
  recommend: { type: String,  },
});
const StudentModel = mongoose.model("studentInfo", studentSchema);

const teacherSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  _id: Number,
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  realName: { type: String },
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
  _id: Number,
  // type:Number, min:3, max:9, required: true
  count: { type: Number },
  average: { type: Number },
  cno: { type: String, required: true, trim: true }, //cno
  scope: { type: Number },
  grade: { type: Number },
  student: { type: String, trim: true }, //s username
  pass: { type: Boolean },
  cheat: { type: Boolean },
});
const GradeModel = mongoose.model("GradeManagement", gradeSchema);

// 向外暴露Model
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;
exports.AdminModel = AdminModel;

exports.GradeModel = GradeModel;
