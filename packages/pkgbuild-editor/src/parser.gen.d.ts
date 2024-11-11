import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface PkgbuildCstNode extends CstNode {
  name: "pkgbuild";
  children: PkgbuildCstChildren;
}

export type PkgbuildCstChildren = {
  formatting?: FormattingCstNode[];
  assignment?: AssignmentCstNode[];
};

export interface FormattingCstNode extends CstNode {
  name: "formatting";
  children: FormattingCstChildren;
}

export type FormattingCstChildren = {
  Comment?: IToken[];
  Newline?: IToken[];
  Whitespace?: IToken[];
};

export interface AssignmentCstNode extends CstNode {
  name: "assignment";
  children: AssignmentCstChildren;
}

export type AssignmentCstChildren = {
  Variable: IToken[];
  Equals: IToken[];
  StringLiteral?: IToken[];
  NumberLiteral?: IToken[];
  ParanLeft?: IToken[];
  assignment?: AssignmentCstNode[];
  Comma?: IToken[];
  ParanRight?: IToken[];
};

export interface ArrayCstNode extends CstNode {
  name: "array";
  children: ArrayCstChildren;
}

export type ArrayCstChildren = {
  ParanLeft: IToken[];
  assignment?: AssignmentCstNode[];
  Comma?: IToken[];
  ParanRight: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  pkgbuild(children: PkgbuildCstChildren, param?: IN): OUT;
  formatting(children: FormattingCstChildren, param?: IN): OUT;
  assignment(children: AssignmentCstChildren, param?: IN): OUT;
  array(children: ArrayCstChildren, param?: IN): OUT;
}
