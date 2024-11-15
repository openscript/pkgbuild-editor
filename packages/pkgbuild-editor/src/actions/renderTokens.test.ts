import { generateCst } from './generateCst';
import { flattenCst } from './flattenCst';
import { renderTokens } from './renderTokens';

const variations = [
  `# Test comment`,
  `# Test comment\ndummy = "value"`,
  `dummy="value"`,
  `dummy = "value"\n#Test comment`,
  `\n\ndummy = "value"\n#Test comment`,
  `dummy = 123`,
  `dummy = 1.2.3`,
  `noextract=("\${_appimage}")`,
  `multiple=("hello uhu uhuh \${_appimage} asdasdasd \${asdasdas}")`,
  `license=('custom:Unlicense')`,
  `prepare() {
    chmod +x "\${_appimage}"
    ./"\${_appimage}" --appimage-extract
}`,
];

describe('renderTokens.ts', () => {
  it('should render tokens', () => {
    variations.forEach((input) => {
      const { cst, lexerErrors, parserErrors } = generateCst(input);
      lexerErrors.forEach((error) => console.error(error));
      parserErrors.forEach((error) => console.error(error));
      if (!cst) throw new Error('CST is undefined');
      const flattened = flattenCst(cst);
      const result = renderTokens(flattened);

      expect(result).toMatch(input);
    });
  });
});
