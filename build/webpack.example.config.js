
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './example/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader?'
      },
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ],
        include: [
          path.resolve(__dirname, '../example/pages/autumn')
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'example.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      showErrors: true,
      // 具体参考：https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
      inject: true,
      template: path.resolve(__dirname, '../example/index.html')
    }),
    new ExtractTextPlugin('style.css'),
    new UglifyJSPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true, // 当用非 hash mode 时，服务器需要做重定向
    compress: true,
    port: 8080
  }
}
