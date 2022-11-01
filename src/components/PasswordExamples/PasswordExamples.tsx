import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { PasswordConfirmation } from "./PasswordConfirmation";
import { SimplePasswords } from "./SimplePasswords";

export default function PasswordExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Passwords</DemoHeadingWithDivider>
        <SimplePasswords />
        <DemoHeadingWithDivider>Password Confirmation</DemoHeadingWithDivider>
        <PasswordConfirmation />
      </Box>
    </Resettable>
  );
}
