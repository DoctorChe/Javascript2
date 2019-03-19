const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        server: path.join(__dirname, 'src/server/server.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: "server/[name].js"
    },
    target: "node",
    node: {
        // Только для express приложения
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                // Compile es6-9 to es5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'src/server/db',
                to: 'server/db/[name].[ext]',
                toType: 'template'
            }
        ])
    ]
};