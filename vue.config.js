const VConsolePlugin = require('vconsole-webpack-plugin')
module.exports = {
  productionSourceMap: false, // 生产环境不生成map
  publicPath: '/ithome-app',
  configureWebpack: config => {
    // 生产环境去掉vconsole调试器
    const envType = process.env.NODE_ENV !== 'production'
    const pluginsDev = [
      new VConsolePlugin({
        filter: [],
        enable: envType
      })
    ]

    config.plugins = [...config.plugins, ...pluginsDev]
  }
}
