var express = require("express");
var router = express.Router();

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
//定义随机数 为了让学生老师教务员的id不一样
var count = 6000;
var originalArray = new Array(); //原数组
//给原数组originalArray赋值
for (var i = 0; i < count; i++) {
  originalArray[i] = i + 1;
}
//排序输出
originalArray.sort(function () {
  return 0.5 - Math.random();
});
var i = 0;

// 教务员注册的路由
router.post("/adminRegister", function (req, res) {
  // 读取请求参数数据
  const { username, password, type } = req.body;

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
        // 生成一个cookie(userid: user._id), 并交给浏览器保存 1天 时分秒天
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        // 返回包含user的json数据
        const data = { username, type, _id: user._id };
        res.send({ code: 0, data });
      });
    }
  });
});

// 老师注册的路由
router.post("/teacherRegister", function (req, res) {
  const { username, password, type } = req.body;

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
        const data = { username, type, _id: user._id };
        res.send({ code: 0, data });
      });
    }
  });
});

// 学生注册的路由
router.post("/studentRegister", function (req, res) {
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
        const data = { username, type, _id: user._id };
        res.send({ code: 0, data });
      });
    }
  });
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
      res.send({ code: 1, msg: "用户名或密码不正确" });
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
      res.send({ code: 0, data: user });
    } else {
      res.send({ code: 1, msg: "用户名或密码不正确" });
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
      res.send({ code: 1, msg: "用户名或密码不正确" });
    }
  });
});

// 更新学生用户信息的路由
router.post("/studentInfoupdate", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;

  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({ code: 1, msg: "请先登陆" });
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

        const data = Object.assign(oldUser, user);
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

// 教师stu 获取学生列表
router.post("/studentInfo", function (req, res) {
  const user = req.body;
  //从前台传入的userid查询该登入老师的信息
  TeacherModel.find({ _id: user.id }, function (error, data) {
    console.log();
    console.log("data", data);
    //根据老师的专业来查询专业名一样的学生
    StudentModel.find(
      { years: data[0].years, term: data[0].term, cname: data[0].cname },
      function (error, newuser) {
        res.status = 200;
        res.send({ code: 0, data: newuser });
      }
    );
  });
});
//录入成绩信息 teacher addgrade
router.post("/addgrade", function (req, res) {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid;

  if (!userid) {
    return res.send({ code: 1, msg: "请先登陆" });
  }

  const grade = req.body;

  GradeModel.insertMany({
    username: grade.username,
    realName: grade.realName,
    courseNo: grade.courseNo,
    department: grade.department,
    classno: grade.classno,
    credit: grade.grade >= 60 ? grade.credit : 0,
    courseType: grade.courseType,
    courseName: grade.courseName,
    courseteacher: grade.courseteacher,
    grade: grade.grade,
    cheat: grade.cheat,
    cname: grade.cname,
    flaggrade: grade.grade < 60 ? true : false,
    // flagcheat: grade.cheat === "正常" ? false : true,
    gpa: grade.grade >= 60 ? (grade.grade / 10 - 5).toFixed(2) : 0,
  });
});
//获取成绩信息
router.post("/gradeinfo", function (req, res) {
  const grade = req.body;
  GradeModel.find({ username: grade.username }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
  }).exec();
});
//获取当前登录老师的信息
router.post("/teacheruserid", function (req, res) {
  const user = req.body;
  TeacherModel.find({ _id: user.id }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
  }).exec();
});
//查询学生信息，查询上面
router.post("/searchstu", function (req, res) {
  const user = req.body;
  //多项判断学号，学期，班级
  StudentModel.find(
    {
      $or: [
        { years: user.years, term: user.term, classno: user.classno },
        // { classno: user.classno },

        // { years: user.years, term: user.term },
      ],
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
    }
  ).exec();
});
//删除学生的信息
router.post("/deletestudent", function (req, res) {
  const user = req.body;

  StudentModel.deleteOne({ username: user.username }).exec();
});
//删除成绩的信息
router.post("/deletegrade", function (req, res) {
  const grade = req.body;
  GradeModel.deleteOne({ courseNo: grade.courseNo }).exec();
});

