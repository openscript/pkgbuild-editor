import { argv } from 'process';
import { generateDts } from '../actions/generateDts';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const dts = generateDts();
const url = new URL(argv[2] || '../parser.gen.d.ts', import.meta.url);

writeFileSync(fileURLToPath(url), dts);
console.log(`Saved DTS file at ${url}`);
