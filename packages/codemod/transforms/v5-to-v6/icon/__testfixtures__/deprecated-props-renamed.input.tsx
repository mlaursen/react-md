import { type ReactElement } from "react";
import { FontIcon as SpecialIcon } from "@react-md/icon";
import FontIcon from "./FontIcon";

const CONSTANT_ICON = (
  <SpecialIcon forceSize forceFontSize>
    radio
  </SpecialIcon>
);

export function Example(): ReactElement {
  return (
    <>
      <FontIcon forceSize forceFontSize />
      <SpecialIcon forceSize forceFontSize>
        example
      </SpecialIcon>
      {CONSTANT_ICON}
    </>
  );
}
