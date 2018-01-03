const path = require('path');
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'app'),
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: { presets: ["env", "react"] }
      }
    ]
  }
};
