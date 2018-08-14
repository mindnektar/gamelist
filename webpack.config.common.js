const path = require('path');

module.exports = {
    context: __dirname,

    entry: {
        app: './client/script/app.jsx',
    },

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'script/[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'client/script',
            'client/script/components/ui',
            'node_modules',
        ],
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
