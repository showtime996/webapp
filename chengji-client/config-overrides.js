// 定义加载配置的js 说明自动引包react-app-rewired npm install customize-cra --save-dev npm i less npm i -D less-loader
const path = require('path')
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addPostcssPlugins
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: 'css', // change importing css to less
        libraryName: "loginForm",libraryDirectory: "./src/assets/css/loginForm.css",  style: 'css' 
    }),
  

    addLessLoader({
        lessOptions: {
           javascriptEnabled: true,
           localIdentName: '[local]--[hash:base64:5]',
           modules:false

        }
    }),
  
    addWebpackAlias({     
         //  表示@路径默认就是从src开始
        ['@']:path.resolve(__dirname,'./src'),        
        ["containers"]: path.resolve(__dirname, "src/containers"),        
        ["components"]: path.resolve(__dirname, "src/components")   
    }),
//     addWebpackResolve({     
//          // 表示该队的后缀可以不写
//          extensions:['.js','.jsx','.json','.less','.css','scss'], 
//    }),

);

