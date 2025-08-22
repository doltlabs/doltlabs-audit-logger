// @ts-check
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: ["dist/", "node_modules/"], // ignore build + deps
  },

  // Type-aware linting for source files
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json", // include src + tests
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "no-console": "warn",
    },
  },

  // Lightweight linting for tests (no type-checking needed)
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "off", // allow console in tests
    },
  },

  // Allow console in transports/console.ts
  {
    files: ["src/transports/console.ts"],
    rules: {
      "no-console": "off",
    },
  },
];
