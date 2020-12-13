// redux最核心管理的对象模块 创建store 应用中间介 异步redux-thunk
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers.js";
// 向外面去暴露store对象
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
