const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Apply to TS and TSX files
        use: [
          {
            loader: "babel-loader", // Ensure Babel runs first
          },
          {
            loader: "ts-loader", // Then transpile TS
            options: { transpileOnly: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/, // Apply Babel to JS/JSX
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        app1: "app1@http://localhost:3002/remoteEntry.js",
        app2: "app2@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^6.0.0",
        },
      },
    }),
  ],
};
