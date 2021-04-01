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
export const reqStudentInfo = () => ajax("/studentInfo");


