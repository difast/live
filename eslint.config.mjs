import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

/** next-env.d.ts генерируется Next.js и не входит в исходный код. */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
];

export default config;
