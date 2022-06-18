// const AWS = require("aws-sdk");
const path = require("path");
const slsw = require("serverless-webpack");
async function config() {
  return {
    entry: slsw.lib.entries,
    target: "node",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
      minimize: false,
    },
    node: {
      __dirname: true,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: [
            [
              path.resolve(__dirname, "node_modules"),
              path.resolve(__dirname, ".serverless"),
              path.resolve(__dirname, ".webpack"),
            ],
          ],
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.graphql$/i,
          use: "raw-loader",
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.join(__dirname, ".webpack"),
      filename: "[name].js",
      sourceMapFilename: "[file].map",
    },
    resolve: {
      extensions: [".mjs", ".json", ".ts", ".js"],
      symlinks: false,
      cacheWithContext: false,
      alias: {
        functions: path.resolve(__dirname, "functions"),
        utils: path.resolve(__dirname, "utils"),
        gql: path.resolve(__dirname, "gql"),
        middlewares: path.resolve(__dirname, "middlewares"),
      },
    },
  };
}

module.exports = config();