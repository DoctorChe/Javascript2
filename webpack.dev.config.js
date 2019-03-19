const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", './src/public/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist/public/'),
        publicPath: "",
        filename: "js/[name].js"
    },
    target: "web",
    devtool: "#source-map",
    module: {
        rules: [
            {
                // Compile es6-9 to es5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                //HTML
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        })
    ]
};