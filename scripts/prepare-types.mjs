import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const tailwindDir = join(dist, 'tailwind');

await copyFile(join(dist, 'index.d.ts'), join(dist, 'index.d.cts'));
await mkdir(tailwindDir, { recursive: true });

await writeFile(
  join(tailwindDir, 'preset.d.ts'),
  [
    "import type { Config } from 'tailwindcss';",
    '',
    'declare const preset: Config;',
    'export = preset;',
    '',
  ].join('\n'),
);

await writeFile(
  join(tailwindDir, 'preset.d.cts'),
  [
    "import type { Config } from 'tailwindcss';",
    '',
    'declare const preset: Config;',
    'export = preset;',
    '',
  ].join('\n'),
);
