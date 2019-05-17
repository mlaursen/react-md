import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useState, useEffect } from "react";
import { FlattenedFileTree } from "./useFileTreeBuilder";
import { FlattenedTree } from "@react-md/tree";

export interface FileTreeData {
  children: string;
  content?: string;
}

export type FlattenedFileTree = FlattenedTree<FileTreeData>;

export default function useFiles(
  visible: boolean,
  getFiles: () => Promise<IFiles>
): FlattenedFileTree {
  const [files, setFiles] = useState<FlattenedFileTree>({});
  useEffect(() => {
    if (!visible) {
      return;
    }

    let cancelled = false;
    (async function load() {
      const files = await getFiles();
      if (cancelled) {
        return;
      }

      const fileTree = Object.entries(files).reduce<FlattenedFileTree>(
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
      );
      setFiles(fileTree);
    })();

    return () => {
      cancelled = true;
    };
  }, [visible]);

  return files;
}
