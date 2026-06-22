import react from '@vitejs/plugin-react';
import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

function nsdsDistAssets() {
  return {
    name: 'nsds-dist-assets',
    async writeBundle() {
      const dist = resolve(__dirname, 'dist');

      await mkdir(resolve(dist, 'tokens'), { recursive: true });
      await cp(resolve(__dirname, 'tokens'), resolve(dist, 'tokens'), { recursive: true });

      await mkdir(resolve(dist, 'components'), { recursive: true });
      await cp(
        resolve(__dirname, 'components/primitives.css'),
        resolve(dist, 'components/primitives.css'),
      );

      await cp(resolve(__dirname, 'styles.css'), resolve(dist, 'styles.css'));
    },
  };
}

function fileName(format, entryName) {
  return format === 'es' ? `${entryName}.js` : `${entryName}.cjs`;
}

const external = ['react', 'react-dom', 'react/jsx-runtime'];

export default defineConfig({
  plugins: [react(), nsdsDistAssets()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'index.ts'),
        'client/index': resolve(__dirname, 'client/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName,
    },
    rollupOptions: {
      external,
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'JSXRuntime',
        },
      },
    },
    copyPublicDir: false,
  },
});
