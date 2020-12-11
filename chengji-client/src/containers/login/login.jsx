
//登陆的路由组件


import React from 'react'
import 'antd/dist/antd.css'
import bj from '../../assets/css/bj.module.less'
import '../../assets/css/loginForm.css'
// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

// import {login} from '../../redux/actions'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends React.Component {
     
    state = {
        username: '',  // 用户名
        password: '',  // 密码
      }
      login = () => {
        // this.props.login(this.state)
        console.log(this.state)
      }
    
      // 处理输入数据的改变: 更新对应的状态
      handleChange = (name, val) => {
        // 更新状态
        this.setState({
          [name]: val  // 属性名不是name, 而是name变量的值
        })
      }
    
      toRegister = () => {
        this.props.history.replace('/register')
      }
    render(){         
        const NormalLoginForm = () => {
            const onFinish = (values) => {
              console.log('Received values of form: ', values);
            }
             // const {msg, redirectTo} = this.props.user
                // // 如果redirectTo有值, 就需要重定向到指定的路由
                // if(redirectTo) {
                //   return <Redirect to={redirectTo}/>
                // }
        }
        
   
        return(
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
              用户登入
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
            <Form.Item>
              <Form.Item name="remember" valuePropName="" noStyle>
                <Checkbox>记住我的用户名</Checkbox>
              </Form.Item>
      
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>
      
            <Form.Item>
              <Button type="primary"  className="login-form-button" onClick={this.login}>
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
              </Button>
              <br></br>
      
              <br></br>
               <p className="login-form-register">
              
              没有账号？ <a onClick={this.toRegister}>点击注册!</a>
              </p>
              <div  className="login-form-register">
              <span className="login-form-register-txt">温馨提示:</span>
              学生账号为学号,老师账号为职工号，教务员账号为教工号！
              </div>
            </Form.Item>
          </Form>
        </div>
    
        )
    
    }

}
// export default connect(
//   state => ({user: state.user}),
//   {login}
// )(Login)