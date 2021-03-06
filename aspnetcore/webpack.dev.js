var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./webpack.helpers');

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {

    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'polyfills' : './polyfills/polyfills.ts',
        'reactApp': [
            'react-hot-loader/patch',
            './reactApp/HelloWorldApp.tsx',
        ],
        'kundeSucheApp': [
            'react-hot-loader/patch',
            './reactApp/KundeSucheApp.tsx',
        ],
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },

    externals: {
        //'polyfills' : '
    },

    resolve: {
        // alias: {
        //     x: 'x/build/x.min.js'
        // },
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.styl', '.html']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/wwwroot/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loaders: [
                    //'react-hot-loader/webpack',
                    'awesome-typescript-loader',
                    'source-map-loader',
                    'tslint-loader'
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },
    node: {
        dns: 'mock',
        net: 'mock'
    },
    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),

        new webpack.optimize.CommonsChunkPlugin({ names: ['polyfills'] }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'reactApp/index.html',
            chunks: ['polyfills', 'reactApp']
        }),

        new HtmlWebpackPlugin({
            filename: 'kundeSuche.html',
            inject: 'body',
            template: 'reactApp/kundeSuche.html',
            chunks: ['polyfills', 'kundeSucheApp']
        }),

        new webpack.NamedModulesPlugin(),

        //new webpack.HotModuleReplacementPlugin(),

        // new CopyWebpackPlugin([
        //     { from: './angularApp/images/*.*', to: 'assets/', flatten: true }
        // ])
    ]

};

