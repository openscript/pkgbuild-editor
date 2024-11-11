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
};

export const AllTokens = Object.values(Tokens);

export const PkgbuildLexer = new Lexer(AllTokens);
