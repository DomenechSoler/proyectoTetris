// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

// module.exports = {
//   parserOptions: {
//     ecmaVersion: 2020, // Define la versión de ECMAScript que usas
//     sourceType: "module" // Habilita `import` y `export`
//   }
// };

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
const config = {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    globals: globals.browser,
  },
  files: ["**/*.{js,mjs,cjs,jsx}"],
  rules: {
    ...pluginJs.configs.recommended.rules,
    ...pluginReact.configs.flat.recommended.rules,
  },
};

export default config;
