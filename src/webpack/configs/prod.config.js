import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import baseConfig from './base.config';

const plugins = [
  new CleanWebpackPlugin({
    verbose: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css'
  }),
];

const prodConfig = () => {
  return merge(baseConfig(), {
    mode: 'production',
    output: {
      publicPath: ''
    },
    plugins,
    optimization: {
      minimizer: [
        // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
  });
};

export default prodConfig;
