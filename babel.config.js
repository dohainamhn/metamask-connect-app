module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          consts: './src/consts',
          helpers: './src/helpers',
          interfaces: './src/interfaces',
          screens: './src/screens',
          stores: './src/stores',
          reducers: './src/reducers',
          apis: './src/apis',
          hooks: './src/hooks',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    ],
  ],
};
