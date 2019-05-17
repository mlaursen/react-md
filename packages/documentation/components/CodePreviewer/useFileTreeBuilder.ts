import { useMemo } from "react";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { FlattenedTree, useFlattenedTree } from "@react-md/tree";

export interface FileTreeData {
  children: string;
  content?: string;
}

export type FlattenedFileTree = FlattenedTree<FileTreeData>;

export default function useFileTreeBuilder(files: IFiles) {
  const flattened = useMemo(
    () =>
      Object.entries(files).reduce<FlattenedFileTree>(
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
    [files]
  );

  return useFlattenedTree(flattened, null);
}
