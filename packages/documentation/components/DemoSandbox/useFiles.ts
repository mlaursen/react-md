import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useMemo } from "react";
import { FlattenedTree, useFlattenedTree } from "@react-md/tree";

export interface FileTreeData {
  children: string;
  content?: string;
}
export type FlattenedFileTree = FlattenedTree<FileTreeData>;

export default function useFiles(sandbox: IFiles) {
  const files = useMemo(
    () =>
      Object.entries(sandbox).reduce<FlattenedFileTree>(
        (tree, [filePath, { content }]) => {
          const parts = filePath.split("/");
          let parentId = null;
          let [fileName] = parts;
          if (parts.length > 1) {
            [parentId, fileName] = parts;
          }

          if (parentId && !tree[parentId]) {
            tree[parentId] = {
              parentId: null,
              itemId: parentId,
              children: parentId,
            };
          }

          tree[filePath] = {
            parentId,
            itemId: filePath,
            children: fileName,
            content,
          };

          return tree;
        },
        {}
      ),
    [sandbox]
  );

  return useFlattenedTree(files, null);
}
