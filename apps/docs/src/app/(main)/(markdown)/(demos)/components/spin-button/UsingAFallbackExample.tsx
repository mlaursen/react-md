import { SpinButton } from "@react-md/core/spinbutton/SpinButton";
import { type ReactElement } from "react";

export default function UsingAFallbackExample(): ReactElement {
  return (
    <>
      <SpinButton aria-label="Fallback Example" min={1} />
      <SpinButton
        aria-label="Fallback Example"
        min={1}
        max={12}
        minDigits={2}
      />
      <SpinButton
        aria-label="Custom Fallback Example"
        fallback="HH"
        min={1}
        max={12}
      />
    </>
  );
}
