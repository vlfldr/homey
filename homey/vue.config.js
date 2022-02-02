//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   // analyze chunk size in dev
//const path = require('path')    // manual three.js tree shaking via exports

module.exports = {
    chainWebpack: (config) => {
        config.module
          .rule("yaml")
          .test(/\.ya?ml$/)
          .use("raw-loader")
          .loader("raw-loader")
          .end();
      },
      // development API proxy
      devServer: {
        proxy: {
          "^/api/": {
            target: "http://0.0.0.0:9101",
            secure: false,
            pathRewrite: {
              '/api/*': '/'
            }
          }
        },
        progress: false
      },
      configureWebpack: {
        // analyze chunk size
        // plugins: [ new BundleAnalyzerPlugin() ],
        optimization: {},
        watchOptions: {
          ignored: /node_modules/
        },
        // Forward all three imports to minimized exports file
        // resolve: {
        //   alias: {
        //     three$: path.resolve('./src/three-exports.js'),
        //   },
        // },
      }
}