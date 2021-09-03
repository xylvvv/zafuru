import path from 'path';
import fs from 'fs';
import merge from 'webpack-merge';
import baseConfig from './configs/base.config';
import devConfig from './configs/dev.config';
import prodConfig from './configs/prod.config';

const execPath = process.cwd();
const customConfigFile = path.resolve(execPath, './zafuru.config.js');

export const mergeConfig = (isDev = false) => {
  let extraBaseConfig = {};
  let extraDevConfig = {};
  let extraProdConfig = {};
  const isExists = fs.existsSync(customConfigFile);
  if (isExists) {
    const customConfig = require(customConfigFile);
    extraBaseConfig = customConfig.base || {};
    extraDevConfig = customConfig.dev || {};
    extraProdConfig = customConfig.prod || {};
  }
  const config = merge(
    baseConfig(isDev),
    isDev ? devConfig : prodConfig,
    extraBaseConfig,
    isDev ? extraDevConfig : extraProdConfig,
  );
  return config;
};