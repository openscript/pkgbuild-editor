import { generateCst } from './generateCst';
import { flattenCst } from './flattenCst';

describe('flattenCst.ts', () => {
  it('should flatten Cst', () => {
    const { cst } = generateCst(`# Test comment
varible = "value"`);
    const flattened = flattenCst(cst);
    expect(flattened).toMatchSnapshot();
  });
});
