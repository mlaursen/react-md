import type { ReactElement } from "react";
import {
  Form,
  TextField,
  TextFieldWithMessage,
  useNumberField,
} from "@react-md/form";
import { Typography } from "@react-md/typography";
import { Grid } from "@react-md/utils";

import Code from "components/Code";

export default function NumberHookExamples(): ReactElement | null {
  const [value1, field1Props] = useNumberField({
    id: "number-field-1",
    disableMessage: true,
  });
  const [value2, field2Props] = useNumberField({
    id: "number-field-2",
  });
  const [value3, field3Props] = useNumberField({
    id: "number-field-3",
    defaultValue: 0,
  });
  const [value4, field4Props] = useNumberField({
    id: "number-field-4",
    min: 0,
    max: 10,
    defaultValue: 0,
    updateOnChange: false,
  });
  const [value5, field5Props] = useNumberField({
    id: "number-field-5",
    min: 0,
    max: 10,
    step: 2,
    defaultValue: 0,
    validateOnChange: true,
  });
  return (
    <Form>
      <Grid columns={1} clone>
        <Typography margin="none">
          value1: <Code inline>{`${value1}`}</Code>
        </Typography>
        <TextField {...field1Props} label="Field 1" placeholder="0" />
        <Typography margin="top">
          value2: <Code inline>{`${value2}`}</Code>
        </Typography>
        <TextFieldWithMessage
          {...field2Props}
          label="Field 2"
          placeholder="0"
        />
        <Typography margin="none">
          value3: <Code inline>{`${value3}`}</Code>
        </Typography>
        <TextFieldWithMessage
          {...field3Props}
          label="Field 3"
          placeholder="0"
        />
        <Typography margin="none">
          value4: <Code inline>{`${value4}`}</Code>
        </Typography>
        <TextFieldWithMessage
          {...field4Props}
          label="Field 4"
          placeholder="0"
        />
        <Typography margin="none">
          value5: <Code inline>{`${value5}`}</Code>
        </Typography>
        <TextFieldWithMessage
          {...field5Props}
          label="Field 5"
          placeholder="0"
        />
      </Grid>
    </Form>
  );
}
