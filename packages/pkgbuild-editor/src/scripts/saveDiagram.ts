import { argv } from 'process';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { generateDiagram } from '../actions/generateDiagram';
import { mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const diagram = generateDiagram();
const url = new URL(argv[2] || '../../dist/diagram.html', import.meta.url);
const distDir = dirname(fileURLToPath(url));
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}
writeFileSync(fileURLToPath(url), diagram);
console.log(`Saved diagram at ${url}`);
