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
  ADD_SUCCESS__COUNT,
  SEARCH_SUCCESS__COUNT,
  SEARCH_SUCCESS__GRADECHEAT,
  UPDATE_SUCCESS__GRADE,
  SEARCH_SUCCESS__TEACHER,
  SEARCH_SUCCESS__ADMIN,
  INFO_SUCCESS_COURSE,
  RESET__COURSE,
  SEARCH_SUCCESS__COURSE,
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
  reqDeleteAdmin,
  reqDeleteStudent,
  reqAddGradeCount,
  reqGradeCountInfo,
  reqSearchGradeCheat,
  reqEditGrade,
  reqAdminUserid,
  reqAdminGradeCountInfo,
  reqStudentUserid,
  reqStudentGrade,
  reqAdminInfomation,
  reqStudentInformation,
  reqAdminSearchstu,
  reqTeacherInformation,
  reqDeleteTeacher,
  reqAdminSearchtea,
  reqCourse,
  reqCourseSearch,
} from "../api/index";

// 授权成功的同步action
const authSuccess = (user: any) => ({ type: AUTH_SUCCESS_USER, data: user });
// 错误提示信息的同步action
const errorMsg = (msg: string) => ({ type: ERROR_MSG_USER, data: msg });
// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
// 接收用户的同步action
const receive = (user: any) => ({ type: RECEIVE_USER, data: user });
//删除学生
const deletestudent = (user) => ({ type: DELETE_SUCCESS__USER, data: user });
//删除老师
const deleteteacher = (user) => ({ type: DELETE_SUCCESS__USER, data: user });
//删除教职工
const deleteadmin = (user) => ({ type: DELETE_SUCCESS__USER, data: user });
//删除成绩
const deletegrade = (grade) => ({ type: DELETE_SUCCESS__GRADE, data: grade });
// 查询成绩
const searchgrade = (data: any) => ({
  type: SEARCH_SUCCESS__GRADE,
  data: data,
});
// 修改成绩
const updategrade = (data: any) => ({
  type: UPDATE_SUCCESS__GRADE,
  data: data,
});
// 查询成绩表
const gradecountinfo = (data: any) => ({
  type: SEARCH_SUCCESS__COUNT,
  data: data,
});
// 查询用户
const searchuser = (data: any) => ({
  type: SEARCH_SUCCESS__USER,
  data: data,
});
// 查询作弊不及格
const searchgradecheat = (data: any) => ({
  type: SEARCH_SUCCESS__GRADECHEAT,
  data: data,
});
// 重置用户的同步action
const reset = (msg: any) => ({ type: RESET_USER, data: msg });
//录入成绩
const addgrade = (grade: any) => ({ type: ADD_SUCCESS__GRADE, data: grade });
//同步成绩表
const addgradecount = (grade: any) => ({
  type: ADD_SUCCESS__COUNT,
  data: grade,
});
//重置成绩
const resetgrade = (grade: any) => ({ type: RESET__GRADE, data: grade });
// 重置用户
const resetUser = (StudentInfo: any) => ({
  type: RESET_USER,
  data: StudentInfo,
});
//查询用户cooide
const searchUserid = (data: any) => ({
  type: SEARCH_SUCCESS__COOKIES,
  data: data,
});
const searchteacher = (data: any) => ({
  type: SEARCH_SUCCESS__TEACHER,
  data: data,
});
const searchadmin = (data: any) => ({
  type: SEARCH_SUCCESS__ADMIN,
  data: data,
});
const course = (data: any) => ({
  type: INFO_SUCCESS_COURSE,
  data: data,
});
const coursesearch = (data: any) => ({
  type: SEARCH_SUCCESS__COURSE,
  data: data,
});

