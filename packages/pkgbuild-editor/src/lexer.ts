import { createToken, CustomPatternMatcherFunc, Lexer } from 'chevrotain';

const QUOTE_PATTERN = /['"]/;

const customEndStringPattern: CustomPatternMatcherFunc = (
  text,
  offset,
  tokens
) => {
  const quote = text[offset];
  if (!QUOTE_PATTERN.test(quote)) return null;

  const previousQuote = tokens.find(
    (t) => t.tokenType.PUSH_MODE === 'stringMode'
  );
  if (!previousQuote) return null;
  if (quote === previousQuote.image) return [quote];

  return null;
};

export const Tokens = {
  Whitespace: createToken({ name: 'Whitespace', pattern: /[ \t]+/ }),
  Newline: createToken({
    name: 'Newline',
    pattern: /\n/,
    line_breaks: true,
  }),
  Comma: createToken({ name: 'Comma', pattern: /,/ }),
  Equals: createToken({ name: 'Equals', pattern: /=/ }),
  ParanLeft: createToken({ name: 'ParanLeft', pattern: /\(/ }),
  ParanRight: createToken({ name: 'ParanRight', pattern: /\)/ }),
  CurlyLeft: createToken({ name: 'CurlyLeft', pattern: /{/ }),
  CurlyRight: createToken({ name: 'CurlyRight', pattern: /}/ }),
  Comment: createToken({ name: 'Comment', pattern: /#.*/ }),
  Identifier: createToken({
    name: 'Identifier',
    pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
  }),
  NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+(\.\d+)*/ }),
  StringLiteral: createToken({
    name: 'Text',
    pattern: /[^'"$]+/,
  }),
  Reference: createToken({
    name: 'Reference',
    pattern: /\${\w+}/,
  }),
  BeginStringLiteral: createToken({
    name: 'BeginStringLiteral',
    pattern: QUOTE_PATTERN,
    push_mode: 'stringMode',
  }),
  EndStringLiteral: createToken({
    name: 'EndString',
    pattern: customEndStringPattern,
    pop_mode: true,
    line_breaks: true,
  }),
};

export const AllTokens = Object.values(Tokens);
export class PkgbuildLexer extends Lexer {
  constructor() {
    super({
      defaultMode: 'defaultMode',
      modes: {
        defaultMode: [
          Tokens.Whitespace,
          Tokens.Newline,
          Tokens.Comma,
          Tokens.Equals,
          Tokens.ParanLeft,
          Tokens.ParanRight,
          Tokens.CurlyLeft,
          Tokens.CurlyRight,
          Tokens.Comment,
          Tokens.Identifier,
          Tokens.NumberLiteral,
          Tokens.StringLiteral,
          Tokens.Reference,
          Tokens.BeginStringLiteral,
        ],
        stringMode: [
          Tokens.StringLiteral,
          Tokens.Reference,
          Tokens.EndStringLiteral,
        ],
      },
    });
  }
}
