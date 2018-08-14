const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const config = require('./server/config');

module.exports = webpackMerge(require('./webpack.config.common.js'), {
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        inline: true,
        port: config.get('ports').webpackDevServer,
        host: '0.0.0.0',
        disableHostCheck: true,
        proxy: {
            '**': `http://localhost:${config.get('ports').express}`,
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],

    devtool: '#inline-source-map',
});
