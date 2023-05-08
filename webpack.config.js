const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      filename: 'app.html',
      inject: 'body'
    })
  ],
  mode: 'development',
  // 设定源代码为原来样式
  devtool: 'inline-source-map',

  // npx webpack --watch  文件更新后代码自动编译

  devServer: {
    static: './dist'
  }
}