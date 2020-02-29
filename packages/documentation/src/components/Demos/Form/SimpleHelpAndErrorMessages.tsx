import React, { FC, useState } from "react";
import { FormMessage, TextField } from "@react-md/form";
import { Grid } from "@react-md/utils";

const id = "simple-help-and-error-messages";

const SimpleHelpAndErrorMessages: FC = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  return (
    <Grid columns={1} desktopColumns={2} largeDesktopColumns={3}>
      <div>
        <TextField
          id={`${id}-field-1`}
          aria-describedby={`${id}-field-1-message`}
          label="Name"
          placeholder="John Doe"
        />
        <FormMessage id={`${id}-field-1-message`}>Help Text</FormMessage>
      </div>
      <div>
        <TextField
          id={`${id}-field-2`}
          aria-describedby={`${id}-field-2-message`}
          label="Name"
          placeholder="John Doe"
          error
        />
        <FormMessage id={`${id}-field-2-message`} error>
          Error Text
        </FormMessage>
      </div>
      <div>
        <TextField
          id={`${id}-field-3`}
          aria-describedby={`${id}-field-3-message`}
          label="Name"
          placeholder="John Doe"
          value={value1}
          error={value1.length > 20}
          onChange={event => setValue1(event.currentTarget.value)}
        />
        <FormMessage
          id={`${id}-field-3-message`}
          error={value1.length > 20}
          length={value1.length}
          maxLength={20}
        />
      </div>
      <div>
        <TextField
          id={`${id}-field-4`}
          aria-describedby={`${id}-field-4-message`}
          label="Name"
          placeholder="John Doe"
          value={value2}
          onChange={event => setValue2(event.currentTarget.value)}
          error={value2.length > 20}
        />
        <FormMessage
          id={`${id}-field-4-message`}
          error={value2.length > 20}
          length={value2.length}
          maxLength={20}
        >
          {value2.length > 20 ? "Too long!" : "Max 20 characters"}
        </FormMessage>
      </div>
    </Grid>
  );
};

export default SimpleHelpAndErrorMessages;
