const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const LoadablePlugin = require('@loadable/webpack-plugin');


module.exports = merge(common, {
  entry: { shell:
    "./src/client/index.tsx" },
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new LoadablePlugin()],
});