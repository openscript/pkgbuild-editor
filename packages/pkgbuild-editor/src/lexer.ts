import { createToken, Lexer } from 'chevrotain';

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
  Variable: createToken({
    name: 'Variable',
    pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
  }),
  NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+(\.\d+)*/ }),
  Text: createToken({
    name: 'Text',
    pattern: /[^"$]+/,
  }),
  Reference: createToken({
    name: 'Reference',
    pattern: /\${\w+}/,
  }),
  BeginString: createToken({
    name: 'BeginString',
    pattern: /"/,
    push_mode: 'stringMode',
  }),
  EndString: createToken({
    name: 'EndString',
    pattern: /"/,
    pop_mode: true,
  }),
};

export const AllTokens = Object.values(Tokens);
export const PkgbuildLexer = new Lexer({
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
      Tokens.Variable,
      Tokens.NumberLiteral,
      Tokens.Text,
      Tokens.Reference,
      Tokens.BeginString,
    ],
    stringMode: [Tokens.Text, Tokens.Reference, Tokens.EndString],
  },
});
