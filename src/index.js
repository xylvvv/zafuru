import program from 'commander';
import { print } from './utils';
import pkg from '../package.json';

program
  .version(`v${pkg.version}`, '-v, --version')
  .usage('<command> [options]');

/* start 运行项目 */
program
  .command('start')
  .description('start your project in development mode')
  .option('-p, --port <port>', 'port used by the server (default: 3007)')
  .action((options) => {
    console.log(options);
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