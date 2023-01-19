import { TooltipHoverModeProvider } from "@react-md/core";
import type { ReactElement } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CustomDragLayer } from "./CustomDragLayer";
import { FolderTree } from "./FolderTree";

export function DragAndDropExample(): ReactElement {
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <TooltipHoverModeProvider>
        <FolderTree />
      </TooltipHoverModeProvider>
    </DndProvider>
  );
}
