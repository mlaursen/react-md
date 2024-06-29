import { type Collection, type JSCodeshift } from "jscodeshift";

export interface RenameIdentifierOptions {
  j: JSCodeshift;
  to: string;
  from: string;
  root: Collection<unknown>;
}

export function renameIdentifier(options: RenameIdentifierOptions): void {
  const { j, to, from, root } = options;

  root.find(j.Identifier, { name: from }).forEach((identifier) => {
    j(identifier).replaceWith(
      j.identifier.from({
        name: to,
        comments: identifier.node.comments || null,
      })
    );
  });
}
