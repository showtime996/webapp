// 包含n个reducer函数: 根据老的state和指定的action返回一个新的state

import { combineReducers } from "redux";
import { getRedirectTo } from "../utils/path";

import {
  AUTH_SUCCESS_USER,
  ERROR_MSG_USER,
  RECEIVE_USER,
  DELETE_SUCCESS__GRADE,
  ADD_SUCCESS__GRADE,
  RESET_USER,
  SEARCH_SUCCESS__COOKIES,
  SEARCH_SUCCESS__USER,
  RESET__GRADE,
  SEARCH_SUCCESS__GRADE,
  DELETE_SUCCESS__USER,
  ADD_SUCCESS__COUNT,
  SEARCH_SUCCESS__COUNT,
  SEARCH_SUCCESS__GRADECHEAT,
} from "./action-types";
const initUser = {
  username: "", // 用户名
  type: "", // 用户类型
  msg: "", // 错误提示信息
  redirectTo: "", // 需要自动重定向的路由路径 定义好返回给state
  cname: "",
};
const initGrade = {
  username: "",
  realName: "",
  courseNo: "",
  classno: "",
  credit: "",
  courseType: "",
  courseName: "",
  grade: "",
  cheat: "",
  pass: "",
};
// 产生user状态的reducer
const user = (
  state = initUser,
  action: { type: any; data: { type: any; IDcard: any } }
) => {
  switch (action.type) {
    case AUTH_SUCCESS_USER: // data是user
      const { type, IDcard } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(type, IDcard) };
    case ERROR_MSG_USER: // data是msg
      return { ...state, msg: action.data };
    case RECEIVE_USER:
      return action.data;
    case DELETE_SUCCESS__USER:
      return action.data;
    case RESET_USER:
      return { ...initUser, msg: action.data };

    default:
      return state;
  }
};
const grade = (state = initGrade, action: { type: any; data: any }) => {
  switch (action.type) {
    case ADD_SUCCESS__GRADE: // data是user
      return action.data;

    case RESET__GRADE:
      return action.data;
    case DELETE_SUCCESS__GRADE:
      return action.data;
    case SEARCH_SUCCESS__GRADE:
      return action.data;
    default:
      return state;
  }
};
const gradecount = (state = initGrade, action: { type: any; data: any }) => {
  switch (action.type) {
    case ADD_SUCCESS__COUNT:
      return action.data;
    case SEARCH_SUCCESS__COUNT:
      return action.data;

    case SEARCH_SUCCESS__GRADECHEAT:
      return action.data;
    default:
      return state;
  }
};
const initcooice = {
  username: "",
  password: "",
  type: "",
  realName: "",
  cname: "",
  classno: "",
  sex: "",
  department: "",
  affiliation: "",
  age: "",
  duty: "",
  IDcard: "",
  nation: "",
  region: "",
  phone: "",
  eMail: "",
  street: "",
  diploma: "",
};

const cooikeuserid = (state = initcooice, action: { type: any; data: any }) => {
  switch (action.type) {
    case SEARCH_SUCCESS__COOKIES:
      return action.data;
    default:
      return state;
  }
};
const stuSearch = (state = initUser, action: { type: any; data: any }) => {
  switch (action.type) {
    case SEARCH_SUCCESS__USER:
      return action.data;
    default:
      return state;
  }
};
export default combineReducers({
  grade,
  user,
  cooikeuserid,
  stuSearch,
  gradecount,
});
