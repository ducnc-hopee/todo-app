// const path = require("path");

// module.exports = {
//   mode: "development", // or "production"
//   entry: "./src/index.ts", // your TypeScript entry file
//   output: {
//     filename: "bundle.ts",
//     path: path.resolve(__dirname, "dist"),
//   },
//   resolve: {
//     extensions: [".ts", ".js"], // resolve these extensions
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/, // for .ts files
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/, // for CSS files
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "dist"),
//     },
//     hot: true, // enable Hot Module Replacement
//     port: 3000,
//   },
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: './dist',
    port: 3000,
    open:true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // or just use a default
    }),
  ],
};
