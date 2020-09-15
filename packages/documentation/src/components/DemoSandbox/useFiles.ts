import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useMemo } from "react";
import { TreeData, TreeItemIds } from "@react-md/tree";

export type FileType =
  | "css"
  | "scss"
  | "ts"
  | "js"
  | "jsx"
  | "json"
  | "md"
  | "folder"
  | "html"
  | "txt";

export interface FileTreeData extends TreeItemIds {
  type: FileType;
  children: string;
  content?: string;
}

export type FileTree = TreeData<FileTreeData>;

/**
 * Every file tree will always have a public and src folder, so we can add these
 * here. All the files will reference these folders to add things like the
 * - `index.html`
 * - `Demo.tsx`
 * - `styles.scss`
 * - `_variables.scss`
 */
const BASE_TREE: FileTree = {
  public: {
    parentId: null,
    itemId: "public",
    children: "public",
    type: "folder",
  },
  src: {
    parentId: null,
    itemId: "src",
    children: "src",
    type: "folder",
  },
};

/**
 * This adds a parent folder for the provided file path if it does not exist
 * yet.
 *
 * This has a side-effect of modifying the provided `FileTree` instead of returning
 * a new tree.
 */
function addParentFolders(filePath: string, tree: FileTree): void {
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
        type: "folder",
      };
    }
  }
}

function getType(fileName: string): FileType {
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  switch (extension) {
    case "ts":
    case "js":
    case "jsx":
    case "md":
    case "txt":
    case "css":
    case "scss":
    case "html":
    case "json":
      return extension;
    case "tsx":
      return "ts";
    default:
      return "folder";
  }
}

/**
 * Takes in a generated sandbox file for a demo in the documentation site and converts
 * it into a TreeData the the `Tree` component can render.
 *
 * This is memoized to help with performance since otherwise the tree will need to be:
 *
 * - "flattened" or converted to an object
 * - parsed and converted into a nested list approach in the `Tree` component itself so it
 *   can be rendered
 * - filter the list based on expanded ids and determine what is currently visible
 */
export default function useFiles(sandbox: IFiles): TreeData<FileTreeData> {
  return useMemo(
    () =>
      Object.entries(sandbox).reduce<FileTree>(
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
            type: getType(fileName),
          };

          return tree;
        },
        { ...BASE_TREE }
      ),
    [sandbox]
  );
}
