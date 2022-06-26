import type { LabelRequiredForA11y } from "@react-md/core";
import { KeyboardMovementProvider } from "@react-md/core";
import type { ReactElement } from "react";
import { TreeRenderer } from "./TreeRenderer";
import type { TreeRendererProps } from "./types";

export type TreeProps = LabelRequiredForA11y<TreeRendererProps>;

export function Tree(props: TreeProps): ReactElement {
  return (
    <KeyboardMovementProvider loopable searchable>
      <TreeRenderer {...props} />
    </KeyboardMovementProvider>
  );
}
