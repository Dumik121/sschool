const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CopyPlugin({
        patterns: [
            { from: './src/assets', to: 'assets' },
        ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader",
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
