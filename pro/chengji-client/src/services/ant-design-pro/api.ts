// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// 包含了n个接口请求的函数的模块
// 函数返回值为: promise
/** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(options?: { [key: string]: any }) {
//   return request<API.CurrentUser>('/api/currentUser', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

// /** 此处后端没有提供注释 GET /api/notices */
// export async function getNotices(options?: { [key: string]: any }) {
//   return request<API.NoticeIconList>('/api/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

// 老师注册接口
export const reqteacherRegister = async (teacher: any) => {
  return request('/teacherRegister', {
    method: 'POST',
    ...(teacher || {}),
  });
};
// 学生注册接口
export const reqstudentRegister = async (student: any) => {
  return request('/studentRegister', {
    method: 'POST',
    ...(student || {}),
  });
};
// 教务员注册接口
export const reqadminRegister = async (admin: { username: any; password: any; type: any }) => {
  return request('/adminRegister', {
    method: 'POST',
    ...(admin || {}),
  });
};
// 登陆接口
export const reqadminLogin = async ({ username, password }: any) => {
  return request('/adminLogin', {
    method: 'POST',
    ...({ username, password } || {}),
  });
};
export const reqstudentLogin = async ({ username, password }: any) => {
  return request('/studentLogin', {
    method: 'POST',
    ...({ username, password } || {}),
  });
};

export const reqteacherLogin = async ({ username, password }: any) => {
  return request('/teacherLogin', {
    method: 'POST',
    ...({ username, password } || {}),
  });
};

// 更新用户接口
export const reqStudentUpdate = async (student: any) => {
  return request('/studentInfoupdate', {
    method: 'POST',
    ...(student || {}),
  });
};
export const reqTeacherUpdate = async (teacher: any) => {
  return request('/teacherInfoupdate', {
    method: 'POST',
    ...(teacher || {}),
  });
};

export const reqAdminUpdate = async (admin: any) => {
  return request('/adminInfoupdate', {
    method: 'POST',
    ...(admin || {}),
  });
};
