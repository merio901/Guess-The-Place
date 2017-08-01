const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, './src/dist'),
    filename: 'bundle.js'
  },
    devServer: {
      inline: true,
      contentBase: './src/views/',
      port: 3001
    },
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['env']
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
       test: /\.(png|jpe?g|gif|svg|ico)$/,
       use: 'file-loader?name=images/[name].[ext]'
     },
   ]
 },
 
};
