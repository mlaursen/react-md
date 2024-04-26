import { ButtonUnstyled } from "@react-md/core/button/ButtonUnstyled";
import { typography } from "@react-md/core/typography/typographyStyles";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <ButtonUnstyled className={typography()}>Hello, world!</ButtonUnstyled>
  );
}
