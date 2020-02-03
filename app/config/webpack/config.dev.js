const path = require('path');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./config.base');
const clientPath = path.join(__dirname, '../../client');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin({
      hash: true,
      template: path.join(clientPath, 'public/index.html')
    })
  ]
});
