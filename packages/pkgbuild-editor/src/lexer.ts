import { createToken, Lexer } from 'chevrotain';

export const Groups = {
  Formatting: createToken({ name: 'Formatting', pattern: Lexer.NA }),
};

export const Tokens = {
  Comment: createToken({ name: 'Comment', pattern: /#.*/ }),
  Newline: createToken({
    name: 'Newline',
    pattern: /\n/,
    line_breaks: true,
    categories: [Groups.Formatting],
  }),
  Whitespace: createToken({
    name: 'Whitespace',
    pattern: /\s+/,
    categories: [Groups.Formatting],
  }),
  Variable: createToken({
    name: 'Variable',
    pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
  }),
  Comma: createToken({ name: 'Comma', pattern: /,/ }),
  Equals: createToken({ name: 'Equals', pattern: /=/ }),
  ParanLeft: createToken({ name: 'ParanLeft', pattern: /\(/ }),
  ParanRight: createToken({ name: 'ParanRight', pattern: /\)/ }),
  CurlyLeft: createToken({ name: 'CurlyLeft', pattern: /{/ }),
  CurlyRight: createToken({ name: 'CurlyRight', pattern: /}/ }),
  StringLiteral: createToken({ name: 'StringLiteral', pattern: /"\w+"/ }),
  NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+(\.\d+)?/ }),
};

export const AllTokens = Object.values(Tokens);

export const PkgbuildLexer = new Lexer(AllTokens);
