import { CstParser, IToken, ParserMethod } from 'chevrotain';
import { AllTokens, Tokens } from './lexer';
import { PkgbuildCstNode } from './parser.gen';

export class PkgbuildParser extends CstParser {
  constructor(input?: IToken[]) {
    super(AllTokens);
    this.performSelfAnalysis();

    if (input) this.input = input;
  }

  public pkgbuild = this.RULE('pkgbuild', () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.formatting) },
        { ALT: () => this.SUBRULE(this.comment) },
        { ALT: () => this.SUBRULE(this.assignment) },
      ]);
    });
  }) as ParserMethod<[], PkgbuildCstNode>;

  private comment = this.RULE('comment', () => {
    this.CONSUME(Tokens.Comment);
  });

  private formatting = this.RULE('formatting', () => {
    this.OR([
      { ALT: () => this.CONSUME(Tokens.Newline) },
      { ALT: () => this.CONSUME(Tokens.Whitespace) },
    ]);
  });

  private assignment = this.RULE('assignment', () => {
    this.CONSUME(Tokens.Identifier);
    this.OPTION(() => this.CONSUME(Tokens.Whitespace));
    this.CONSUME(Tokens.Equals);
    this.OPTION2(() => this.CONSUME2(Tokens.Whitespace));
    this.OR([
      { ALT: () => this.SUBRULE(this.string) },
      { ALT: () => this.CONSUME(Tokens.NumberLiteral) },
      { ALT: () => this.SUBRULE(this.array) },
    ]);
  });

  private array = this.RULE('array', () => {
    this.CONSUME(Tokens.ParanLeft);
    this.MANY_SEP({
      SEP: Tokens.Comma,
      DEF: () => {
        this.OR([
          { ALT: () => this.SUBRULE(this.string) },
          { ALT: () => this.CONSUME(Tokens.NumberLiteral) },
        ]);
      },
    });
    this.CONSUME(Tokens.ParanRight);
  });

  private string = this.RULE('string', () => {
    this.CONSUME(Tokens.BeginStringLiteral);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Tokens.StringLiteral) },
        { ALT: () => this.CONSUME(Tokens.Reference) },
      ]);
    });
    this.CONSUME2(Tokens.EndStringLiteral);
  });
}
