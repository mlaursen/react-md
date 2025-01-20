import { type ReactElement } from "react";

import { ResizableLayoutExample } from "./ResizableLayoutExample.jsx";
import { type ExampleLayoutProps } from "./layouts.js";

export function FullHeightResizableLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  return <ResizableLayoutExample {...props} fullHeightNav="static" />;
}
