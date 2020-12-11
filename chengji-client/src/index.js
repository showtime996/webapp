// 入口的js
import React from 'react'
import ReactDOM from 'react-dom'
// react-router-dom比react-router功能更多
import { HashRouter,Route ,Switch} from "react-router-dom"
import {Provider} from 'react-redux'
import Register from '@/containers/register/register.jsx'
import Main from '@/containers/main/main.jsx'
import Login from '@/containers/login/login.jsx'
import store from './redux/store.js'
const app=document.getElementById('root')
ReactDOM.render((
    <Provider store={store}>
    <HashRouter>
        <Switch>
        <Route path='/register' component={Register}></Route>  
        <Route path='/login' component={Login}></Route>  
        {/* 默认的组件 */}
        <Route component={Main}></Route>  
        </Switch>
    </HashRouter>
    </Provider>
    ), app)