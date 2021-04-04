
// 包含n个action creator
// 异步action
// 同步action
import {
  AUTH_SUCCESS_USER,
  ERROR_MSG_USER,
  RECEIVE_USER,
  SEARCH_SUCCESS__USER,
  ADD_SUCCESS__GRADE,
  RESET_USER,
  SEARCH_SUCCESS__COOKIES,
  RESET__GRADE,
  SEARCH_SUCCESS__GRADE,
  DELETE_SUCCESS__USER,
  DELETE_SUCCESS__GRADE,
} from "./action-types";
import {
  reqteacherRegister,
  reqstudentRegister,
  reqAddGrade,
  reqadminRegister,
  reqGradeInfo,
  reqadminLogin,
  reqSearchstu,
  reqTeacherUserid,
  reqstudentLogin,
  reqteacherLogin,
  reqStudentUpdate,
  reqTeacherUpdate,
  reqAdminUpdate,
  reqStudentInfo,
  reqDeleteGrade,
  reqDeleteStudent,
} from "../api/index";

// 授权成功的同步action
const authSuccess = (user: any) => ({ type: AUTH_SUCCESS_USER, data: user });
// 错误提示信息的同步action
const errorMsg = (msg: string) => ({ type: ERROR_MSG_USER, data: msg });
// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
// 接收用户的同步action
const receive = (user: any) => ({ type: RECEIVE_USER, data: user });
const deletestudent = (user) => ({ type: DELETE_SUCCESS__USER, data: user });
const deletegrade = (grade) => ({ type: DELETE_SUCCESS__GRADE, data: grade });
// 查询用户action
const searchgrade = (data: any) => ({
  type: SEARCH_SUCCESS__GRADE,
  data: data,
});
const searchuser = (data: any) => ({
  type: SEARCH_SUCCESS__USER,
  data: data,
});

// 重置用户的同步action
const reset = (msg: any) => ({ type: RESET_USER, data: msg });
// 接收用户的同步action
const addgrade = (grade: any) => ({ type: ADD_SUCCESS__GRADE, data: grade });
const resetgrade = (grade: any) => ({ type: RESET__GRADE, data: grade });
// 查询用户action
const resetUser = (StudentInfo: any) => ({
  type: RESET_USER,
  data: StudentInfo,
});
const searchUserid = (data: any) => ({
  type: SEARCH_SUCCESS__COOKIES,
  data: data,
});
// 注册教务员异步action
export const adminRegister = (user: {
  username: any;
  password: any;
  password2: any;
  type: any;
}) => {
  const { username, password, password2, type } = user;
  console.log("password", password);
  console.log("password2", password2);
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action

  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    // 发送注册的异步ajax请求
    const response = await reqadminRegister({ username, password, type });
    const result = response.data; //  {code: 0/1, data: user, msg: ''}
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};
// 等待教务员注册完成 接口已经封装完成

// 注册老师异步action
export const teacherRegister = (user) => {
  const { username, password, password2, type } = user;
  console.log("password", password);
  console.log("password2", password2);
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action

  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async (dispatch) => {
    // 发送注册的异步ajax请求
    const response = await reqteacherRegister({ username, password, type });
    const result = response.data; //  {code: 0/1, data: user, msg: ''}
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};

// 注册学生异步action
export const studentRegister = (user) => {
  const { username, password, password2, type } = user;
  console.log("password", password);
  console.log("password2", password2);
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action

  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async (dispatch) => {
    // 发送注册的异步ajax请求
    const response = await reqstudentRegister({ username, password, type });
    const result = response.data; //  {code: 0/1, data: user, msg: ''}
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};

// 登陆异步action
export const adminLogin = (user: { username: any; password: any }) => {
  const { username, password } = user;
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (!password) {
    return errorMsg("密码必须指定!");
  }
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqadminLogin(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};

export const studentLogin = (user: { username: any; password: any }) => {
  const { username, password } = user;
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (!password) {
    return errorMsg("密码必须指定!");
  }
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqstudentLogin(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};

export const teacherLogin = (user: { username: any; password: any }) => {
  const { username, password } = user;
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if (!username) {
    return errorMsg("用户名必须指定!");
  } else if (!password) {
    return errorMsg("密码必须指定!");
  }
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqteacherLogin(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(authSuccess(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};

// 更新用户异步action
export const updateStudent = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqStudentUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(receive(result.data));
    } else {
      // 更新失败: msg
      dispatch(reset(result.msg));
    }
  };
};
// 更新用户异步action
export const updateTeacher = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqTeacherUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(receive(result.data));
    } else {
      // 更新失败: msg
      dispatch(reset(result.msg));
    }
  };
};
// 更新用户异步action
export const updateAdmin = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAdminUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(receive(result.data));
    } else {
      // 更新失败: msg
      dispatch(reset(result.msg));
    }
  };
};

export const addGrade = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAddGrade(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(addgrade(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
export const GradeInfo = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqGradeInfo(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(searchgrade(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
export const TeacherUserid = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqTeacherUserid(user);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(searchUserid(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetUser(result.msg));
    }
  };
};
export const InfoStu = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqStudentInfo(user);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(receiveUser(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetUser(result.msg));
    }
  };
};
// 查询学生信息异步action
export const Searchstu = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqSearchstu(user);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(searchuser(result.data));
    } else {
      // 失败
      dispatch(resetUser(result.msg));
    }
  };
};
export const DeleteStudent = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqDeleteStudent(user);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(deletestudent(result.data));
    } else {
      // 失败
      dispatch(resetUser(result.msg));
    }
  };
};
export const DeleteGrade = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqDeleteGrade(user);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(deletegrade(result.data));
    } else {
      // 失败
      dispatch(resetgrade(result.msg));
    }
  };
};
