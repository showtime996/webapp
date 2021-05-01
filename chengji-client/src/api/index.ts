// 函数返回值为: promise
import ajax from "../utils/ajax";
// 老师注册接口
export const reqteacherRegister = (teacher: any) =>
  ajax("/teacherRegister", teacher, "POST");
// 学生注册接口
export const reqstudentRegister = (student: any) =>
  ajax("/studentRegister", student, "POST");
// 教职工注册接口
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
//录入成绩
export const reqAddGrade = (grade: any) => ajax("/addgrade", grade, "POST");
//成绩信息
export const reqGradeInfo = (grade: any) => ajax("/gradeinfo", grade, "POST");
//老师的cooike信息
export const reqTeacherUserid = (user: any) =>
  ajax("/teacheruserid", user, "POST");
//老师的查询学生
export const reqSearchstu = (user: any) => ajax("/searchstu", user, "POST");
//删除学生信息
export const reqDeleteStudent = (user: any) =>
  ajax("/deletestudent", user, "POST");
//删除成绩信息
export const reqDeleteGrade = (grade: any) =>
  ajax("/deletegrade", grade, "POST");
//同步成绩表信息
export const reqAddGradeCount = (grade: any) =>
  ajax("/addgradecount", grade, "POST");
//老师获取成绩表信息
export const reqGradeCountInfo = (grade: any) =>
  ajax("/gradecountinfo", grade, "POST");
//查询成绩是否不及格作弊
export const reqSearchGradeCheat = (grade: any) =>
  ajax("/searchgradecheat", grade, "POST");
//修改成绩
export const reqEditGrade = (grade: any) => ajax("/updategrade", grade, "POST");
//获取教职工cooike信息
export const reqAdminUserid = (user: any) => ajax("/adminuserid", user, "POST");
//教职工获取成绩表
export const reqAdminGradeCountInfo = (grade: any) =>
  ajax("/admingradecountinfo", grade, "POST");
//获取学生cooike的信息
export const reqStudentUserid = (user: any) =>
  ajax("/studentuserid", user, "POST");
//学生获取成绩表信息
export const reqStudentGrade = (user: any) =>
  ajax("/studentgradecountinfo", user, "POST");
//教职工获取学生信息
export const reqStudentInformation = (user: any) =>
  ajax("/studentinfomation", user, "POST");
//教职工员查询学生
export const reqAdminSearchstu = (user: any) =>
  ajax("/adminsearchstu", user, "POST");
//教务获取老师信息
export const reqTeacherInformation = (user: any) =>
  ajax("/teacherinfomation", user, "POST");
//删除老师
export const reqDeleteTeacher = (user: any) =>
  ajax("/deleteteacher", user, "POST");
//教职工查询老师
export const reqAdminSearchtea = (user: any) =>
  ajax("/adminsearchtea", user, "POST");
//课程信息
export const reqCourse = (course: any) => ajax("/course", course, "POST");
// 课程班级查询
export const reqCourseSearch = (course: any) =>
  ajax("/coursesearch", course, "POST");
export const reqAdminInfomation = () => ajax("/admininfomation", "get");
export const reqDeleteAdmin = (user: any) => ajax("/deleteadmin", user, "POST");
