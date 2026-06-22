import { execFile as execFileCallback } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFile = promisify(execFileCallback);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tempRoot = await mkdtemp(join(tmpdir(), 'nsds-install-'));
let tarball;

async function run(command, args, options = {}) {
  try {
    return await execFile(command, args, {
      cwd: tempRoot,
      maxBuffer: 1024 * 1024 * 8,
      ...options,
    });
  } catch (error) {
    const stdout = error.stdout ? `\n${error.stdout}` : '';
    const stderr = error.stderr ? `\n${error.stderr}` : '';
    throw new Error(`${command} ${args.join(' ')} failed.${stdout}${stderr}`, { cause: error });
  }
}

try {
  const { stdout } = await execFile('npm', ['pack', '--json'], { cwd: root });
  const [packResult] = JSON.parse(stdout);
  tarball = join(root, packResult.filename);

  await writeFile(
    join(tempRoot, 'package.json'),
    JSON.stringify({ name: 'nsds-install-check', private: true, type: 'module' }, null, 2),
  );

  await run('npm', [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--package-lock=false',
    tarball,
    'react@19',
    'react-dom@19',
  ]);

  await writeFile(
    join(tempRoot, 'esm.mjs'),
    [
      "import assert from 'node:assert/strict';",
      "import { Button } from '@noobsociety/nsds';",
      "import { nsClientRelease, rpgIconNames } from '@noobsociety/nsds/client';",
      "import * as ReactEntry from '@noobsociety/nsds/react';",
      "import preset from '@noobsociety/nsds/tailwind';",
      '',
      "assert.equal(typeof Button, 'function');",
      "assert.equal(nsClientRelease, '21.06');",
      "assert.ok(rpgIconNames.includes('sword'));",
      "assert.equal(typeof ReactEntry.Button, 'function');",
      "assert.equal(typeof preset, 'object');",
      '',
    ].join('\n'),
  );

  await writeFile(
    join(tempRoot, 'cjs.cjs'),
    [
      "const assert = require('node:assert/strict');",
      "const rootEntry = require('@noobsociety/nsds');",
      "const clientEntry = require('@noobsociety/nsds/client');",
      "const reactEntry = require('@noobsociety/nsds/react');",
      "const preset = require('@noobsociety/nsds/tailwind');",
      '',
      "assert.equal(typeof rootEntry.Button, 'function');",
      "assert.equal(clientEntry.nsClientRelease, '21.06');",
      "assert.ok(clientEntry.rpgIconNames.includes('void'));",
      "assert.equal(typeof reactEntry.Button, 'function');",
      "assert.equal(typeof preset, 'object');",
      '',
    ].join('\n'),
  );

  await writeFile(
    join(tempRoot, 'types.ts'),
    [
      "import type { ButtonProps, RPGIconName } from '@noobsociety/nsds';",
      "import type { NSClientTarget } from '@noobsociety/nsds/client';",
      "import { Button, RPGIcon } from '@noobsociety/nsds';",
      "import { nsClientTargets } from '@noobsociety/nsds/client';",
      "import preset from '@noobsociety/nsds/tailwind';",
      '',
      "const buttonProps: ButtonProps = { children: 'Play', variant: 'play' };",
      "const iconName: RPGIconName = 'sword';",
      'const target: NSClientTarget = nsClientTargets[0];',
      '',
      'Button(buttonProps);',
      'RPGIcon({ name: iconName });',
      'void target;',
      'void preset.theme;',
      '',
    ].join('\n'),
  );

  await writeFile(
    join(tempRoot, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          jsx: 'react-jsx',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          noEmit: true,
          skipLibCheck: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['types.ts'],
      },
      null,
      2,
    ),
  );

  await run('node', ['esm.mjs']);
  await run('node', ['cjs.cjs']);
  await run('node', [join(root, 'node_modules/typescript/bin/tsc'), '-p', 'tsconfig.json']);

  console.log('Packed package install check passed.');
} finally {
  await rm(tempRoot, { recursive: true, force: true });
  if (tarball) {
    await rm(tarball, { force: true });
  }
}
