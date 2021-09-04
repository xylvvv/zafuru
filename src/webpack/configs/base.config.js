import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import babelConfig from './babel.config';

const execPath = process.cwd();

const baseConfig = (isDev = false) => {
  const loadersForLess = [
    !isDev ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
      }
    } : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [require(path.resolve(execPath, './node_modules/autoprefixer'))()],
        },
      },
    },
    'less-loader', // compiles Less to CSS
  ];

  return {
    entry: {
      app: path.resolve(execPath, './src/index.js'),
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(execPath, './dist'),
      chunkFilename: '[name].[contenthash].chunk.js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(execPath, './src/document.ejs'),
        favicon: path.resolve(execPath, './favicon.ico'),
      }),
      new ProgressBarPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: babelConfig,
          }],
        },
        {
          test: /\.css$/,
          use: loadersForLess.slice(0, -1),
        },
        {
          test: /\.less$/,
          include: path.resolve(execPath, './src'),
          use: loadersForLess,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]?v=[hash:6]',
              publicPath: '../',
              limit: 1024 * 4,
            }
          }]
        },
        {
          test: /\.(wav|woff|woff2|eot|ttf|mp3|mp4)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?v=[hash:6]',
              publicPath: '../'
            }
          }]
        }
      ]
    }
  };
};

export default baseConfig;
