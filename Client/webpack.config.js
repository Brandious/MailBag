const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/code/main.tsx",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      { test: /\.html$/, use: { loader: "html-loader" } },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    ],
  },
  plugins: [
      new HtmlWebPackPlugin({ template: './src/index.html', filename: "./index.html"})      
  ],
  performance: {hints: false},
  watch: true,
  devtool: "source-map"
};
