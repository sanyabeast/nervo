const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

const config = {
  devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
  entry: path.join(__dirname, 'src', 'main.js'),
  mode: env,
  output: {
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
    ],
  },
  resolve : {
    modules: ["src", "node_modules"],
    alias: {

    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'index.html'),
      template: path.join(__dirname, 'static', 'index.html'),
      inject: true,
    }),
  ],
};

module.exports = config;