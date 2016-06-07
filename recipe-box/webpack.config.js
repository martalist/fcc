const validate          = require('webpack-validator');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');
const webpack           = require("webpack");

module.exports = validate({
  entry: ["./source/js/main.js"],
  output: {
    path: __dirname + '/public',
    publicPath: '/public/',
    filename: 'main.js'
  },
  devServer: {
    inline: true,
    port: 8000
  },
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        include: /sass/,
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env':{
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new ExtractTextPlugin('style.css', {allChunks: true})
  ],
  postcss: () => [precss, autoprefixer]
});
