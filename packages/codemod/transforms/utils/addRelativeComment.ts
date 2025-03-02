import {
  type ASTPath,
  type JSCodeshift,
  type VariableDeclarator,
} from "jscodeshift";

export interface AddRelativeCommentOptions {
  j: JSCodeshift;
  node: ASTPath<VariableDeclarator>;
  comment: string;
}
export function addRelativeComment(options: AddRelativeCommentOptions): void {
  const { j, node, comment } = options;

  j(node)
    .closest(j.VariableDeclaration)
    .forEach((decl) => {
      decl.node.comments ??= [];
      decl.node.comments.push(j.commentLine(" " + comment));
    });
}
