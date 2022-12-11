import { useTreeContext } from "@react-md/tree";
import type { ReactNode } from "react";
import { useEffect } from "react";
import type { ConnectDragSource, ConnectDropTarget } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import type { Folder } from "src/constants/folders";

import { useFolderSetter } from "./useFolderSetter";
import { isFolder, isValidFolderPath } from "./utils";

interface FolderDndResult {
  drag: ConnectDragSource;
  drop: ConnectDropTarget;
  expanded: boolean;
  droppable: boolean;
  isDisabled: boolean;
  isDragging: boolean;
}

export function useFolderDnd(
  item: Folder & { childItems: ReactNode | undefined }
): FolderDndResult {
  const { itemId, childItems } = item;
  const { data, expandedIds, toggleTreeItemExpansion } =
    useTreeContext<Folder>();
  const setFolders = useFolderSetter();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "FOLDER",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [{ canDrop, isOver, isDisabled }, drop] = useDrop(() => ({
    accept: "FOLDER",
    collect: (monitor) => {
      const draggingItem = monitor.getItem();
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isDisabled:
          !!draggingItem &&
          !isValidFolderPath({
            data,
            draggingItem,
            currentItemId: itemId,
          }),
      };
    },
    canDrop: (item, _monitor) =>
      isValidFolderPath({
        data,
        draggingItem: item,
        currentItemId: itemId,
      }),
    drop(item, _monitor) {
      if (!isFolder(item)) {
        return;
      }

      setFolders((prevData) => ({
        ...prevData,
        [item.itemId]: {
          ...item,
          parentId: itemId,
        },
      }));
    },
  }));
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // allow the tree item to exapnd on hovering for about 2 seconds while dragging
  const expanded = expandedIds.has(itemId);
  const expandable = !!childItems && !expanded;
  useEffect(() => {
    if (!isOver || !expandable) {
      return;
    }

    const timeout = window.setTimeout(() => {
      toggleTreeItemExpansion(itemId);
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [expandable, isOver, itemId, toggleTreeItemExpansion]);

  return {
    drag,
    drop,
    expanded,
    droppable: isOver && canDrop,
    isDisabled,
    isDragging,
  };
}
