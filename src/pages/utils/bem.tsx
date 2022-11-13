import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../../components/DemoHeadingWithDivider";

export default function BemPage(): ReactElement {
  return (
    <Box stacked>
      <DemoHeadingWithDivider>bem</DemoHeadingWithDivider>
    </Box>
  );
}
