const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts', // Cập nhật thành index.ts sau này
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Giữ nếu dùng Babel
      },*/
    ],
  },

  plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    devServer: {
      static: "./dist",
      open: true,
      port: 3000,
    },
    mode: "development",
};