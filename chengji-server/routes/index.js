var express = require("express");
var router = express.Router();
// cookie的id undefined
// const ObjectId = require("mongodb").ObjectId;
//加密
// const md5 = require("blueimp-md5");
const {
  StudentModel,
  TeacherModel,
  AdminModel,
  GradeTable,
  GradeModel,
} = require("../db/models");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

var count = 6000;
var originalArray = new Array(); //原数组
//给原数组originalArray赋值
for (var i = 0; i < count; i++) {
  originalArray[i] = i + 1;
}

originalArray.sort(function () {
  return 0.5 - Math.random();
});
var i = 0;
// for (i;i<count;i++){
// console.log(originalArray[i]);
// }
// 教务员注册的路由
router.post("/adminRegister", function (req, res) {
  // 读取请求参数数据
  const { username, password, type } = req.body;
  // const id = ObjectId(req.body.id);
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  AdminModel.findOne({ username }, function (err, user) {
    // 如果user有值(已存在)

    if (user) {
      // 返回提示错误的信息
      res.send({ code: 1, msg: "此用户已存在" });
    } else {
      // 没值(不存在)
      // 保存
      new AdminModel({
        _id: originalArray[i],
        username,
        type,
        password,
      }).save(function (error, user) {
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        // 返回包含user的json数据
        const data = { username, type, _id: user._id }; // 响应数据中不要携带password
        res.send({ code: 0, data });
      });
    }
  });
  // 返回响应数据
});

// 老师注册的路由
router.post("/teacherRegister", function (req, res) {
  // 读取请求参数数据
  const { username, password, type } = req.body;

  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  TeacherModel.findOne({ username }, function (err, user) {
    // 如果user有值(已存在)
    if (user) {
      // 返回提示错误的信息
      res.send({ code: 1, msg: "此用户已存在" });
    } else {
      // 没值(不存在)
      // 保存
      new TeacherModel({
        _id: originalArray[i],
        username,
        type,
        password,
      }).save(function (error, user) {
        // // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        // 返回包含user的json数据
        const data = { username, type, _id: user._id }; // 响应数据中不要携带password
        res.send({ code: 0, data });
      });
    }
  });
  // 返回响应数据
});

// 学生注册的路由
router.post("/studentRegister", function (req, res) {
  // 读取请求参数数据
  const { username, password, type } = req.body;

  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  StudentModel.findOne({ username }, function (err, user) {
    // 如果user有值(已存在)
    if (user) {
      // 返回提示错误的信息
      res.send({ code: 1, msg: "此用户已存在" });
    } else {
      // 没值(不存在)
      // 保存
      new StudentModel({
        _id: originalArray[i],
        username,
        type,
        password,
      }).save(function (error, user) {
        // // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        // 返回包含user的json数据
        const data = { username, type, _id: user._id }; // 响应数据中不要携带password
        res.send({ code: 0, data });
      });
    }
  });
  // 返回响应数据
});

// 教务员登陆的路由
router.post("/adminLogin", function (req, res) {
  const { username, password } = req.body;
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  AdminModel.findOne({ username, password }, function (err, user) {
    if (user) {
      // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
      // 返回登陆成功信息(包含user)
      res.send({ code: 0, data: user });
    } else {
      // 登陆失败
      res.send({ code: 1, msg: "用户名或密码不正确!" });
    }
  });
});

// 老师登陆的路由
router.post("/teacherLogin", function (req, res) {
  const { username, password } = req.body;

  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  TeacherModel.findOne({ username, password }, function (err, user) {
    if (user) {
      // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
      // 返回登陆成功信息(包含user)
      res.send({ code: 0, data: user, msg: "用户登录成功！" });
    } else {
      // 登陆失败
      res.send({ code: 1, msg: "用户名或密码不正确!" });
    }
  });
});

// 学生登陆的路由
router.post("/studentLogin", function (req, res) {
  const { username, password } = req.body;

  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  StudentModel.findOne({ username, password }, function (err, user) {
    if (user) {
      // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
      // 返回登陆成功信息(包含user)
      res.send({ code: 0, data: user });
    } else {
      // 登陆失败
      res.send({ code: 1, msg: "用户名或密码不正确!" });
    }
  });
});

// 更新学生用户信息的路由
router.post("/studentInfoupdate", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;

  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({ code: 1, msg: "请求的cookie请先登陆" });
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body; // 没有_id
  StudentModel.findByIdAndUpdate(
    { _id: userid },
    user,
    function (error, oldUser) {
      if (!oldUser) {
        // 通知浏览器删除userid cookie
        res.clearCookie("userid");
        // 返回返回一个提示信息
        res.send({ code: 1, msg: "请先登陆" });
      } else {
        // 准备一个返回的user数据对象
        const { id, username, type } = oldUser;
        const data = Object.assign({ id, username, type }, user);
        // 返回
        res.send({ code: 0, data });
      }
    }
  );
});
// 更新老师用户信息的路由
router.post("/teacherInfoupdate", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({ code: 1, msg: "请先登陆" });
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body; // 没有_id
  TeacherModel.findByIdAndUpdate(
    { _id: userid },
    user,
    function (error, oldUser) {
      if (!oldUser) {
        // 通知浏览器删除userid cookie
        res.clearCookie("userid");
        // 返回返回一个提示信息
        res.send({ code: 1, msg: "请先登陆" });
      } else {
        // 准备一个返回的user数据对象
        const { id, username, type } = oldUser;
        const data = Object.assign({ id, username, type }, user);
        // 返回
        res.send({ code: 0, data });
      }
    }
  );
});
// 更新教务员用户信息的路由
router.post("/adminInfoupdate", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;

  // const id = ObjectId(req.body.id);
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({ code: 1, msg: "请先登陆" });
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const user = req.body; // 没有_id
  AdminModel.findByIdAndUpdate(
    { _id: userid },
    user,
    function (error, oldUser) {
      if (!oldUser) {
        // 通知浏览器删除userid cookie
        res.clearCookie("userid");
        // 返回返回一个提示信息
        res.send({ code: 1, msg: "请先登陆" });
      } else {
        // 准备一个返回的user数据对象
        const { _id, username, type } = oldUser;
        const data = Object.assign({ _id, username, type }, user);
        // 返回
        res.send({ code: 0, data });
      }
    }
  );
});

