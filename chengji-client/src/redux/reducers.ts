// 包含n个reducer函数: 根据老的state和指定的action返回一个新的state

import { combineReducers } from "redux";
import { getRedirectTo } from "../utils/path";

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  SEARCH_SUCCESS,
} from "./action-types";
const initUser = {
  username: "", // 用户名
  type: "", // 用户类型
  msg: "", // 错误提示信息
  redirectTo: "", // 需要自动重定向的路由路径 定义好返回给state
  cname: "",
};
// 产生user状态的reducer
const user = (
  state = initUser,
  action: { type: any; data: { type: any; IDcard: any } }
) => {
  switch (action.type) {
    case AUTH_SUCCESS: // data是user
      const { type, IDcard } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(type, IDcard) };
    case ERROR_MSG: // data是msg
      return { ...state, msg: action.data };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return { ...initUser, msg: action.data };
    case SEARCH_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
