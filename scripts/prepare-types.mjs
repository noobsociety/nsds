import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

await copyFile(join(dist, 'index.d.ts'), join(dist, 'index.d.cts'));

await mkdir(join(dist, 'client'), { recursive: true });
await copyFile(join(dist, 'client/index.d.ts'), join(dist, 'client/index.d.cts'));
