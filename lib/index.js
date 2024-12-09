import StyleDictionary from 'style-dictionary';
import logo from './misc/logo.js';

const { log, error } = console;

/**
 * @typedef {import('style-dictionary').Config} StyleDictionaryConfig
 */

/** @type {StyleDictionaryConfig} */
const styleDictionaryConfig = {
  source: ['token-studio/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['size/pxToRem'],
      basePxFontSize: 16,
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['size/pxToRem', 'name/kebab'],
      basePxFontSize: 16,
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      transforms: ['name/camel'],
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      transforms: ['name/camel'],
      buildPath: 'build/ts/',
      files: [
        {
          format: 'typescript/es6-declarations',
          destination: 'tokens.d.ts',
          options: {
            outputStringLiterals: true,
          },
        },
      ],
    },
  },
};

/**
 * @async
 * @returns {Promise<void>}
 */
const init = async () => {
  try {
    const sd = new StyleDictionary(styleDictionaryConfig);

    log(logo);
    log('Initializing Style Dictionary...');

    await sd.hasInitialized;

    log('Cleaning all platforms...');
    await sd.cleanAllPlatforms();

    log('Building all platforms...');
    await sd.buildAllPlatforms();

    log('All platforms built successfully!');
  } catch (err) {
    error('An error occurred while running Style Dictionary:');
    error(err);
    process.exit(1);
  }
};

init();
