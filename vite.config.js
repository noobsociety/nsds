import react from '@vitejs/plugin-react';
import { cp, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const componentTypeBarrel = `export { Button, type ButtonProps } from './components/buttons/Button';
export { FeatureCard, type FeatureCardProps } from './components/cards/FeatureCard';
export { QuestCard, type QuestCardProps } from './components/cards/QuestCard';
export { HUDBar, type HUDBarProps } from './components/hud/HUDBar';
export { HUDDivider, type HUDDividerProps } from './components/hud/HUDDivider';
export { HUDLabel, type HUDLabelProps } from './components/hud/HUDLabel';
export {
  RPGIcon,
  HUDIcon,
  icons,
  type RPGIconElement,
  type RPGIconName,
  type RPGIconProps,
  type RPGIconRace,
  type RPGIconSize,
  type RPGIconWeapon,
} from './components/icons/RPGIcon';
export { SectionArrow, type SectionArrowProps } from './components/navigation/SectionArrow';
`;

const componentDtsFiles = [
  'components/buttons/Button.d.ts',
  'components/cards/FeatureCard.d.ts',
  'components/cards/QuestCard.d.ts',
  'components/hud/HUDBar.d.ts',
  'components/hud/HUDDivider.d.ts',
  'components/hud/HUDLabel.d.ts',
  'components/icons/RPGIcon.d.ts',
  'components/navigation/SectionArrow.d.ts',
];

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

      await mkdir(resolve(dist, 'tailwind'), { recursive: true });
      await cp(resolve(__dirname, 'tailwind/preset.js'), resolve(dist, 'tailwind/preset.js'));
      await writeFile(resolve(dist, 'tailwind/package.json'), '{ "type": "commonjs" }\n');

      for (const file of componentDtsFiles) {
        await mkdir(resolve(dist, dirname(file)), { recursive: true });
        await cp(resolve(__dirname, file), resolve(dist, file));
      }

      await writeFile(resolve(dist, 'index.d.ts'), componentTypeBarrel);
    },
  };
}

function fileName(format, entryName) {
  return format === 'es' ? `${entryName}.js` : `${entryName}.cjs`;
}

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
];

export default defineConfig({
  plugins: [react(), nsdsDistAssets()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'index.js'),
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
