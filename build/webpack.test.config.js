
const path = require('path')

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            /**
             * 具体参考：https://segmentfault.com/a/1190000006895064 
             * 以及 babel-plugin-istanbul 文档
             */ 
            plugins: ['istanbul']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
