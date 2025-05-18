const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(common, {
  entry: "./src/server/index.tsx",
  target: "node",
  mode: "development",
  watch: true,
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "server.js",
    clean: true,
  },
});