// 获取用户列表(根据类型)
router.post("/studentInfo", function (req, res) {
  const user = req.body; // 没有_id

  TeacherModel.find({ _id: user.id }, function (error, data) {
    console.log();
    console.log("data", data);

    StudentModel.find(
      { years: data[0].years, term: data[0].term, cname: data[0].cname },
      function (error, newuser) {
        res.status = 200;
        res.send({ code: 0, data: newuser });
      }
    );
  });
});

router.post("/addgrade", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({ code: 1, msg: "请先登陆" });
  }
  // 存在, 根据userid更新对应的user文档数据
  // 得到提交的用户数据
  const grade = req.body; // 没有_id

  GradeModel.insertMany({
    username: grade.username,
    realName: grade.realName,
    courseNo: grade.courseNo,
    classno: grade.classno,
    credit: grade.grade >= 60 ? grade.credit : 0,
    courseType: grade.courseType,
    courseName: grade.courseName,
    grade: grade.grade,
    cheat: grade.cheat,
    cname: grade.cname,
    flaggrade: grade.grade < 60 ? true : false,
    flagcheat: grade.cheat === "正常" ? false : true,
    gpa: grade.grade >= 60 ? (grade.grade / 10 - 5).toFixed(2) : 0,
  });
});

// 更新学生用户信息的路由
router.post("/gradeinfo", function (req, res) {
  const grade = req.body; // 没有_id

  GradeModel.find({ username: grade.username }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
  }).exec();
});

router.post("/teacheruserid", function (req, res) {
  const user = req.body; // 没有_id

  TeacherModel.find({ _id: user.id }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
  }).exec();
});
router.post("/searchstu", function (req, res) {
  const user = req.body; // 没有_id

  StudentModel.find(
    { years: user.years, term: user.term, classno: user.classno },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
    }
  ).exec();
});
router.post("/deletestudent", function (req, res) {
  const user = req.body; // 没有_id

  StudentModel.deleteOne({ username: user.username }).exec();
});

router.post("/deletegrade", function (req, res) {
  const grade = req.body; // 没有_id

  GradeModel.deleteOne({ courseNo: grade.courseNo }).exec();
});

router.post("/gradeTeacherInfo", function (req, res) {
  const user = req.body; // 没有_id

  GradeModel.find({ cname: user.cname }, function (error, newuser) {
    res.status = 200;
    res.send({ code: 0, data: newuser });
  });
});
//添加班级成绩信息并且同步实时更新原来数据
router.post("/addgradecount", function (req, res) {
  const getgrade = req.body;
  console.log("getgrade", getgrade);
  const {
    classno,
    username,
    realName,
    countcredit,
    averagecountcredit,
    cname,
    count,
    average,
    countgpa,
    averagegpa,
    flaggrade,
    flagcheat,
  } = req.body;
  GradeTable.findOne({ username }, function (err, oldgrade) {
    if (oldgrade) {
      GradeTable.findOneAndUpdate(
        { username: oldgrade.username },

        getgrade,
        function (error, newgrade) {
          res.send({ code: 0, data: newgrade });
          console.log("newgrade", newgrade);
        }
      );
    } else {
      // 保存
      new GradeTable({
        // _id: originalArray[i],
        classno,
        username,
        realName,
        countcredit,
        averagecountcredit,
        cname,
        count,
        average,
        countgpa,
        averagegpa,
        flaggrade,
        flagcheat,
      }).save(function (error, grade) {
        res.send({ code: 0, data: grade });
      });
    }
  });
});
router.post("/gradecountinfo", function (req, res) {
  const grade = req.body; // 没有_id

  GradeTable.find({ cname: grade.cname }, function (error, newuser) {
    res.status = 200;
    res.send({ code: 0, data: newuser });
  });
});

router.post("/searchgradecheat", function (req, res) {
  const grade = req.body; // 没有_id
  if (grade.classno && Boolean(grade.flaggrade) && Boolean(grade.flagcheat)) {
    GradeTable.find(
      {
        classno: grade.classno,
        flagcheat: Boolean(grade.flagcheat),
        flaggrade: Boolean(grade.flaggrade),
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  } else if (Boolean(grade.flagcheat)) {
    GradeTable.find(
      {
        flagcheat: Boolean(grade.flagcheat),
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  } else if (Boolean(grade.flaggrade)) {
    GradeTable.find(
      {
        flaggrade: Boolean(grade.flaggrade),
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  } else if (grade.classno && Boolean(grade.flagcheat)) {
    GradeTable.find(
      {
        classno: grade.classno,
        flagcheat: Boolean(grade.flagcheat),
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  } else if (grade.classno && Boolean(grade.flaggrade)) {
    GradeTable.find(
      {
        classno: grade.classno,

        flaggrade: Boolean(grade.flaggrade),
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  } else if (grade.classno) {
    GradeTable.find(
      {
        classno: grade.classno,
      },
      function (error, data) {
        res.status = 200;
        res.send({ code: 0, data: data });
      }
    ).exec();
  }
});
module.exports = router;
