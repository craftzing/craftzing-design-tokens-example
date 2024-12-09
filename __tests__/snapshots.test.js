import fs from 'fs';
import path from 'path';
import { expect, it, describe } from 'vitest';

const BUILD_PATH = './dist';

describe('Token Build Snapshot Tests', () => {
  it('should match the snapshot for CSS tokens', () => {
    const cssTokens = fs.readFileSync(
      path.join(BUILD_PATH, 'css/tokens.css'),
      'utf-8'
    );
    expect(cssTokens).toMatchSnapshot();
  });

  it('should match the snapshot for SCSS tokens', () => {
    const scssTokens = fs.readFileSync(
      path.join(BUILD_PATH, 'scss/tokens.scss'),
      'utf-8'
    );
    expect(scssTokens).toMatchSnapshot();
  });

  it('should match the snapshot for JS tokens', () => {
    const jsTokens = fs.readFileSync(
      path.join(BUILD_PATH, 'js/tokens.js'),
      'utf-8'
    );
    expect(jsTokens).toMatchSnapshot();
  });

  it('should match the snapshot for TS tokens', () => {
    const tsTokens = fs.readFileSync(
      path.join(BUILD_PATH, 'ts/tokens.d.ts'),
      'utf-8'
    );
    expect(tsTokens).toMatchSnapshot();
  });
});
