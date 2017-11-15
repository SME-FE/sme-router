const webpack = require('webpack')
const merge = require('webpack-merge')
const example = require('./webpack.example.config')

module.exports = merge(example, {
  devtool: 'none',
  output: {
    publicPath: '/sme-router/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('gh')
      }
    })
  ]
})
