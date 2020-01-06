module.exports = {
  lintOnSave: false,
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,

  devServer: {
    port: '3008',
    open: false,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': {
        // http://10.114.41.231:8080
        target: 'http://172.20.11.88:8998',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  }
};
