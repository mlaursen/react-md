import { Box, FormMessage } from "@react-md/core";
import type { ReactElement } from "react";

export default function SimpleFormMessage(): ReactElement {
  return (
    <Box stacked align="start">
      <FormMessage>Here is some help text</FormMessage>
      <FormMessage length={30} maxLength={40}>
        Help text with a counter
      </FormMessage>
      <FormMessage error>Here is some error text</FormMessage>
    </Box>
  );
}
