const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  externals: [nodeExternals()],
  devtool: 'cheap-eval-source-map',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, './src/dist'),
    filename: 'bundle.js'
  },
    devServer: {
      inline: true,
      contentBase: './',
      port: 3001
    },
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         query: {
           compact: true,
           presets: ['env', 'es2015', 'stage-2']
         }
       }
     },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader']
    },
      {
         test: /\.(woff|woff2)$/,
         loader: 'file-loader?name=fonts/[name].[ext]'
     },
    {
     test: /\.scss$/,
     use: [ 'style-loader', 'css-loader', "postcss-loader", 'sass-loader' ]
   },
    {
       test: /\.(jpg|png|jpe?g|gif|svg|ico)$/,
       use: 'file-loader?name=images/[name].[ext]'
     },
   ]
 },
};
