// 包含了n个接口请求的函数的模块
// 函数返回值为: promise
import ajax from "./ajax.js";
// 老师注册接口
export const reqteacherRegister = (teacher) =>
  ajax("/teacherRegister", teacher, "POST");
// 学生注册接口
export const reqstudentRegister = (student) =>
  ajax("/studentRegister", student, "POST");
// 教务员注册接口
export const reqadminRegister = (admin) =>
  ajax("/adminRegister", admin, "POST");
// 登陆接口
export const reqadminLogin = ({ username, password }) =>
  ajax("/adminLogin", { username, password }, "POST");
export const reqstudentLogin = ({ username, password }) =>
  ajax("/studentLogin", { username, password }, "POST");
export const reqteacherLogin = ({ username, password }) =>
  ajax("/teacherLogin", { username, password }, "POST");
// 更新用户接口
export const reqStudentUpdate = (student) =>
  ajax("/studentInfoupdate", student, "POST");
export const reqTeacherUpdate = (teacher) =>
  ajax("/teacherInfoupdate", teacher, "POST");
export const reqAdminUpdate = (admin) =>
  ajax("/adminInfoupdate", admin, "POST");
