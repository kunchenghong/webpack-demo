const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    // 多入口
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'share',
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'share',
    // },
    // share: 'lodash',
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    // 输出文件的文件名
    // filename: 'scripts/[name].[contenthash].js',
    // app.html文件 script引入src的路径
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      filename: 'app.html',
      inject: 'body'
    }),
    new miniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
  ],
  // mode: 'development',
  // 设定源代码为原来样式
  // devtool: 'inline-source-map',

  // npx webpack --watch  文件更新后代码自动编译1

  // devServer: {
  //   static: './dist'
  // },
// 模块相关配置
  module: {
    rules: [
      {
        test: /\.png$/,
        // asset/resource 发送一个单独的文件并导出 URL(dist文件有资源文件) 将文件发送到输出目录
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]'
        }
      },
      {
        test: /\.svg$/,
        // asset/inline 导出一个资源的 data URI(dist文件没有资源文件) 将文件作为 data URI 内联到 bundle 中
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024 // 4M一下不打包进dist
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [miniCssExtractPlugin.loader,'css-loader', 'less-loader']
      },
      // 转换ES6代码
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      }
    ]
  },
optimization: {
  // minimizer: [
  //   // 压缩css代码
  //   new cssMinimizerWebpackPlugin(),
  //   // 压缩代码，在production环境生效
  //   new TerserWebpackPlugin()
  // ],
  // 拆分chunks,代码分离，静态资源分离必须打开
  splitChunks: {
    // 缓存第三方库
    cacheGroups: {
      vender: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vender',
        chunks: 'all'
      }
    }
  }
}
}