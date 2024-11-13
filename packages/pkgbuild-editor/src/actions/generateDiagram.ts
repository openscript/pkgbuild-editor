import { createSyntaxDiagramsCode } from 'chevrotain';
import { PkgbuildParser } from '../parser';

export function generateDiagram() {
  const parser = new PkgbuildParser();
  return createSyntaxDiagramsCode(parser.getSerializedGastProductions());
}
