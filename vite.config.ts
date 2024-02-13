import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/react-image-magnifier.tsx'),
                resolve(__dirname, 'src/simple-image-magnifier.ts'),
            ],
            name: 'simple-image-magnifier',
            fileName: (format, name) => {
                return format === 'es' ? `${name}.js` : `${name}.${format}`
            },
        },
    },
    plugins: [react(), dts()],
})
