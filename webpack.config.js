
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: [path.join(__dirname, "./src/index.js")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  // devtool: "inline-source-map",
  // devServer: {
  //   contentBase: "./src/",
  //   hot: true
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin("bundle.css")
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"]
  },
  babelrc: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-3"],
            plugins: [
              "react-hot-loader/babel",
              require("@babel/plugin-transform-object-rest-spread")
            ]
          }
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: ["style-loader", "css-loader"]
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: ["style-loader", "css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      }
    ]
  }
};

