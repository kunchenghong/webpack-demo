const {merge} = require('webpack-merge');

const commontConfig = require('./webpack.config.common');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

module.exports = (env) => {
  switch(true){
    case env.development:
      return merge(commontConfig, devConfig)
    case env.production:
      return merge(commontConfig, prodConfig)
    default:
      return new Error("没有匹配上文件")
  }
}