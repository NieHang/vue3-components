const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(MonacoWebpackPlugin)
    config.plugin('circular').use(new CircularDependencyPlugin())
  }
}