import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface PkgbuildCstNode extends CstNode {
  name: "pkgbuild";
  children: PkgbuildCstChildren;
}

export type PkgbuildCstChildren = {
  formatting?: FormattingCstNode[];
  comment?: CommentCstNode[];
  assignment?: AssignmentCstNode[];
};

export interface CommentCstNode extends CstNode {
  name: "comment";
  children: CommentCstChildren;
}

export type CommentCstChildren = {
  Comment: IToken[];
};

export interface FormattingCstNode extends CstNode {
  name: "formatting";
  children: FormattingCstChildren;
}

export type FormattingCstChildren = {
  Newline?: IToken[];
  Whitespace?: IToken[];
};

export interface AssignmentCstNode extends CstNode {
  name: "assignment";
  children: AssignmentCstChildren;
}

export type AssignmentCstChildren = {
  Variable: IToken[];
  Whitespace?: (IToken)[];
  Equals: IToken[];
  StringLiteral?: IToken[];
  NumberLiteral?: IToken[];
  array?: ArrayCstNode[];
};

export interface ArrayCstNode extends CstNode {
  name: "array";
  children: ArrayCstChildren;
}

export type ArrayCstChildren = {
  ParanLeft: IToken[];
  StringLiteral?: IToken[];
  NumberLiteral?: IToken[];
  Comma?: IToken[];
  ParanRight: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  pkgbuild(children: PkgbuildCstChildren, param?: IN): OUT;
  comment(children: CommentCstChildren, param?: IN): OUT;
  formatting(children: FormattingCstChildren, param?: IN): OUT;
  assignment(children: AssignmentCstChildren, param?: IN): OUT;
  array(children: ArrayCstChildren, param?: IN): OUT;
}
