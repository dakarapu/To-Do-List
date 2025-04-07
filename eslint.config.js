import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.json' assert { type: 'json' };

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      'prettier/prettier': ['error', prettierConfig],
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/prefer-default-export': 'off',
      'func-names': 'off',
      'no-underscore-dangle': 'off',
    },
  },
];
