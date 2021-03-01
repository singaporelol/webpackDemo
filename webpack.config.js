const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", //production
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "dist"),
  },
  //loader配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          // 图片大小小于8kb，就会被base64处理
          limit: 8 * 1024,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: "[hash:10].[ext]",
          outputPath: "imgs2",
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
      //字体图标
      // {
      //   test: /\.ttf|svg|eot|woff|woff2$/,
      //   loader: "url-loader",
      //   options: {
      //     name: "[hash:10].[ext]",
      //   },
      // },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  //plugin配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  // webpack serve
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "dist"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};
