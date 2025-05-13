import postcss, { type ChildNode, type Comment } from "postcss";

export function createTodoComment(text: string): Comment {
  const comment = postcss.comment({
    text: `TODO: ${text}`,
    raws: { inline: true },
  });
  // there would be an trailing space otherwise which makes test fail
  comment.raws.right = "";

  return comment;
}

export function addTodo(node: ChildNode, text: string): void {
  node.before(createTodoComment(text));
}
