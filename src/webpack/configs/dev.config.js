const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3007, 
    host: '0.0.0.0',
    historyApiFallback: true,
    static: false,
    hot: true,
  },
};

export default devConfig;
