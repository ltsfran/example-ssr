const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');
const serverPath = path.join(__dirname, '../../server');
const rootPath = path.join(__dirname, '../../');

module.exports = merge(baseConfig, {
  target: 'node',
  externals: nodeExternals({
    moduleFromFile: true
  }),
  entry: path.join(serverPath, 'index.tsx'),
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'ssr.js',
    globalObject: 'this'
  },
  mode: 'production',
  node: {
    __dirname: false
  }
});