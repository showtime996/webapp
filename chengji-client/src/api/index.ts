// 包含了n个接口请求的函数的模块
// 函数返回值为: promise
import ajax from "../utils/ajax";
// 老师注册接口
export const reqteacherRegister = (teacher: any) =>
  ajax("/teacherRegister", teacher, "POST");
// 学生注册接口
export const reqstudentRegister = (student: any) =>
  ajax("/studentRegister", student, "POST");
// 教务员注册接口
export const reqadminRegister = (admin: {
  username: any;
  password: any;
  type: any;
}) => ajax("/adminRegister", admin, "POST");
// 登陆接口
export const reqadminLogin = ({ username, password }: any) =>
  ajax("/adminLogin", { username, password }, "POST");
export const reqstudentLogin = ({ username, password }: any) =>
  ajax("/studentLogin", { username, password }, "POST");
export const reqteacherLogin = ({ username, password }: any) =>
  ajax("/teacherLogin", { username, password }, "POST");
// 更新用户接口
export const reqStudentUpdate = (student: any) =>
  ajax("/studentInfoupdate", student, "POST");
export const reqTeacherUpdate = (teacher: any) =>
  ajax("/teacherInfoupdate", teacher, "POST");
export const reqAdminUpdate = (admin: any) =>
  ajax("/adminInfoupdate", admin, "POST");

//学生信息查询
export const reqStudentInfo = (user: any) => ajax("/studentInfo", user, "POST");
export const reqAddGrade = (grade: any) => ajax("/addgrade", grade, "POST");
export const reqGradeInfo = (grade: any) => ajax("/gradeinfo", grade, "POST");
export const reqTeacherUserid = (user: any) =>
  ajax("/teacheruserid", user, "POST");
export const reqSearchstu = (user: any) => ajax("/searchstu", user, "POST");
export const reqDeleteStudent = (user: any) =>
  ajax("/deletestudent", user, "POST");
export const reqDeleteGrade = (grade: any) =>
  ajax("/deletegrade", grade, "POST");
export const reqTeacherGrade = (grade: any) =>
  ajax("/gradeTeacherInfo", grade, "POST");
export const reqAddGradeCount = (grade: any) =>
  ajax("/addgradecount", grade, "POST");
export const reqGradeCountInfo = (grade: any) =>
  ajax("/gradecountinfo", grade, "POST");
export const reqSearchGradeCheat = (grade: any) =>
  ajax("/searchgradecheat", grade, "POST");
export const reqEditGrade = (grade: any) => ajax("/updategrade", grade, "POST");
export const reqAdminUserid = (user: any) => ajax("/adminuserid", user, "POST");
export const reqAdminGradeCountInfo = (grade: any) =>
  ajax("/admingradecountinfo", grade, "POST");