const resetcourse = (msg: any) => ({ type: RESET__COURSE, data: msg });
// 注册教职工异步action
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
    return errorMsg("账号必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    // 发送注册的异步ajax请求
    const response = await reqadminRegister({ username, password, type });
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

// 注册老师异步action
export const teacherRegister = (user) => {
  const { username, password, password2, type } = user;
  console.log("password", password);
  console.log("password2", password2);
  if (!username) {
    return errorMsg("账号必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  return async (dispatch) => {
    const response = await reqteacherRegister({ username, password, type });
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

// 注册学生异步action
export const studentRegister = (user) => {
  const { username, password, password2, type } = user;
  console.log("password", password);
  console.log("password2", password2);
  if (!username) {
    return errorMsg("账号必须指定!");
  } else if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }
  return async (dispatch) => {
    const response = await reqstudentRegister({ username, password, type });
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

// 教职工登陆异步action
export const adminLogin = (user) => {
  const { username, password } = user;

  if (!username) {
    return errorMsg("账号必须指定!");
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
      dispatch(errorMsg(result.msg));
    }
  };
};
// 学生登陆异步action
export const studentLogin = (user) => {
  const { username, password } = user;
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if (!username) {
    return errorMsg("账号必须指定!");
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
// 老师登陆异步action
export const teacherLogin = (user) => {
  const { username, password } = user;
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if (!username) {
    return errorMsg("账号必须指定!");
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
export const updateTeacher = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqTeacherUpdate(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receive(result.data));
    } else {
      dispatch(reset(result.msg));
    }
  };
};
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
// 录入成绩异步action
export const addGrade = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAddGrade(grade);
    const result = response.data;
    if (result.code === 0) {
      dispatch(addgrade(result.data));
    } else {
      dispatch(resetgrade(result.msg));
    }
  };
};
// 获取成绩信息action
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
// 教师信息cooikeaction
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
// 获取学生信息action
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
//  老师查询学生信息异步action
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
// 删除学生
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
// 删除成绩
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
// 同步成绩表
export const AddGradeCount = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAddGradeCount(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(addgradecount(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
// 老师获取成绩表信息
export const getGradeCountInfo = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqGradeCountInfo(grade);
    const result = response.data;
    if (result.code === 0) {
      dispatch(gradecountinfo(result.data));
    } else {
      dispatch(resetgrade(result.msg));
    }
  };
};
// 老师获取成绩表作弊不及格信息
export const getGradeCheat = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqSearchGradeCheat(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(searchgradecheat(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
// 修改成绩数据
export const UpdateGradeData = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqEditGrade(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(updategrade(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
// 获取教职工的cooike
export const AdminUserid = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAdminUserid(user);
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
// 教职工获取成绩表
export const getAdminGradeCountInfo = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAdminGradeCountInfo(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(gradecountinfo(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
// 获取学生的cooike
export const StudentUserid = (user: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqStudentUserid(user);
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
// 学生获取学生成绩表
export const getStuGradeCountInfo = (grade: any) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqStudentGrade(grade);
    const result = response.data;
    if (result.code === 0) {
      // 更新成功: data
      dispatch(gradecountinfo(result.data));
    } else {
      // 更新失败: msg
      dispatch(resetgrade(result.msg));
    }
  };
};
// 录入学生
export const addstudent = (user) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqStudentInformation(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(searchuser(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};
// 教职工查询学生信息异步action
export const AdminSearchstu = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqAdminSearchstu(user);

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
// 录入老师
export const addTeacher = (user) => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqTeacherInformation(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(searchteacher(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};
// 删除老师
export const DeleteTeacher = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqDeleteTeacher(user);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(deleteteacher(result.data));
    } else {
      // 失败
      dispatch(resetUser(result.msg));
    }
  };
};
export const addAdmin = () => {
  return async (dispatch: (arg0: { type: string; data: any }) => void) => {
    const response = await reqAdminInfomation();
    const result = response.data;
    if (result.code === 0) {
      // 成功
      // 分发授权成功的同步action
      dispatch(searchadmin(result.data));
    } else {
      // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(result.msg));
    }
  };
};
// 删除教职工
export const DeleteAdmin = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqDeleteAdmin(user);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(deleteadmin(result.data));
    } else {
      // 失败
      dispatch(resetUser(result.msg));
    }
  };
};
// 教职工查询老师信息异步action
export const AdminSearchtea = (user) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqAdminSearchtea(user);

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
// 课程信息
export const Course = (data) => {
  return async (dispatch) => {
    const response = await reqCourse(data);
    const result = response.data;
    if (result.code === 0) {
      dispatch(course(result.data));
    } else {
      dispatch(resetcourse(result.msg));
    }
  };
};

// 课程班级查询
export const CourseSearch = (data) => {
  return async (dispatch) => {
    // 执行异步ajax请求

    const response = await reqCourseSearch(data);

    const result = response.data;

    if (result.code === 0) {
      // 成功

      dispatch(coursesearch(result.data));
    } else {
      // 失败
      dispatch(resetcourse(result.msg));
    }
  };
};
