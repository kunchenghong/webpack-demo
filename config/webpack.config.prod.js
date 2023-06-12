const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  output: {
    // 输出文件的文件名
    filename: 'scripts/[name].[contenthash].js',
    // 生产环境配置，可配置绝对路径和相对路径
    publicPath: 'http://localhost:8080/'
  },
  mode: 'production',

  optimization: {
    minimizer: [
      // 压缩css代码
      new cssMinimizerWebpackPlugin(),
      // 压缩代码，在production环境生效
      new TerserWebpackPlugin()
    ],
  }
}