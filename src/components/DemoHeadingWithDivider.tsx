import type { TypographyProps } from "@react-md/core";
import { Typography } from "@react-md/core";
import { Divider } from "@react-md/divider";
import type { ReactElement } from "react";

export function DemoHeadingWithDivider({
  type = "headline-2",
  margin = "top",
  ...props
}: TypographyProps): ReactElement {
  return (
    <>
      <Typography {...props} type={type} margin={margin} />
      <Divider />
    </>
  );
}