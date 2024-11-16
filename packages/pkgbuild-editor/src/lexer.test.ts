import { PkgbuildLexer } from './lexer';

describe('lexer.ts', () => {
  it('should tokenize a comment', () => {
    const lexer = new PkgbuildLexer();
    const lexingResult = lexer.tokenize(`# Test comment`);
    console.log(lexingResult.tokens);
    expect(lexingResult.tokens[0].tokenType.name).toBe('Comment');
  });

  it('should tokenize multiple comments', () => {
    const lexer = new PkgbuildLexer();
    const lexingResult = lexer.tokenize(`# Test comment
# Another comment`);
    expect(lexingResult.tokens[0].tokenType.name).toBe('Comment');
    expect(lexingResult.tokens[1].tokenType.name).toBe('Newline');
    expect(lexingResult.tokens[2].tokenType.name).toBe('Comment');
  });

  it('should tokenize strings with alternating quotes', () => {
    const lexer = new PkgbuildLexer();
    const lexingResult = lexer.tokenize(`pkgdesc="Test"
arch='ohoh'`);
    expect(lexingResult.tokens.length).toBe(11);
  });

  it('should tokenize strings with quotes', () => {
    const lexer = new PkgbuildLexer();
    const lexingResult = lexer.tokenize(`# Test comment\ndummy = "value"`);
    expect(lexingResult.tokens.length).toBe(9);
  });
});
