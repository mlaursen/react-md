import { SrOnly } from "@react-md/core";
import { type ReactElement } from "react";

export default function VisibleWhileFocusedExample(): ReactElement {
  return <SrOnly focusable>This should appear while focused!</SrOnly>;
}
