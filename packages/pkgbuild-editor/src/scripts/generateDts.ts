import { generateCstDts } from 'chevrotain';
import { PkgbuildParser } from '../parser';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

export const generateDts = (path?: string) => {
  const parser = new PkgbuildParser();
  const dts = generateCstDts(parser.getGAstProductions());

  writeFileSync(
    fileURLToPath(new URL(path || '../parser.gen.d.ts', import.meta.url)),
    dts
  );
};

generateDts();
