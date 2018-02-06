/* eslint-disable */
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

module.exports = {
    context: __dirname,

    entry: {
        main: './script/main.jsx',
    },

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'script/[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, 'script'),
            path.join(__dirname, 'script/components/ui'),
            path.join(__dirname, 'node_modules'),
        ]
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'],
                            plugins: [
                                'transform-class-properties',
                                'transform-object-rest-spread',
                            ],
                        },
                    },
                ],
            },

            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { url: false } },
                    { loader: 'sass-loader' },
                    { loader: 'import-glob-loader' },
                ],
            },
        ],
    },
};
