import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Ignore patterns
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "eslint.config.mjs",
      "**/*.md", // Ignore all Markdown files
      "**/*.json", // Ignore all JSON files
      ".claude/settings.local.json", // Specific ignore
      "public/content-cache.json", // Specific ignore
    ],
  },
  // Base JS config - applies to all JS-like files by default
  js.configs.recommended,

  // Configuration for next.config.mjs
  {
    files: ["next.config.mjs"],
    languageOptions: {
      globals: {
        process: "readonly", // Define 'process' as a readonly global
      },
    },
  },

  // TypeScript specific configuration
  ...tseslint.configs.recommended, // Apply recommended TypeScript rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Custom TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "off", // Permanently disable
    },
  },

  // React specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Temporarily disable the rule if 'ignore' is not working as expected for styled-jsx
      "react/no-unknown-property": "off",
    },
  },

  // React Hooks specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...pluginReactHooks.configs.flat.recommended,
  },

  // JSX A11y specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      "jsx-a11y/no-noninteractive-element-interactions": "off", // Temporarily disable
      "jsx-a11y/click-events-have-key-events": "off", // Temporarily disable
      "jsx-a11y/no-noninteractive-tabindex": "off", // Temporarily disable
    },
  },

  // Next.js specific configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  // Prettier integration (applies to all relevant files)
  {
    files: ["**/*.{js,jsx,ts,tsx,json,md}"], // Common file types for Prettier
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Custom general (non-type-specific) React rules
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", "never"],
      "react/self-closing-comp": "error",
    },
  },
];
