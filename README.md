# Simple Image Magnifier + React + TypeScript

This package allows your customers to zoom in on your product images with ease, giving them a closer look at the details that matter most. Whether it's the intricate stitching on a piece of clothing, the texture of a material, or the fine print on a label, Image Magnifier React makes it all visible with clarity and precision.

[![npm version](https://img.shields.io/npm/v/simple-image-magnifier.svg?style=flat)](https://www.npmjs.com/package/simple-image-magnifier "View this project on npm") [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![npm downloads](https://img.shields.io/npm/dm/simple-image-magnifier.svg?style=flat-square)](https://www.npmjs.com/package/simple-image-magnifier)

## Installation & Using

```bash
npm i simple-image-magnifier
```

**For ReactJS**

```js
import ReactImageMagnifier from 'simple-image-magnifier/react'
import imagePreview from './assets/image-preview.jpg'
import imageOriginal from './assets/image-original.jpg'

...
<ReactImageMagnifier
    srcPreview={imagePreview}
    srcOriginal={imageOriginal}
    width={400}
    height={600}
    className='max-w-xs bg-gray-200 rounded-lg md:max-w-none max-h-80 md:max-h-none'
    objectFit='contain'
/>
```

- `srcPreview` and `srcOriginal` is required fields
- `width` and `height` is optionally, by default `100%`
- `className` is optionally
- `objectFit` is optionally, by default ``cover`

**For HTML+JS**

```js
...
<body>
    <div class="container">
        <div class="product-wrapper">
            <img src="./image-preview-1.jpg" class="product-image-preview" alt='' />
            <img src="./image-original-1.jpg" class="product-image-original" alt='' />
        </div>
    </div>

    <script type="module">
        import ImageMagnifier from "./simple-image-magnifier.js"

        const refreshImage = ImageMagnifier(
            '.product-wrapper',
            '.product-image-preview',
            '.product-image-original'
        )
    </script>
</body>
...
```

- the first parameter is `sellector` as string or Element of the wrapper div for the images.
- the second parameter same as the first parameter but for the preview image.
- same but for the original image.
