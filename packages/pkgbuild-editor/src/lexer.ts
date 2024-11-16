import { createToken, CustomPatternMatcherFunc, Lexer } from 'chevrotain';

const QUOTE_PATTERN = /['"]/;

const endStringPattern: CustomPatternMatcherFunc = (text, offset, tokens) => {
  const quote = text[offset];
  if (!QUOTE_PATTERN.test(quote)) return null;

  let previousQuote = null;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.tokenType.PUSH_MODE === 'stringMode') {
      previousQuote = token;
      break;
    }
  }

  if (!previousQuote) return null;
  if (quote === previousQuote.image) return [quote];

  return null;
};

export const Tokens = {
  Whitespace: createToken({ name: 'Whitespace', pattern: /[ \t]+/ }),
  Newline: createToken({ name: 'Newline', pattern: /\n/, line_breaks: true }),
  Comma: createToken({ name: 'Comma', pattern: /,/ }),
  Equals: createToken({ name: 'Equals', pattern: /=/ }),
  Negation: createToken({ name: 'Negation', pattern: /!/ }),
  ParanLeft: createToken({ name: 'ParanLeft', pattern: /\(/ }),
  ParanRight: createToken({ name: 'ParanRight', pattern: /\)/ }),
  CurlyLeft: createToken({ name: 'CurlyLeft', pattern: /{/ }),
  CurlyRight: createToken({ name: 'CurlyRight', pattern: /}/ }),
  Comment: createToken({ name: 'Comment', pattern: /#.*/ }),
  Path: createToken({
    name: 'Path',
    pattern: /(?:\.{1,2}\/|\/|\.{2})(?:[a-zA-Z0-9_\-/.]+\/)?/,
    line_breaks: false,
  }),
  Identifier: createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ }),
  NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+(\.\d+)*/ }),
  StringLiteral: createToken({ name: 'Text', pattern: /[^'"$]+/ }),
  Arguments: createToken({ name: 'Arguments', pattern: /[^\\\n]+(?:\\\n[^\\\n]+)*/, line_breaks: true }),
  Reference: createToken({ name: 'Reference', pattern: /\${\w+}/ }),
  BeginStringLiteral: createToken({ name: 'BeginStringLiteral', pattern: QUOTE_PATTERN, push_mode: 'stringMode' }),
  EndStringLiteral: createToken({ name: 'EndString', pattern: endStringPattern, pop_mode: true, line_breaks: true }),
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
          Tokens.Negation,
          Tokens.ParanLeft,
          Tokens.ParanRight,
          Tokens.CurlyLeft,
          Tokens.CurlyRight,
          Tokens.Comment,
          Tokens.Path,
          Tokens.Identifier,
          Tokens.NumberLiteral,
          Tokens.BeginStringLiteral,
          Tokens.Arguments,
        ],
        stringMode: [Tokens.StringLiteral, Tokens.Reference, Tokens.EndStringLiteral],
      },
    });
  }
}
