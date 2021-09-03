import merge from 'webpack-merge';
import baseConfig from './base.config';

const devConfig = merge(baseConfig(true), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3007, 
    host: '0.0.0.0',
    historyApiFallback: true,
    static: false,
    hot: true,
  }
});

export default devConfig;
