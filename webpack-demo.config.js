var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./demo/script.js",
  },
  output: {
    filename: "demoScript.js",
    path: path.resolve(__dirname, "demo", "dist"),
    library: "[name].js",
    libraryTarget: "umd",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "demo.html",
      template: "./demo/demo.html",
    }),
  ],
};
