const babelConfig = {
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage", // or "entry"
      "corejs": 3
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/transform-runtime", {
      "corejs": 3
    }],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectroy": "es",
        "style": "css"
      }
    ]
  ]
};

export default babelConfig;