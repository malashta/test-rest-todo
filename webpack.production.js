/**
 * Created by Tallerr on 28.03.2017.
 */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '/build.js'
  },
  externals: {
    'jquery': 'jQuery'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /\/node_modules\//,
        query: {
          plugins: ['add-module-exports'],
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
    noParse: /angular\/angular.js|jquery/
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.jade'),
      title: 'Angular-metro',
      files: {
        css: [
          'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css', 
          '/bundle.css'
        ],
        js: [
          'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js'
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'html', 'css', 'main.css'),
        to: path.join(__dirname, 'dist', 'bundle.css')
      },
      {
        from: path.join(__dirname, 'html', 'media'),
        to: path.join(__dirname, 'dist', 'media')
      }
    ]),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('prod')
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '/vendor.js'),  
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      unsafe: true,
      drop_console: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin()
  ],
};