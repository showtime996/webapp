
//注册的路由组件
import React from 'react'
import 'antd/dist/antd.css'
import bj from '../../assets/css/bj.module.less'
import { Form, Input, Button,Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '../../components/header/header';
import Fonter from '../../components/fonter/fonter';
// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import {register} from '../../redux/actions'
export default class Register extends React.Component {
  state = {
    username: '',  // 用户名
    password: '',  // 密码
    password2: '',  // 确认密码
    type: 'student',  // 用户类型名称   dashen/laoban
  }

  // 点击注册调用
  register = () => {
    console.log(this.state)
    // this.props.register(this.state)
  }

  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
    // const {msg, redirectTo} = this.props.user
    // // 如果redirectTo有值, 就需要重定向到指定的路由
    // if(redirectTo) {
    //   return <Redirect to={redirectTo}/>
    // }
    const NormalLoginForm = () => {
      const onFinish = (values) => {
        console.log('Received values of form: ', values);
      }
    }
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
                   <Input prefix={<UserOutlined className="site-form-item-icon" onChange={val => {this.handleChange('username', val)}} />} placeholder="学号/职工号/教工号" />
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
                   <Input.Password
                     prefix={<LockOutlined className="site-form-item-icon" />}
                     type="password"
                     placeholder="密码"
                     onChange={val => {this.handleChange('password', val)}}
                   />
                    
                 </Form.Item>
                 <Form.Item
                   name="repassword"
                   rules={[
                     {
                       required: true,
                       message: '请重新输入密码!',
                     },
                   ]}
                 >     
                   <Input.Password
                     prefix={<LockOutlined className="site-form-item-icon" />}
                     type="password"
                     placeholder="确认密码"
                     onChange={val => {this.handleChange('password2', val)}}
                   />
                    
                 </Form.Item>
                 <Form.Item>
                 <div className="register-type" >
                   用户类型：
                 </div> 
                 <Radio checked={type==='student'} onChange={() => this.handleChange('type', 'student')}>学生</Radio>
                  &nbsp;&nbsp;&nbsp;
                 <Radio checked={type==='teacher'}  onChange={() => this.handleChange('type', 'teacher')}>老师</Radio>
                 &nbsp;&nbsp;&nbsp;
                 <Radio checked={type==='administrator'}  onChange={() => this.handleChange('type', 'administrator')}>教务员</Radio>
                 </Form.Item>
                 <Form.Item>
                   <Button type="primary"  className="login-form-button" onClick={this.register}>
                     注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
                   </Button>
                    <p className="login-form-register">               
                   已有账号？ <a onClick={this.toLogin}>点击登入!</a>
                   </p>
                   <div  className="login-form-register">
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
// export default connect(
//   state => ({user: state.user}),
// //   {register}
// )(Register)