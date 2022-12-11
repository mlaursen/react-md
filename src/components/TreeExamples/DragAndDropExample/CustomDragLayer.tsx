import { Tooltip } from "@react-md/tooltip";
import type { ReactElement } from "react";
import { useDragLayer } from "react-dnd";

import styles from "./CustomDragLayer.module.scss";
import { isFolder } from "./utils";

export function CustomDragLayer(): ReactElement | null {
  const { isDragging, item, clientOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !isFolder(item)) {
    return null;
  }

  const transform = `translate(${clientOffset?.x}px, ${clientOffset?.y}px)`;

  return (
    <Tooltip
      id="drag-layer"
      visible
      style={{
        WebkitTransform: transform,
        transform,
      }}
      className={styles.tooltip}
      disableLineWrap
    >
      Move {item.name}
    </Tooltip>
  );
}
