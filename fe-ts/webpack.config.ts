const path = require('path');

module.exports = {
  entry: './src/index.ts',   // your entry TS file
  module: {
    rules: [
      {
        test: /\.tsx?$/,      // matches .ts and .tsx files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.ts'],  // resolve these extensions
  },
  output: {
    filename: 'bundle.ts',
    path: path.resolve(__dirname, 'dist'),  // output folder
  },
  mode: 'development',   // or 'production' for minified bundle
};
