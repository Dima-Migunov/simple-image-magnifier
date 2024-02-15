import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/simple-image-magnifier/',
    mode: 'production',
    build: {
        lib: {
            name: 'simple-image-magnifier',
            entry: [
                resolve(__dirname, 'src/react-image-magnifier.tsx'),
                resolve(__dirname, 'src/simple-image-magnifier.ts'),
            ],
            fileName: (format, name) => {
                return format === 'es' ? `${name}.js` : `${name}.${format}`
            },
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
    plugins: [react(), dts()],
})