//添加班级成绩信息并且同步实时更新原来数据 将成绩信息经过总分换算给成绩总分类型表
router.post("/addgradecount", function (req, res) {
  const getgrade = req.body;
  console.log("getgrade", getgrade);
  const {
    classno,
    username,
    realName,
    countcredit,
    // averagecountcredit,
    cname,
    count,
    average,
    countgpa,
    department,
    averagegpa,
    flaggrade,
    flagcheat,
  } = req.body;
  GradeTable.findOne({ username }, function (err, oldgrade) {
    //查询是否存在，存在找到当前信息并且更新，否则新添加一条信息
    if (oldgrade) {
      GradeTable.findOneAndUpdate(
        { username: oldgrade.username },

        getgrade,
        function (error, newgrade) {
          res.send({ code: 0, data: newgrade });
        }
      );
    } else {
      // 保存
      new GradeTable({
        classno,
        username,
        realName,
        countcredit,
        // averagecountcredit,
        cname,
        count,
        average,
        countgpa,
        averagegpa,
        flaggrade,
        flagcheat,
        department,
      }).save(function (error, grade) {
        res.send({ code: 0, data: grade });
      });
    }
  });
});
//根据专业名查询成绩总分的信息
router.post("/gradecountinfo", function (req, res) {
  const grade = req.body; // 没有_id
  GradeTable.find({ cname: grade.cname }, function (error, newuser) {
    res.status = 200;
    res.send({ code: 0, data: newuser });
  });
});
//查询成绩总分表里作弊不及格 成绩表
router.post("/searchgradecheat", function (req, res) {
  const grade = req.body; // 没有_id
  console.log("zzz", grade);
  //多样查找
  GradeTable.find(
    {
      $or: [
        {
          flagcheat: grade.flagcheat === "作弊" ? true : false,
        },
      ],
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
    }
  );
});
//修改成绩 根据学号以及课程号
router.post("/updategrade", function (req, res) {
  const grade = req.body;

  GradeModel.findOneAndUpdate(
    { username: grade.username, courseNo: grade.courseNo },
    {
      username: grade.username,
      realName: grade.realName,
      department: grade.department,
      courseNo: grade.courseNo,
      classno: grade.classno,
      credit: grade.grade >= 60 ? grade.credit : 0,
      courseType: grade.courseType,
      courseteacher: grade.courseteacher,
      courseName: grade.courseName,
      grade: grade.grade,
      cheat: grade.cheat,
      cname: grade.cname,
      flaggrade: grade.grade < 60 ? true : false,
      // flagcheat: grade.cheat === "正常" ? false : true,
      gpa: grade.grade >= 60 ? (grade.grade / 10 - 5).toFixed(2) : 0,
    },
    function (error, oldGrade) {
      const data = Object.assign(oldGrade, grade);
      // 返回
      res.send({ code: 0, data });
    }
  );
});
//教务员的cooike信息
router.post("/adminuserid", function (req, res) {
  const user = req.body; // 没有_id

  AdminModel.find({ _id: user.id }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
  }).exec();
});
//根据学院来查询的成绩表
router.post("/admingradecountinfo", function (req, res) {
  const grade = req.body; // 没有_id

  GradeTable.find({ department: grade.department }, function (error, newuser) {
    res.status = 200;
    res.send({ code: 0, data: newuser });
  }).exec();
});
//查询学生的cooike的信息
router.post("/studentuserid", function (req, res) {
  const user = req.body; // 没有_id
  console.log("user", user);
  StudentModel.find({ _id: user.id }, function (error, data) {
    res.status = 200;
    res.send({ code: 0, data: data });
    console.log("data", data);
  }).exec();
});
//学生个人成绩表信息
router.post("/studentgradecountinfo", function (req, res) {
  const grade = req.body; // 没有_id
  GradeTable.find({ username: grade.username }, function (error, newuser) {
    res.status = 200;
    res.send({ code: 0, data: newuser });
  }).exec();
});
// 教务员获取学生信息
router.post("/studentinfomation", function (req, res) {
  const user = req.body; // 没有_id

  AdminModel.find({ _id: user.id }, function (error, data) {
    StudentModel.find(
      { department: data[0].department },
      function (error, newuser) {
        res.status = 200;
        res.send({ code: 0, data: newuser });
      }
    );
  });
});
//教务员查询 学生信息
router.post("/adminsearchstu", function (req, res) {
  const user = req.body;

  StudentModel.find(
    {
      $or: [
        { years: user.years, term: user.term, department: user.department },
      ],
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
    }
  ).exec();
});
//教务员获取老师信息
router.post("/teacherinfomation", function (req, res) {
  const user = req.body; // 没有_id

  AdminModel.find({ _id: user.id }, function (error, data) {
    TeacherModel.find(
      { department: data[0].department },
      function (error, newuser) {
        res.status = 200;
        res.send({ code: 0, data: newuser });
      }
    );
  });
});
//删除老师
router.post("/deleteteacher", function (req, res) {
  const grade = req.body; // 没有_id
  TeacherModel.deleteOne({ username: grade.username }).exec();
});
//教务员查询 老师信息 按照专业名
router.post("/adminsearchtea", function (req, res) {
  const user = req.body;

  TeacherModel.find(
    {
      cname: user.cname,
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
    }
  ).exec();
});
// 课程信息
router.post("/course", function (req, res) {
  const course = req.body;
  console.log("course", course);
  GradeModel.find(
    {
      courseteacher: course.courseteacher,
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
      console.log("sss", data);
    }
  ).exec();
});
// 课程信息
router.post("/coursesearch", function (req, res) {
  const course = req.body;
  console.log("course", course);
  GradeModel.find(
    {
      $or: [
        { classno: course.classno },
        {
          courseNo: course.courseNo,
        },
      ],
    },
    function (error, data) {
      res.status = 200;
      res.send({ code: 0, data: data });
      console.log("data", data);
    }
  ).exec();
});
module.exports = router;
