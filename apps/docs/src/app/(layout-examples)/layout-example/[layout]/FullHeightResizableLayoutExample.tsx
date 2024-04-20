import { type ReactElement } from "react";
import { type ExampleLayoutProps } from "./layouts.js";
import { ResizableLayoutExample } from "./ResizableLayoutExample.jsx";

export function FullHeightResizableLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  return <ResizableLayoutExample {...props} fullHeightNav="static" />;
}
