import { CstParser } from 'chevrotain';
import { AllTokens, Tokens } from './lexer';

export class PkgbuildParser extends CstParser {
  constructor() {
    super(AllTokens);
    this.performSelfAnalysis();
  }

  // Entry rule
  public pkgbuild = this.RULE('pkgbuild', () => {
    this.MANY(() => {
      this.SUBRULE(this.assignment);
    });
  });

  // Rule for assignment expressions like pkgname="example"
  private assignment = this.RULE('assignment', () => {
    this.CONSUME(Tokens.Comment);
    this.CONSUME(Tokens.Newline);
    this.CONSUME(Tokens.Whitespace);
  });
}
