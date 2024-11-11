import { PkgbuildLexer } from './lexer';

describe('lexer.ts', () => {
  it('should tokenize a comment', () => {
    const lexingResult = PkgbuildLexer.tokenize(`# Test comment`);
    expect(lexingResult.tokens).toMatchSnapshot();
  });
  it('should tokenize multiple comments', () => {
    const lexingResult = PkgbuildLexer.tokenize(`# Test comment
# Another comment`);
    expect(lexingResult.tokens).toMatchSnapshot();
  });
});
