const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  output: {
    // 输出文件的文件名
    filename: 'scripts/[name].js',
  },
  mode: 'development',
  // 设定源代码为原来样式
  devtool: 'inline-source-map',

  // npx webpack --watch  文件更新后代码自动编译1

  devServer: {
    static: './dist'
  },
}