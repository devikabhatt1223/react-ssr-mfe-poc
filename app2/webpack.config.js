const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },  
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App", // exposing main component
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-router-dom": { singleton: true, eager: true, requiredVersion: "^6.0.0" }
      },
    }),
  ],
  devServer:{
    port:3003,
    headers: {
      "Access-Control-Allow-Origin": "*", // Important for cross-origin loading
    }
  }
};
