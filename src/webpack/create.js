import { createReadStream, createWriteStream, rename } from 'fs';
import path from 'path';
import readline from 'readline';
import { once } from 'events';
import { spawn } from 'child_process';
import { print } from '../utils';

const gitProjectName = 'zafuru-template';
const gitUrl = 'https://github.com/xylvvv/zafuru-template.git';

const overwritePkg = async ({ name, desc }) => {
  const execPath = process.cwd();
  const sourcePath = path.resolve(execPath, `./${name || gitProjectName}/package.json`);
  const targetPath = path.resolve(execPath, `./${name || gitProjectName}/package.json.bk`);
  
  try {
    const reader = createReadStream(sourcePath);
    const writer = createWriteStream(targetPath);
    const rl = readline.createInterface({ input: reader });

    rl.on('line', (line) => {
      let wrote = false;
      if (name && line.includes('name')) {
        writer.write(line.replace(/(?<="name":\s*")[^"]*/, name) + '\n');
        wrote = true;
      }
      if (desc && line.includes('description')) {
        writer.write(line.replace(/(?<="description":\s*")[^"]*/, desc) + '\n');
        wrote = true;
      }
      if (!wrote) writer.write(line + '\n');
    });

    await once(rl, 'close');

    rename(targetPath, sourcePath, (err) => {
      if (err) throw err;
    });
  } catch(e) {
    throw new Error('package.json文件创建失败');
  }
};

const download = (name) => {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['clone', gitUrl, name || gitProjectName], {
      stdio: 'inherit'
    });
    child.on('error', (err) => {
      reject(err);
    });
    child.on('data', (data) => {
      console.log(data);
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      }
    });
  });
};

const create = async (info) => {
  const name = info.name.trim();
  const desc = info.desc.trim();
  try {
    await download(name);
    if (name || desc) {
      await overwritePkg({ name, desc });
    }
    print.green('\n-------✅ ✅ 创建完成-------\n');
  } catch(e) {
    print.red(e.message);
  }
};

export default create;
