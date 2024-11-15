import { ILexingError, IRecognitionException } from 'chevrotain';
import { PkgbuildLexer } from '../lexer';
import { PkgbuildParser } from '../parser';
import { PkgbuildCstNode } from '../parser.gen';

type CstReturn = {
  cst: PkgbuildCstNode | undefined;
  lexerErrors: ILexingError[];
  parserErrors: IRecognitionException[];
};

export const generateCst = (input: string): CstReturn => {
  const lexer = new PkgbuildLexer();
  const lexerResults = lexer.tokenize(input);
  const parser = new PkgbuildParser(lexerResults.tokens);
  const cst = parser.pkgbuild();
  return {
    cst,
    lexerErrors: lexerResults.errors,
    parserErrors: parser.errors,
  };
};
