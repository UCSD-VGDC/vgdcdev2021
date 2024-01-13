// import { webpack } from "./node_modules/webpack";
const webpack  = require('./node_modules/webpack');
const path = require('path');

module.exports = {
    entry: './src/index.html', // Specify the entry point of your application
    output: {
      filename: 'bundle.js', // Specify the output bundle file
      path: path.resolve(__dirname, 'dist'), // Specify the output directory
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      }),
    ],
  };
  