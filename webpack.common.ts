import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'webpackbar';

const config: webpack.Configuration = {
    entry: {
        app: path.resolve(__dirname, 'src/index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'astroturf/loader',
                    'ts-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'astroturf/loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            title: 'Template by tirr-c',
            description: 'Placeholder description.',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new WebpackBar(),
    ],
    stats: {
        all: false,
        assets: true,
        assetsSort: 'id',
        errors: true,
        errorDetails: true,
        hash: true,
        moduleTrace: true,
        version: true,
        warnings: true,
        warningsFilter: 'size limit',
    },
    devtool: 'inline-source-map',
};

export function makeCssConfig(isProduction: boolean) {
    return {
        test: /\.css$/,
        use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                },
            },
            'postcss-loader',
        ],
    };
}

export default config;
