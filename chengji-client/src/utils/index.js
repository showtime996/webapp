/*
返回对应的路由路径
 */
export function getRedirectTo(type, header) {
  let path;
  // type
  if (type === "student") {
    path = "/teacher";
  } else {
    path = "/teacher";
  }
  // header
  if (!header) {
    // 没有值, 返回信息完善界面的path
    path += "Info";
  }

  return path;
}
