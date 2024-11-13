import { generateCstDts } from 'chevrotain';
import { PkgbuildParser } from '../parser';

export const generateDts = () => {
  const parser = new PkgbuildParser();
  return generateCstDts(parser.getGAstProductions());
};
