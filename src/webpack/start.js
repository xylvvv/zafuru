import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devConfig from './configs/dev.config';
import { print } from '../utils';

const start = async () => {
  const { devServer } = devConfig;
  const { port, host } = devServer;
  const devServerOptions = {
    ...devServer,
    open: `http://localhost:${port}`,
  };
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