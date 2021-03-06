var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./webpack.helpers');

console.log('@@@@@@@@@ USING PRODUCTION @@@@@@@@@@@@@@@');

module.exports = {

    entry: {
        // 'vendor': './angularApp/vendor.ts',
        //'polyfills': './angularApp/polyfills.ts',
        // 'app': './angularApp/main-aot.ts' // AoT compilation
        'polyfills' : './polyfills/polyfills.ts',
        'reactApp': [
            './reactApp/HelloWorldApp.tsx',
        ],
        'kundeSucheApp': [
            './reactApp/KundeSucheApp.tsx',
        ],
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
    },

    externals: {
        //'x': 'x'
    },

    resolve: {
        // alias: {
        //     x: 'x/build/x.min.js'
        // },
        extensions: ['.ts', '.js', '.json', '.css', '.styl', '.html']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loaders: [
                    'awesome-typescript-loader',
                ]
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

    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),

        new webpack.optimize.CommonsChunkPlugin({ names: ['polyfills'] }),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

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

        // new CopyWebpackPlugin([
        //     { from: './angularApp/images/*.*', to: 'assets/', flatten: true }
        // ])
    ]
};

