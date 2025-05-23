export interface Folder {
  name: string;
  itemId: string;
  parentId: string | null;
}

export const folders: Record<string, Folder> = {
  "folder-1": {
    name: "Folder 1",
    itemId: "folder-1",
    parentId: null,
  },
  "folder-2": {
    name: "Folder 2",
    itemId: "folder-2",
    parentId: null,
  },
  "folder-3": {
    name: "Folder 3",
    itemId: "folder-3",
    parentId: null,
  },
  "folder-2-1": {
    name: "Folder 2 Child 1",
    itemId: "folder-2-1",
    parentId: "folder-2",
  },
  "folder-2-2": {
    name: "Folder 2 Child 2",
    itemId: "folder-2-2",
    parentId: "folder-2",
  },
  "folder-2-3": {
    name: "Folder 2 Child 3",
    itemId: "folder-2-3",
    parentId: "folder-2",
  },
  "folder-2-2-1": {
    name: "Folder 2 Child 2 Child 1",
    itemId: "folder-2-2-1",
    parentId: "folder-2-2",
  },
  "folder-2-2-1-1": {
    name: "Folder 2 Child 2 Child 1 Child 1",
    itemId: "folder-2-2-1-1",
    parentId: "folder-2-2-1",
  },
};
