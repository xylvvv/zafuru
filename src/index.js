import program from 'commander';
import { print } from './utils';
import pkg from '../package.json';
import { start, build } from './webpack';

program
  .version(`v${pkg.version}`, '-v, --version')
  .usage('<command> [options]');

/* start 运行项目 */
program
  .command('start')
  .description('start your project in development mode')
  .option('-p, --port <port>', 'port used by the server (default: 3007)')
  .option('--host <host>', 'host used by the server (default: 0.0.0.0)')
  .action((options) => {
    start(options);
  });

/* build 打包项目 */
program
  .command('build')
  .description('build your project in production mode')
  .action(() => {
    build();
  });

/* analyze bundle分析 */
program
  .command('analyze')
  .description('Visualize size of webpack output files with an interactive zoomable treemap')
  .option('-p, --port <port>', 'Default: 8888. Port that will be used in server mode to start HTTP server.')
  .option('--host <host>', 'Default: 127.0.0.1. Host that will be used in server mode to start HTTP server.')
  .action((options) => {
    build(options);
  });

// 未知命令
program
  .arguments('<name>')
  .action((name) => {
    print.red(`Unknown command: ${print.yellow(name, false)}`);
    program.outputHelp();
  });

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.outputHelp();
}