import { Button } from "@react-md/button";
import { Box, Typography } from "@react-md/core";
import {
  Form,
  Password,
  Switch,
  TextField,
  useNumberField,
  useTextField,
} from "@react-md/form";
import type { ReactElement } from "react";
import { Resettable } from "src/components/Resettable";

function TextFieldHook(): ReactElement {
  // NEXT STEPS:
  // - should I care about render optimzation>
  // - how does this work with validating against other fields?
  // - should I create ValidatedTextField/ValidatedTextArea componets that implement this hook?
  //   - this would allow for some internal optimizations around persisting error states when needed
  //   - alos around the value? This hook is only useful if you need the value immmediately
  const { fieldProps } = useTextField({
    name: "field",
    required: true,
    counter: true,
    maxLength: 40,
    minLength: 4,
    disableMessage: true,
    disableMaxLength: true,
  });

  return (
    <Form>
      <TextField {...fieldProps} label="Label" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const SPECIAL_CHARACTERS = "!@#$%^&*()_+=-";
const pattern = `^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9${SPECIAL_CHARACTERS}])(.{8,})$`;

function PasswordConfirmation(): ReactElement {
  const { fieldProps: passwordProps } = useTextField({
    name: "password",
    required: true,
    minLength: 8,
    pattern,
    validationType: "change",
  });
  const { fieldProps: confirmProps } = useTextField({
    name: "confirmPassword",
    required: true,
    minLength: 8,
    pattern,
    validationType: "change",
  });
  return (
    <Form>
      <Password {...passwordProps} label="Password" />
      <Password {...confirmProps} label="Confirm Password" />
      <Button type="submit" theme="secondary" themeType="outline">
        Submit
      </Button>
    </Form>
  );
}

function NumberExample(): ReactElement {
  const { fieldProps } = useNumberField({ name: "number" });
  return (
    <Form>
      <TextField {...fieldProps} label="Number" />
    </Form>
  );
}

const inputTypes = [
  "text",
  "password",
  "number",
  "tel",
  "email",
  "date",
  "time",
  "datetime-local",
  "url",
  "color",
  "search",
] as const;

export default function TextFieldPage(): ReactElement {
  return (
    <Resettable>
      <Form>
        <Box>
          <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
            Text Fields
          </Typography>
          <TextField placeholder="Placeholder only" />
          <TextField label="Label" placeholder="Placeholder" />
          <TextField label="Label" defaultValue="Hello, world!" />
          <TextField
            label="Error State"
            placeholder="Placeholder"
            defaultValue="Default value"
            error
          />
          <TextField
            label="Read Only"
            placeholder="Placeholder"
            defaultValue="Default value"
            readOnly
          />
          <TextField
            label="Disabled"
            placeholder="Placeholder"
            defaultValue="Default value"
            disabled
          />
        </Box>
      </Form>
      <Form>
        <Box>
          <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
            Supported Input Types
          </Typography>
          {inputTypes.map((type) => (
            <TextField
              key={type}
              label={`Example ${type}`}
              type={type}
              placeholder="Placeholder"
              style={{ width: type === "color" ? "rem" : undefined }}
            />
          ))}
        </Box>
      </Form>
      <Form>
        <Box>
          <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
            Password
          </Typography>
          <Password placeholder="Placeholder Only" />
          <Password label="Password" placeholder="Placeholder" />
          <Password label="Password" placeholder="Placeholder" error />
          <Password label="Read Only" placeholder="Placeholder" readOnly />
          <Password label="Disabled" placeholder="Placeholder" disabled />
        </Box>
      </Form>
      <Box>
        <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
          Simple Validation
        </Typography>
        <TextFieldHook />
      </Box>
      <Box>
        <Typography type="headline-4" margin="top" style={{ width: "100%" }}>
          Number Fields
        </Typography>
        <NumberExample />
      </Box>
    </Resettable>
  );
}
