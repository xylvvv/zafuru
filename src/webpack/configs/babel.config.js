const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: '3.17',
          proposals: true,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // React17新JSX转换规则
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
      }
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectroy: 'es',
        style: 'css',
      },
    ],
    // 装饰器
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
  ],
};

export default babelConfig;
