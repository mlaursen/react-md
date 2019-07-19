import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useMemo } from "react";
import {
  FlattenedTree,
  useFlattenedTree,
  FlattenedTreeData,
} from "@react-md/tree";

export interface FileTreeData {
  children: string;
  content?: string;
}
export type FlattenedFileTree = FlattenedTree<FileTreeData>;

const BASE_TREE: FlattenedFileTree = {
  public: {
    parentId: null,
    itemId: "public",
    children: "public",
  },
  src: {
    parentId: null,
    itemId: "src",
    children: "src",
  },
};

function addParentFolders(filePath: string, tree: FlattenedFileTree): void {
  let i = 0;
  let currentPath = filePath;
  // eslint-disable-next-line no-cond-assign
  while ((i = currentPath.lastIndexOf("/")) !== -1) {
    currentPath = filePath.substring(0, i);
    const nextI = currentPath.lastIndexOf("/");
    const parentId = nextI > -1 ? currentPath.substring(0, nextI) : null;
    if (!tree[currentPath]) {
      tree[currentPath] = {
        parentId,
        itemId: currentPath,
        children: parentId
          ? currentPath.replace(`${parentId}/`, "")
          : currentPath,
      };
    }
  }
}

export default function useFiles(
  sandbox: IFiles
): FlattenedTreeData<FileTreeData>[] {
  const files = useMemo(
    () =>
      Object.entries(sandbox).reduce<FlattenedFileTree>(
        (tree, [filePath, { content }]) => {
          addParentFolders(filePath, tree);
          const i = filePath.lastIndexOf("/");
          let fileName = filePath;
          let parentId = null;
          if (i !== -1) {
            fileName = filePath.substring(i + 1);
            parentId = filePath.substring(0, i);
          }

          tree[filePath] = {
            itemId: filePath,
            parentId,
            children: fileName,
            content,
          };

          return tree;
        },
        { ...BASE_TREE }
      ),
    [sandbox]
  );

  return useFlattenedTree(files, null);
}
