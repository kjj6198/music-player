const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const config = require('./webpack.config');

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: 'app/index.html',
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
  new webpack.NamedModulesPlugin(),
];

module.exports = config({
  mode: 'development',
  optimization: {
    minimize: false,
  },
  plugins,
});
