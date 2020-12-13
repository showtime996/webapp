
//注册的路由组件
import React from 'react'
import 'antd/dist/antd.css'
import '../../assets/css/loginForm.css'
import bj from '../../assets/css/bj.module.less'
import { Form, Input, Button,Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '../../components/header/header';
import Fonter from '../../components/fonter/fonter';

// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式 
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
 class Register extends React.Component {
 
     state = {
       username: '',  // 用户名
       password: '',  // 密码
       password2: '',  // 确认密码
       type: '',  // 用户类型名称   dashen/laoban
     
   
   }
  
  // // 处理输入数据的改变: 更新对应的状态
  // handleChange = (name, val) => {
  //   // 更新状态
  //   this.setState({
  //     [name]: val  // 属性名不是name, 而是name变量的值
  //   })
  // }
   // 点击注册调用
    onFinish = (values) => {
    console.log('Success:', values);
    this.setState({
      username: this.username = values.username,
      password: this.username = values.password,
      password2: this.username = values.password2,
      type: this.username = values.type

      
    })
    //调用redux action中的register方法，判断是否可以注册
      this.props.register(this.state)
      console.log( " this.props",this.props.register);
      console.log("state",this.state);
  };
   // 点击注册调用

  
  toLogin = () => {
    this.props.history.replace('/login')
   }
  

   render() {
     

    // const {msg, redirectTo} = this.props.user
    // // 如果redirectTo有值, 就需要重定向到指定的路由
    // if(redirectTo) {
    //   return <Redirect to={redirectTo}/>
    // }
  
    
  
     
 

     return (

        <div>
          {/* 头部部分 */}
          <Header></Header>
          {/* 中间主体部分 */}
          <div className={bj.logo}>
            {/* {msg ? <div className='error-msg'>{msg}</div> : null} */}
  
            
     
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
     
              <Form.Item>
                <div className="login-form-title" >
                  用户注册
                 </div>
                   
              </Form.Item>
     
     
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
            
                  // onChange={val => { this.handleChange('username', val) }}
                  placeholder="学号/职工号/教工号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                  // onChange={val => { this.handleChange('password', val) }}
                />
                    
              </Form.Item>
              <Form.Item
                name="password2"
                rules={[
                  {
                    required: true,
                    message: '请重新输入密码!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="确认密码"
                  // onChange={val => { this.handleChange('password2', val) }}
                />
                    
              </Form.Item>
             
         <Form.Item name="type" label=" 用户类型：">
              <Radio.Group>
                    
                <Radio  value="student"  >学生</Radio>
                <Radio value="teacher" >老师</Radio>
                <Radio value="administer">教务员</Radio>
              </Radio.Group>
      </Form.Item>
              <Form.Item>
                <Button type="primary"htmlType="submit" className="login-form-button" >
                  注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
                   </Button>
                <p className="login-form-register">
                  已有账号？ <a onClick={this.toLogin}>点击登入!</a>
                </p>
                <div className="login-form-register">
                  <span className="login-form-register-txt">温馨提示:</span>
                   学生账号为学号,老师账号为职工号，教务员账号为教工号！
                   </div>
              </Form.Item>
            </Form>
          </div>
          {/* 底部部分 */}
          <Fonter></Fonter>
        </div>
         
      )
    }
  
  }
   
export default connect(
  // user: state.user  state=user
  state => ({user: state.user}),
  //  函数确定
  {register}
)(Register)