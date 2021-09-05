import program from 'commander';
import inquirer from 'inquirer';
import { print } from './utils';
import pkg from '../package.json';
import { start, build, create } from './webpack';

const questions = [
  {
    name: 'ok',
    type: 'confirm',
    message: 'Create a new project or not?'
  },
  {
    name: 'name',
    message: 'Please enter project name:',
    when: (res) => Boolean(res.ok),
  },
  {
    name: 'desc',
    message: 'Please enter project description:',
    when: (res) => Boolean(res.ok),
  },
];

/* create 新建项目 */
program
  .command('create')
  .description('create a project')
  .action(async () => {
    print.green('\n🎉🎉🎉~欢迎使用zafuru，轻松构建react&ts项目～🎉🎉🎉\n')
    const answer = await inquirer.prompt(questions);
    if (answer.ok) {
      create(answer);
    }
  });

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

if (process.argv.length <= 2) {
  program.outputHelp();
}

// 未知命令
program
  .arguments('<command>')
  .action((cmd) => {
    print.red(`\nUnknown command: ${print.yellow(cmd, false)}\n`);
    program.outputHelp();
  });

program.parse(process.argv);
