//获取mongodb依赖包
const mongoose = require("mongoose");
//连接本地数据库
mongoose.connect("mongodb://localhost:27017/CGXT");

const conn = mongoose.connection;
conn.on("connected", () => {
  //返回成功连接信息
  console.log("数据库连接成功!");
});

//字义Schema
//学生信息Schema
const studentSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  _id: Number,
  username: { type: String, required: true }, //帐号
  password: { type: String, required: true }, //密码
  type: { type: String, required: true }, //类型
  realName: { type: String, trim: true }, //姓名
  sex: { type: String }, //性别
  affiliation: { type: String }, //政治面貌
  age: { type: Number }, //年龄
  IDcard: { type: Number }, //身份证
  cname: { type: String, trim: true }, //专业名
  classno: { type: String }, //班级
  years: { type: String }, //学年
  term: { type: String }, //学期
  department: { type: String }, //学院
  nation: { type: String }, //民族
  region: { type: String }, //省
  phone: { type: Number }, //手机
  eMail: { type: String }, //邮件
  street: { type: String }, //地区
  address: { type: String }, //家庭地址
  recommend: { type: String }, //自我介绍
});
const StudentModel = mongoose.model("studentInfo", studentSchema);
//教师信息Schema
const teacherSchema = mongoose.Schema({
  // type:Number, min:3, max:9, required: true
  _id: Number,
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  realName: { type: String, trim: true },
  years: { type: String },
  term: { type: String },
  cname: { type: String, trim: true },
  sex: { type: String },
  department: { type: String },
  affiliation: { type: String },
  age: { type: Number },
  duty: { type: String, trim: true }, //职责
  IDcard: { type: Number },
  nation: { type: String },
  region: { type: String },
  phone: { type: Number },
  eMail: { type: String },
  street: { type: String, trim: true },
  diploma: { type: String }, //学历
});
const TeacherModel = mongoose.model("teacherInfo", teacherSchema);
//管理员信息Schema
const adminSchema = mongoose.Schema({
  _id: Number,
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  realName: { type: String, trim: true },
  sex: { type: String },
  affiliation: { type: String },
  age: { type: Number },
  department: { type: String },
  duty: { type: String, trim: true },
  IDcard: { type: Number },
  diploma: { type: String },
  phone: { type: Number },
  eMail: { type: String },
});
const AdminModel = mongoose.model("adminInfo", adminSchema);

//学生成绩信息Schema
const gradeSchema = mongoose.Schema({
  classno: { type: String },
  username: { type: String },
  realName: { type: String },
  courseNo: { type: String }, //课程号
  credit: { type: String }, //学分
  courseType: { type: String }, //课程类型
  courseName: { type: String }, //课程名称
  grade: { type: Number }, //成绩
  cheat: { type: String }, //是否作弊
  cname: { type: String },
  gpa: { type: Number }, //绩点
  flaggrade: { type: Boolean }, //标识不及格
  department: { type: String },
  courseteacher: { type: String },
});
const GradeModel = mongoose.model("GradeManagement", gradeSchema);
//学生成绩总分信息Schema
const gradetableSchema = mongoose.Schema({
  classno: { type: String },
  username: { type: String },
  realName: { type: String },
  countcredit: { type: Number }, //总学分
  // averagecountcredit: { type: Number }, //平均学分
  flaggrade: { type: Boolean },
  flagcheat: { type: Boolean },
  cname: { type: String },
  department: { type: String },
  count: { type: Number }, //总分
  average: { type: Number }, //平均分
  countgpa: { type: Number }, //总绩点
  // averagegpa: { type: Number }, //平均绩点
});
const GradeTable = mongoose.model("GradeTable", gradetableSchema);
// 向外暴露Model
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;
exports.AdminModel = AdminModel;
exports.GradeTable = GradeTable;
exports.GradeModel = GradeModel;
