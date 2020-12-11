let express = require('express');
let router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel:any} = require('../db/models')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册的路由
router.post('/register', function (req, res) {
    // 读取请求参数数据
    const {username, password, type} = req.body
    // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
    UserModel.findOne({username}, function (err, user) {
      if(user) {
        res.send({code: 1, msg: '此用户已存在'})
      } else { 
        new UserModel({username, type, password:md5(password)}).save(function (error, user) {
          // 生成一个cookie(userid: user._id), 并交给浏览器保存
          res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
          // 返回包含user的json数据
          const data = {username, type, _id: user._id} 
          res.send({code: 0, data})
        })
      }
    })
  })
  // 登陆的路由
router.post('/login', function (req, res) {
    const {username, password} = req.body
    UserModel.findOne({username, password:md5(password)},function (err, user) {
      if(user) { 
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        res.send({code: 0, data: user})
      } else {// 登陆失败
        res.send({code: 1, msg: '用户名或密码不正确!'})
      }
    })
  })