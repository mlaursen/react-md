import { type ReactElement } from "react";
import { type ExampleLayoutProps } from "./layouts.js";
import { ExpandableLayoutExample } from "./ExpandableLayoutExample.js";

export function FullHeightExpandableLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  return <ExpandableLayoutExample {...props} fullHeightNav defaultExpanded />;
}
