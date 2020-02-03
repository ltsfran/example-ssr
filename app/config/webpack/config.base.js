const path = require('path');
const webpack = require('webpack');
const { dotenvOverride, createVarsDefinePlugin } = require('./utils');
const clientPath = path.join(__dirname, '../../client');
const rootPath = path.join(__dirname, '../../');

dotenvOverride();

const publicPath = process.env.PATH_STATIC + '/';

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': path.join(clientPath, 'src/index.tsx')
  },
  output: {
    path: path.join(rootPath, 'dist'),
    publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': clientPath
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(createVarsDefinePlugin())
  ]
};