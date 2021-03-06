// 能发送ajax请求的函数模块
// 函数的返回值是promise对象
// 封装ajax的请求

import axios from "axios";
const baseUrl = "";

export default function ajax(url: string, data: any = {}, type = "GET") {
  url = baseUrl + url;
  if (type === "GET") {
    // 发送GET请求 对数据data格式化处理
    let paramStr = "";
    //返回数组方法遍历
    Object.keys(data).forEach((key) => {
      paramStr += key + "=" + data[key] + "&";
    });
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length - 1);
    }
    // 使用axios发get请求
    return axios.get(url + "?" + paramStr);
  } else {
    // 发送POST请求
    // 使用axios发post请求
    return axios.post(url, data);
  }
}
