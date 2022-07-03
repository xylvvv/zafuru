const babelConfig = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        useBuiltIns: 'usage',
        corejs: {
          version: '3.17',
          proposals: true,
        },
      },
    ],
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic', // React17新JSX转换规则
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: {
          version: 3,
          proposals: true,
        },
      }
    ],
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        libraryDirectroy: 'es',
        style: 'css',
      },
    ],
    // 装饰器
    [require.resolve('@babel/plugin-proposal-decorators'), { 'legacy': true }],
  ],
};

export default babelConfig;
