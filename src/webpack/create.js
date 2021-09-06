import { createReadStream, createWriteStream, renameSync } from 'fs';
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

    renameSync(targetPath, sourcePath);
  } catch(e) {
    throw new Error('Failed to modify the file package.json!!!');
  }
};

const download = (name) => {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['clone', gitUrl, name], {
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
      } else {
        reject('Failed to pull template. Please try again later!!!');
      }
    });
  });
};

const create = async (info) => {
  const name = info.name.trim();
  const desc = info.desc.trim();
  try {
    const dirName = name || gitProjectName;
    await download(dirName);
    if (name || desc) {
      await overwritePkg({ name, desc });
    }
    print.green('\n✅ ✅ Done. Now run:\n');
    console.log(`  cd ${dirName}`);
    console.log('  npm install');
    console.log('  npm run start');
  } catch(e) {
    print.red(e.message || e);
  }
};

export default create;
