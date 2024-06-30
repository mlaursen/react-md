import { type Collection, type JSCodeshift } from "jscodeshift";

export interface AddFileCommentOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  comment: string;
}

export function addFileComment(options: AddFileCommentOptions): void {
  const { j, root, comment } = options;
  const rootNode = root.get().node;
  rootNode.comments ||= [];
  rootNode.comments.unshift(j.commentLine(` ${comment}`));
}

export interface AddFileCommentsOptions {
  j: JSCodeshift;
  root: Collection<unknown>;
  comments: ReadonlySet<string>;
}

export function addFileComments(options: AddFileCommentsOptions): void {
  const { j, root, comments } = options;

  comments.forEach((comment) => {
    addFileComment({
      j,
      root,
      comment,
    });
  });
}
