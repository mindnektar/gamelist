/* eslint-disable */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(require('./webpack.config.common.js'), {
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new UglifyJsPlugin(),
    ],
});
