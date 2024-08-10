module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@inspectreplyai': './src/',
          '@utils': './src/utils/',
          '@components': './src/components/',
          '@api': './src/api',
          '@config': './src/config',
          '@assets': './src/assets',
          '@themes': './src/themes',
          '@service': './src/service',
          '@reduxstore': './src/redux',
          types: './@types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
