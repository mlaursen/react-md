import { Box } from "@react-md/core/box/Box";
import { FormMessageContainer } from "@react-md/core/form/FormMessageContainer";
import { type ReactElement } from "react";

export default function SimpleFormMessageContainer(): ReactElement {
  return (
    <Box justify="start" stacked>
      <FormMessageContainer>No message</FormMessageContainer>
      <FormMessageContainer
        messageProps={{
          children: "Some additional help text.",
        }}
      >
        Has message
      </FormMessageContainer>
    </Box>
  );
}
