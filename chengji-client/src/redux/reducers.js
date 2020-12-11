// 包含多个reducer函数：根据老的state和指定的action返回一个新的state 结合一个reducer
import { combineReducers } from 'redux'
function xxx(state=0,action){
    return state
}
function yyy(state=0,action){
    return state
}
export default combineReducers({
    xxx,
    yyy
})
// 向外暴露的状态结构