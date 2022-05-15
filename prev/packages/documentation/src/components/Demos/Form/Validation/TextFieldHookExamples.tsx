import type { ReactElement } from "react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@react-md/button";
import type { ErrorChangeHandler, GetErrorMessage } from "@react-md/form";
import {
  defaultGetErrorMessage,
  Form,
  PasswordWithMessage,
  TextAreaWithMessage,
  TextFieldWithMessage,
  useTextField,
} from "@react-md/form";

type FieldId = string;
type ErrorRecord = Record<FieldId, boolean | undefined>;

/**
 * You can define a custom function to get the error message as well.
 * @see defaultGetErrorMessage for more details
 */
const getErrorMessage: GetErrorMessage = (options) => {
  const { validity, minLength, maxLength } = options;
  if (validity.tooLong) {
    return `No more than ${maxLength} characters.`;
  }

  if (validity.tooShort) {
    return `Must be at least ${minLength} characters.`;
  }

  if (validity.valueMissing) {
    return "This value is required!";
  }

  return defaultGetErrorMessage(options);
};

export default function TextFieldHookExamples(): ReactElement | null {
  const [errors, setErrors] = useState<ErrorRecord>({});
  const errored = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const onErrorChange = useCallback<ErrorChangeHandler>(
    (id, error) => setErrors((prevErrors) => ({ ...prevErrors, [id]: error })),
    []
  );

  const [_name, nameFieldProps] = useTextField({
    id: "text-field-hook-1",
    required: true,
    onErrorChange,
  });
  const [_date, dateFieldProps] = useTextField({
    id: "text-field-hook-2",
    required: true,
    helpText: "mm/dd/yyyy",
    pattern: "^\\d{2}/\\d{2}/\\d{4}$",
    minLength: 10,
    maxLength: 10,
    onErrorChange,
  });
  const [_description, descriptionFieldProps] = useTextField({
    id: "text-field-hook-3",
    counter: true,
    maxLength: 200,
    // just so you can see the error state since browser prevent text from being
    // entered when the maxLength attribute is provided
    disableMaxLength: true,
    onErrorChange,
  });
  const [_description2, description2FieldProps] = useTextField({
    id: "text-field-hook-4",
    required: true,
    counter: true,
    minLength: 10,
    maxLength: 50,
    onErrorChange,
    // disable the error icon, this is also pulled automatically from the
    // `IconProvider` as the `error` icon when undefined
    errorIcon: null,
    // custom error messages for this one
    getErrorMessage,
  });
  const [_password, passwordProps] = useTextField({
    id: "text-field-hook-password",
    required: true,
    minLength: 10,
    helpText: "Create a password with at least 10 characters.",
    onErrorChange,
  });

  return (
    <Form>
      <TextFieldWithMessage
        {...nameFieldProps}
        label="Name"
        placeholder="John Doe"
        name="name"
      />
      <TextFieldWithMessage
        {...dateFieldProps}
        label="Date *"
        placeholder="01/01/2020"
        name="date"
      />
      <TextAreaWithMessage
        {...descriptionFieldProps}
        label="Description"
        placeholder="Something amazing."
        name="description"
      />
      <TextAreaWithMessage
        {...description2FieldProps}
        label="Description 2 *"
        placeholder="Something amazing."
        name="description2"
      />
      <PasswordWithMessage
        {...passwordProps}
        label="Password *"
        name="password"
      />
      <Button
        type="submit"
        disabled={errored}
        theme="primary"
        themeType="outline"
      >
        Submit
      </Button>
    </Form>
  );
}
