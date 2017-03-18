/*
 * webpack.config.js
 * Copyright (C) 2017 Dan Catalano <dev@nwbt.co>
 *
 * Distributed under terms of the MIT license.
 */
let path = require('path')

module.exports = {
  entry: "./js/main.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  module: {
    rules:
    [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
  }
};

