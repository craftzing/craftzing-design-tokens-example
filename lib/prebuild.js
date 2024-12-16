import { promises as fs } from 'node:fs';

const { error, log } = console;

/**
 * @typedef {Object<string, any>} GenericObject
 */

/**
 * @param {GenericObject} data
 * @returns {GenericObject}
 */
function transformFigmaData(data) {
  const flattenedOutput = {};

  /**
   * @param {GenericObject} obj
   * @param {string} [collectionName]
   */
  function extractVariables(obj, collectionName = '') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === 'object' && !Array.isArray(value)) {
          if (value && value.modes) {
            for (const modeKey in value.modes) {
              extractVariables(value.modes[modeKey], collectionName || key);
            }
          } else if (value && '$type' in value && '$value' in value) {
            // @ts-expect-error
            flattenedOutput[key] = {
              ...value,
              ...(collectionName && { $collectionName: collectionName }),
            };
          } else {
            extractVariables(value, collectionName || key);
          }
        }
      }
    }
  }

  extractVariables(data);
  return flattenedOutput;
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @returns {Promise<void>}
 */
async function processFigmaJSON(inputPath, outputPath) {
  const rawData = await fs.readFile(inputPath, 'utf-8');
  const figmaData = JSON.parse(rawData);

  const transformedData = transformFigmaData(figmaData);
  await fs.writeFile(
    outputPath,
    JSON.stringify(transformedData, null, 2),
    'utf-8'
  );

  log(`Flattened JSON written to ${outputPath}`);
}

const inputFilePath = './figma-variables/export.json';
const outputFilePath = './figma-variables/figma-flattened.json';

processFigmaJSON(inputFilePath, outputFilePath).catch((err) => {
  error('Error processing Figma JSON:', err);
});
