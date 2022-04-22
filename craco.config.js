const CracoAlias = require('craco-alias');

const emotionPresetOptions = {};

const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPresetOptions,
);

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        jsConfigPath: 'jsconfig.json',
      },
    },
  ],
  babel: {
    plugins: [...emotionBabelPreset.plugins],
  },
};
