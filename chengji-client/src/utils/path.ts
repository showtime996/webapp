/*
返回对应的路由路径
 */
export function getRedirectTo(type: string, IDcard: any) {
  let path;
  // type
  if (type === "student") {
    path = "/student";
  } else if (type === "teacher") {
    path = "/teacher";
  } else {
    path = "/admin";
  }
  // 没有值, 返回信息完善界面的path
  if (!IDcard) {
    path += "Info";
  }

  return path;
}
