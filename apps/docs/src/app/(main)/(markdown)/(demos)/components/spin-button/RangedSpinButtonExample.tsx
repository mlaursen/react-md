import { SpinButton } from "@react-md/core/spinbutton/SpinButton";
import { type ReactElement } from "react";

export default function RangedSpinButtonExample(): ReactElement {
  return <SpinButton aria-label="Range Example" min={0} max={10} />;
}
