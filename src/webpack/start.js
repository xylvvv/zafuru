import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { mergeConfig } from './config';
import { print } from '../utils';

const start = async (options) => {
  const devConfig = mergeConfig(true);
  const devServerOptions = {
    ...devConfig.devServer,
    ...options,
  };
  const { port, host } = devServerOptions;
  devServerOptions.open = `http://localhost:${port}`;

  const compiler = webpack(devConfig);
  const server = new WebpackDevServer(devServerOptions, compiler);

  try {
    await server.start();
    print.green(`\nStarting the development server at http://${host}:${port}\n`)
  } catch(err) {
    print.red(err);
  }
};

export default start;