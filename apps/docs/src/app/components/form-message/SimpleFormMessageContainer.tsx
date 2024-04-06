import { Box, FormMessageContainer } from "react-md";
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
