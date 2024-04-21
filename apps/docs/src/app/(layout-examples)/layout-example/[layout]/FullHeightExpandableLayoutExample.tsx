import { type ReactElement } from "react";
import { ExpandableLayoutExample } from "./ExpandableLayoutExample.js";
import { type ExampleLayoutProps } from "./layouts.js";

export function FullHeightExpandableLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  return <ExpandableLayoutExample {...props} fullHeightNav defaultExpanded />;
}
