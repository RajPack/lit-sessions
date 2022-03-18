const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const PACKAGE = require("../package.json");
const version = PACKAGE.version.split(".").splice(0, 2).join(".");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    filename: `${PACKAGE.name}.${version}.js`,
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css|\.s[ac]ss$/i,
        use: [
          "lit-css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "icons/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
