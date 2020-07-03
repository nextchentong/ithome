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
    // 判断为生产模式下，因为开发模式我们是想保存console的
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress
        option.drop_console = true // 打开开关
        return arg
      })
    }
  }
}
