import { CstElement, CstNode, IToken } from 'chevrotain';

export function flattenCst(cstNode: CstNode): IToken[] {
  const nodes: IToken[] = [];

  function collectNodes(node: CstElement): void {
    if ('children' in node) {
      for (const key in node.children) {
        for (const child of node.children[key]) {
          collectNodes(child);
        }
      }
    } else {
      nodes.push(node);
    }
  }

  collectNodes(cstNode);
  return nodes;
}
