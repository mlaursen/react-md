import { type ReactElement } from "react";
import { FontIcon as SpecialIcon } from "@react-md/icon";
import FontIcon from "./FontIcon";

const CONSTANT_ICON = (
  <SpecialIcon>
    radio
  </SpecialIcon>
);

export function Example(): ReactElement {
  return (
    <>
      <FontIcon forceSize forceFontSize />
      <SpecialIcon>
        example
      </SpecialIcon>
      {CONSTANT_ICON}
    </>
  );
}
