import { type ReactElement } from "react";
import { type ExampleLayoutProps } from "./layouts.js";
import { ExpandableLayoutExample } from "./ExpandableLayoutExample.jsx";

export function FullHeightLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  return <ExpandableLayoutExample {...props} fullHeightNav="static" />;
}
