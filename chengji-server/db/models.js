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
  cname: { type: String, trim: true },
  classno: { type: String, trim: true },
  startDate: { type: String, trim: true },
  department: { type: String, trim: true },
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
  cname: { type: String, trim: true },
  classno: { type: String, trim: true },
  sex: { type: String, trim: true },
  department: { type: String, trim: true },
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
// 班级
const classSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  cname: [studentSchema], // s t cname
  classno: [studentSchema], // s t cname

  department: [studentSchema], //s、t、j department
  username: [studentSchema], //st u
  //st u    teacher: [studentSchema],
});
const ClassModel = mongoose.model("ClassManagement", classSchema);
// 课程
const courseSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  cname: { type: String, required: true, trim: true },
  cno: { type: String, required: true, trim: true },
  department: { type: String, trim: true }, //s、t、department
  student: { type: String, trim: true }, //s username
  teacher: { type: String, trim: true }, //t username
});
const CourseModel = mongoose.model("CourseManagement", courseSchema);

// 成绩
const gradeSchema = mongoose.Schema({
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
// 评价
const recommandSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  cname: { type: String, required: true, trim: true }, //course
  cno: { type: String, required: true, trim: true }, //course
  department: { type: String, trim: true }, //s、t、department

  teacher: { type: String, trim: true }, //t username
  detail: { type: String, trim: true },
});
const RecommandModel = mongoose.model("RecommandManagement", recommandSchema);
// 人员
const personSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  department: { type: String, trim: true }, //s、t、department
  student: { type: String, trim: true }, //s username
  teacher: { type: String, trim: true }, //t username
});
const PersonModel = mongoose.model("PersonManagement", personSchema);
// 向外暴露Model
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;
exports.AdminModel = AdminModel;
exports.ClassModel = ClassModel;
exports.CourseModel = CourseModel;
exports.GradeModel = GradeModel;
exports.RecommandModel = RecommandModel;
exports.PersonModel = PersonModel;
