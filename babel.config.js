module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    //'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@data': './src/data',
          '@types': './src/types',
        },
      },
    ],
  ],
};
