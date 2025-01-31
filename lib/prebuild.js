// TODO: Totally replace this with a proper implementation
// Sorry for people having to see this code

import { promises as fs } from 'node:fs';

const { error, log } = console;

function transformFigmaData(data) {
  const flattenedOutput = {};

  function extractVariables(obj, collectionName = '') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === 'object' && !Array.isArray(value)) {
          if (value && value.modes) {
            // Handle Mode 1 for both primitives and components
            if (value.modes['Mode 1']) {
              extractVariables(value.modes['Mode 1'], key);
            }
          } else if (value && '$type' in value && '$value' in value) {
            // Transform float to dimension
            const transformedType =
              value.$type === 'float' ? 'dimension' : value.$type;

            flattenedOutput[key] = {
              ...value,
              $type: transformedType,
              ...(collectionName && { $collectionName: collectionName }),
            };
          } else {
            extractVariables(value, collectionName || key);
          }
        }
      }
    }
  }

  // Process both primitives and components
  extractVariables(data[0]);
  extractVariables(data[1]);

  return flattenedOutput;
}

function transformTokenStudioData(data) {
  const flattenedOutput = {};

  function flatten(obj, prefix = []) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newPrefix = [...prefix, key];

        // Skip metadata and themes
        if (key === '$metadata' || key === '$themes') {
          continue;
        }

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          if ('value' in value && 'type' in value) {
            const tokenName = key;

            // Handle token references in the value
            let tokenValue = value.value;
            if (typeof tokenValue === 'string' && tokenValue.includes('{')) {
              // Convert references like "{blue}" to just "{blue}" - no path needed anymore
              tokenValue = tokenValue.replace(/\{([^}]+)\}/g, (match, path) => {
                // If there's a path with dots, take the last part
                const parts = path.split('.');
                return `{${parts[parts.length - 1]}}`;
              });
            }

            flattenedOutput[tokenName] = {
              $value: tokenValue,
              $type: value.type,
            };
          } else {
            flatten(value, newPrefix);
          }
        }
      }
    }
  }

  flatten(data);
  return flattenedOutput;
}

async function processJSON(inputPath, outputPath, format) {
  const rawData = await fs.readFile(inputPath, 'utf-8');
  const data = JSON.parse(rawData);

  const transformedData =
    format === 'figma'
      ? transformFigmaData(data)
      : transformTokenStudioData(data);

  await fs.writeFile(
    outputPath,
    JSON.stringify(transformedData, null, 2),
    'utf-8'
  );

  log(`Flattened ${format} JSON written to ${outputPath}`);
}

// Process both file types
const processFiles = async () => {
  try {
    await processJSON(
      './figma-variables/export.json',
      './figma-variables/figma-flattened.json',
      'figma'
    );

    await processJSON(
      './token-studio/tokens.json',
      './token-studio/tokens-flattened.json',
      'token-studio'
    );

    log('✅ All files processed successfully');
  } catch (err) {
    error('❌ Error processing files:', err);
    process.exit(1);
  }
};

processFiles();
