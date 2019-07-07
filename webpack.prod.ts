import * as path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import common, { makeCssConfig } from './webpack.common';

export default merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
    },
    module: {
        rules: [
            makeCssConfig(true),
        ],
    },
    stats: {
        assetsSort: '!size',
        performance: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: false,
                    },
                },
            }),
        ],
    },
    devtool: 'hidden-source-map',
});
