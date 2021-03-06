// 定义加载配置的js 说明自动引包react-app-rewired npm install customize-cra --save-dev npm i less npm i -D less-loader
const path = require("path");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackResolve,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: ["antd", "loginForm", "admin", "common"],
    libraryDirectory: [
      "es",
      "./src/assets/css/loginForm.less",
      "./src/layout/admin/admin.less",
      "./src/layout/common/common.less",
    ],
    style: ["css", "less"], // change importing css to less
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: "[local]--[hash:base64:5]",
      modules: false,
    },
  }),

  addWebpackAlias({
    //  表示@路径默认就是从src开始
    ["@"]: path.resolve(__dirname, "./src"),
  }),
  addWebpackResolve({
    // 表示该队的后缀可以不写
    extensions: [".js", ".tsx", ".json", ".less", ".css", "scss", ".ts"],
  })
);
