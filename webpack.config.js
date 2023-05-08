const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext]'
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
  },

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
      }
    ]
  }
}