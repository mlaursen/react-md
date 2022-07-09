import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type {
  DefaultTreeItemNode,
  ReadonlyTreeData,
  TreeExpansion,
  TreeExpansionMode,
  TreeItemNode,
  TreeSelection,
} from "./types";

export interface TreeContext<T extends TreeItemNode = DefaultTreeItemNode>
  extends Omit<TreeExpansion, "expandedIds">,
    Required<Omit<TreeSelection, "selectedIds">> {
  data: ReadonlyTreeData<T>;
  rootId: string | null;
  expanderLeft: boolean;
  expanderIcon: ReactNode;
  expansionMode: TreeExpansionMode;
  disableTransition: boolean;
}

const context = createContext<TreeContext | undefined>(undefined);
const { Provider } = context;
if (process.env.NODE_ENV !== "production") {
  context.displayName = "Tree";
}

export function useTreeContext<
  T extends TreeItemNode = DefaultTreeItemNode
>(): Readonly<TreeContext<T>> {
  const value = useContext(context);
  if (!value) {
    throw new Error("Cannot find a parent Tree component");
  }

  // I don't really think this will be used publicly, so just type cast it.
  // users can always provide their correct type
  return value as Readonly<TreeContext<T>>;
}

export interface TreeProviderProps<T extends TreeItemNode = DefaultTreeItemNode>
  extends TreeContext<T> {
  children: ReactNode;
}

export function TreeProvider<T extends TreeItemNode = DefaultTreeItemNode>(
  props: TreeProviderProps<T>
): ReactElement {
  const {
    children,
    data,
    rootId,
    multiSelect,
    expanderIcon,
    expanderLeft,
    expansionMode,
    onItemExpansion,
    onItemSelection,
    disableTransition,
    onMultiItemExpansion,
    onMultiItemSelection,
  } = props;
  const value = useMemo<TreeContext<T>>(
    () => ({
      data,
      rootId,
      multiSelect,
      expanderIcon,
      expanderLeft,
      expansionMode,
      onItemExpansion,
      onItemSelection,
      onMultiItemExpansion,
      onMultiItemSelection,
      disableTransition,
    }),
    [
      data,
      rootId,
      multiSelect,
      expanderIcon,
      expanderLeft,
      expansionMode,
      onItemExpansion,
      onItemSelection,
      onMultiItemExpansion,
      onMultiItemSelection,
      disableTransition,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}
