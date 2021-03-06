let path = require("path"); //内置模块，相对路径解析成绝对路径
let CleanWebpackPlugin = require("clean-webpack-plugin"); //打包去除原有的文件夹

module.exports = {
    mode: "production",
    entry: {
        home: "./src/index.js"  //入口
    },
    output: {
        filename: "calculation.js", //打包后得文件名  加上这个bundle[hash].js  产生一个哈希值
        path: path.resolve(__dirname, "lib"), //路径必须是绝对路径,__dirname当前目录下，不加也可以
        globalObject: "this",   //改变全局指向
        library: "calculation-precisely",   // library指定的就是你使用require时的模块名
        libraryTarget: "umd",   //兼容的模块化定义, libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
        umdNamedDefine: true    // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    },

    plugins: [
        // 打包去除原有的lib  具体配置可以看这个文档https://www.qdtalk.com/2018/11/17/clean-webpack-plugin/
        new CleanWebpackPlugin(['lib'])
    ],
    // 模块加载
    module: {
        rules: [
            // js语法转换
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 插件库，预设
                        presets: [
                            "@babel/preset-env", //js es6语法转换
                        ]
                    }
                },
                include: path.resolve(__dirname, "src") //只在src下找
            }
        ]
    }
};
