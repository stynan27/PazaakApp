const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
        nodeIntegration: true
    }
  },
  configureWebpack: {
    // It will be merged into the final Webpack config
    // plugins: [
    //   ... // Your plugins here...
    // ]
    resolve: {
      fallback: {
        "fs": false,
        "path": false,
      } 
    },
  }
})
