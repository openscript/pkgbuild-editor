import { IToken } from 'chevrotain';

export function renderTokens(tokens: IToken[]) {
  return tokens
    .sort((a, b) => a.startOffset - b.startOffset)
    .reduce((acc, token) => {
      if (token.image) {
        acc += token.image;
      }

      return acc;
    }, '');
}
