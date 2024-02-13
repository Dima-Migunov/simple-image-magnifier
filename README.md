# Simple Image Magnifier + React + TypeScript

This package allows your customers to zoom in on your product images with ease, giving them a closer look at the details that matter most. Whether it's the intricate stitching on a piece of clothing, the texture of a material, or the fine print on a label, Image Magnifier React makes it all visible with clarity and precision.

[![npm version](https://img.shields.io/npm/v/simple-image-magnifier.svg?style=flat)](https://www.npmjs.com/package/simple-image-magnifier "View this project on npm") [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![npm downloads](https://img.shields.io/npm/dm/simple-image-magnifier.svg?style=flat-square)](https://www.npmjs.com/package/simple-image-magnifier)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
<ReactImageMagnifier
    width={400}
    height={600}
    srcPreview={previews[imgActive]}
    srcOriginal={originals[imgActive]}
    className='max-w-xs bg-gray-200 rounded-lg md:max-w-none max-h-80 md:max-h-none'
/>
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
