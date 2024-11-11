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
      this.OR([
        { ALT: () => this.SUBRULE(this.formatting) },
        { ALT: () => this.SUBRULE(this.assignment) },
      ]);
    });
  });

  private formatting = this.RULE('formatting', () => {
    this.OR([
      { ALT: () => this.CONSUME(Tokens.Comment) },
      { ALT: () => this.CONSUME(Tokens.Newline) },
      { ALT: () => this.CONSUME(Tokens.Whitespace) },
    ]);
  });

  private assignment = this.RULE('assignment', () => {
    this.CONSUME(Tokens.Variable);
    this.CONSUME(Tokens.Equals);
    this.OR([
      { ALT: () => this.CONSUME(Tokens.StringLiteral) },
      { ALT: () => this.CONSUME(Tokens.NumberLiteral) },
      { ALT: () => this.array() },
    ]);
  });

  private array = this.RULE('array', () => {
    this.CONSUME(Tokens.ParanLeft);
    this.MANY_SEP({
      SEP: Tokens.Comma,
      DEF: () => {
        this.SUBRULE(this.assignment);
      },
    });
    this.CONSUME(Tokens.ParanRight);
  });
}
