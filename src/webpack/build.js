import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { mergeConfig } from './config';
import { print } from '../utils';

const build = (analyzerOptions) => {
  const compiler = webpack(mergeConfig());

  if (analyzerOptions) {
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: analyzerOptions.host || '127.0.0.1',
      analyzerPort: analyzerOptions.port || 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }).apply(compiler);
  }

  compiler.run((err, stats) => {
    if (err) {
      print.red(err);
      process.exit(2);
    }
    console.log(stats && stats.toString({
      chunks: false,
      colors: true,
      children: false,
    }));
    print.green('\n-------✅ ✅ 构建完成-------\n');
  });
};

export default build;
