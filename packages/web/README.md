# Web

The _web_ application supporting [blah.davedennis.dev]. It is a _vite/react_ application running on _AWS S3_ and _AWS CloudFront_.

## Web Specific Learing / @todo

Items related specifically to the _web_ pacakgee that need `@todo`.

- [ ] Learn more about `postcss.config.js` file right now it just kind lives in all my projects and I know it's required to use tailwind but _why_ or _what_ this is _really doing_ i'pm just not sure.
- [ ] Add linting support command can search _turborepo_ exmaples and how they do it? Even though using bun should be similar. Also need to migrate from `.eslint.config.js -> .esling.config.ts`.

  ```typescript
  import js from "@eslint/js";
  import globals from "globals";
  import reactHooks from "eslint-plugin-react-hooks";
  import reactRefresh from "eslint-plugin-react-refresh";
  import tseslint from "typescript-eslint";

  export default tseslint.config(
    { ignores: ["dist"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  );
  ```
