/*
返回对应的路由路径
 */
export function getRedirectTo(type: string, IDcard: any) {
  let path;
  if (type === "student") {
    path = "/student";
  } else if (type === "teacher") {
    path = "/teacher";
  } else {
    path = "/admin";
  }
  if (!IDcard) {
    path += "Info";
  }
  return path;
}
