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
        'webpack-dev-server/client?http://0.0.0.0:3333',
        'webpack/hot/only-dev-server',
        './app.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: '/bundle.js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        outputPath: path.join(__dirname, 'public')
    },
    devtool: 'cheap-inline-module-source-map',
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, 'src', 'index.jade'),
            title: 'Angular-metro',
            files: {
                css: [
                    'http://cdn.metroui.org.ua/css/metro.min.css',
                    'http://cdn.metroui.org.ua/css/metro-colors.min.css',
                    'http://cdn.metroui.org.ua/css/metro-schemes.min.css',
                    'http://cdn.metroui.org.ua/css/metro-icons.min.css',
                    'http://cdn.metroui.org.ua/css/metro-responsive.min.css',
                    'http://cdn.metroui.org.ua/css/metro-rtl.min.css',
                    'http://cdn.metroui.org.ua/css/metro-font-cdn.css',
                    '/bundle.css'
                ],
                js: [
                    'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js',
                    'http://cdn.metroui.org.ua/js/metro.min.js'
                ]
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src', 'vendor', 'main.css'),
                to: path.join(__dirname, 'public', 'bundle.css')
            },
            // {
            //   from: path.join(__dirname, 'html', 'media'),
            //   to: path.join(__dirname, 'public', 'media')
            // }
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('dev')
        })
    ],
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};