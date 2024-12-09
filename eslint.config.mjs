/* eslint-disable */

import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error", // Enforce Prettier rules
    },
  },
  {
    rules: {
      "no-console": "warn", // Warn on `console.log`
      "no-unused-vars": "warn", // Warn on unused variables
    },
  },
];
