const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const distPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const templatePath = path.resolve(__dirname, "src/index.html");
const entryFile = srcPath + "/index.tsx";

module.exports = (env) => {
  env = env || {};

  const ghPagesMode = env.ghpages !== undefined;

  return {
    mode: env.development ? "development" : "production",
    devtool: env.development ? "eval-cheap-module-source-map" : undefined,

    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 240000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
          },
        },
      },
    },

    entry: entryFile,
    output: {
      filename: env.development ? "[name].js" : "[name].[contenthash].js",
      path: distPath,
      publicPath: ghPagesMode ? "/image-color-picker/" : "",
      clean: env.clean === "true",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                babelrc: false,
                presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                plugins: [...(env.development ? ["react-refresh/babel"] : [])],
              },
            },
          ],
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]__[local]__[contenthash:base64:5]",
                },
              },
            },
            "postcss-loader",
          ],
          exclude: /node_modules/,
        },

        {
          test: /\.(jpg|png)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/img/[name].[ext]",
          },
        },

        {
          test: /\.(ttf|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[ext]",
          },
        },
      ],
    },

    devServer: {
      hot: true,
      port: process.env.PORT || 3000,
      static: "dist/",
      historyApiFallback: true,
      client: {
        overlay: {
          warnings: false,
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({ template: templatePath }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
        },
      }),
      env.development && new ReactRefreshWebpackPlugin(),
      new MiniCSSExtractPlugin({
        ignoreOrder: true,
      }),
      new webpack.DefinePlugin({
        __CONFIG: JSON.stringify(env.config),
        __DEV: !!env.development,
      }),
    ].filter(Boolean),

    stats: {
      hash: false,
      version: false,
      chunks: false,
      modules: false,
      children: false,
      colors: true,
    },
  };
};
