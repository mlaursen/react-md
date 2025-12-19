import { type ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { Button } from "../../button/Button.js";
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { Form } from "../Form.js";
import { TextField } from "../TextField.js";
import {
  type NumberFieldHookOptions,
  useNumberField,
} from "../useNumberField.js";

type TestProps = Partial<NumberFieldHookOptions>;

function Test({ name = "field", ...options }: TestProps): ReactElement {
  const { fieldProps, value } = useNumberField({
    ...options,
    name,
  });

  return (
    <Form name="form">
      <span data-testid="value">{value}</span>
      <TextField
        label="Field"
        {...fieldProps}
        containerProps={{
          "data-testid": "container",
        }}
        messageContainerProps={{
          "data-testid": "message-container",
        }}
        messageProps={{
          "data-testid": "message",
          ...fieldProps.messageProps,
          counterProps: {
            "data-testid": "counter",
          },
          messageProps: {
            "data-testid": "p",
          },
        }}
      />
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const setup = (options?: TestProps) => {
  const user = userEvent.setup();
  const { rerender } = render(<Test {...options} />);
  const field = screen.getByRole<HTMLInputElement>("spinbutton", {
    name: "Field",
  });
  const message = screen.getByTestId("message");
  const container = screen.getByTestId("container");
  const messageContainer = screen.getByTestId("message-container");
  const form = screen.getByRole("form");
  const submit = screen.getByRole("button", { name: "Submit" });
  const reset = screen.getByRole("button", { name: "Reset" });
  const value = screen.getByTestId("value");
  return {
    user,
    rerender: (options?: TestProps) => rerender(<Test {...options} />),
    form,
    value,
    submit,
    reset,
    field,
    container,
    message,
    messageContainer,
  };
};

describe("useNumberField", () => {
  it("should default to rendering with an empty FormMessage and linking it to the field", () => {
    const { field, message } = setup();
    expect(message.id).not.toBe(null);
    expect(field).toHaveAttribute("aria-describedby", message.id);
  });

  it("should apply all of the constraint props to the TextField", () => {
    const { field, rerender } = setup({
      min: 0,
      max: 10,
      required: true,
    });

    expect(field).toHaveAttribute("min", "0");
    expect(field).toHaveAttribute("max", "10");
    expect(field).toHaveAttribute("required");

    rerender({
      min: 20,
      max: 25,
    });
    expect(field).toHaveAttribute("min", "20");
    expect(field).toHaveAttribute("max", "25");
    expect(field).not.toBeRequired();
  });

  it("should render the helpText if when there is no error text", async () => {
    const { user, field, container, message } = setup({
      helpText: "Help Text",
      min: 0,
      max: 5,
    });

    expect(message).toHaveTextContent("Help Text");
    expect(container).not.toHaveClass("rmd-text-field-container--error");
    expect(message).not.toHaveClass("rmd-error-color");

    await user.type(field, "8");
    expect(message).toHaveTextContent("Constraints not satisfied");
    expect(container).toHaveClass("rmd-text-field-container--error");
    expect(message).toHaveClass("rmd-error-color");
  });

  it("should be able to render any number", async () => {
    const { user, field } = setup();

    await user.type(field, "8");
    expect(field).toHaveValue(8);
  });

  it("should automatically update the value to be within the range by default when blurred", async () => {
    const { user, field } = setup({
      min: 0,
      max: 5,
    });

    await user.type(field, "8");
    expect(field).toHaveValue(8);

    fireEvent.blur(field);
    expect(field).toHaveValue(5);
  });

  it("should enforce the defaultValue when blurred if it was provided", async () => {
    const { user, field } = setup({
      defaultValue: 3,
    });

    await user.clear(field);
    expect(field).toHaveValue(null);

    fireEvent.blur(field);
    expect(field).toHaveValue(3);
  });

  it("should default to the min value on blur if the number is out or range", async () => {
    const { user, field } = setup({
      defaultValue: 3,
      min: 0,
    });

    await user.clear(field);
    expect(field).toHaveValue(null);

    fireEvent.blur(field);
    expect(field).toHaveValue(0);
  });

  it("should allow bad input if the user types some invalid number", async () => {
    const { user, field } = setup();

    await user.type(field, "--0");
    expect(field).toHaveValue(null);

    fireEvent.blur(field);
    expect(field).toHaveValue(null);
  });

  it("should support updating the saved value on blur only", async () => {
    const { user, field, value } = setup({
      updateValue: "blur",
    });

    expect(value).toBeEmptyDOMElement();

    await user.type(field, "3");
    expect(value).toBeEmptyDOMElement();

    fireEvent.blur(field);
    expect(value).toHaveTextContent("3");
  });

  describe("error behavior", () => {
    it("should not update the error state on change if `validationType` is an empty array", async () => {
      const { user, field, container, message } = setup({
        min: 10,
        validationType: [],
      });

      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      await user.type(field, "1");
      expect(field).toHaveValue(1);
      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      fireEvent.blur(field);
      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");
      expect(field).toHaveValue(10);
    });

    it("should render an error icon as the rightAddon when there is an error", async () => {
      const { field, user } = setup({
        errorIcon: <span data-testid="error-icon" />,
        max: 3,
        disableMaxLength: true,
      });

      expect(() => screen.getByTestId("error-icon")).toThrowError();

      await user.type(field, "5");
      expect(() => screen.getByTestId("error-icon")).not.toThrowError();

      await user.clear(field);
      expect(() => screen.getByTestId("error-icon")).toThrowError();
    });
  });

  describe("form behavior", () => {
    it("should enable the error state if a form is submitted while required", async () => {
      const { user, submit, container } = setup({
        required: true,
      });
      expect(container).not.toHaveClass("rmd-text-field-container--error");

      await user.click(submit);
      expect(container).toHaveClass("rmd-text-field-container--error");
    });

    it("should automatically reset to the initial state if the form reset event is fired", async () => {
      const { user, field, reset, container } = setup({
        required: true,
      });
      expect(container).not.toHaveClass("rmd-text-field-container--error");

      await user.type(field, "10");
      expect(field).toHaveValue(10);
      expect(container).not.toHaveClass("rmd-text-field-container--error");

      await user.clear(field);
      expect(field).toHaveValue(null);
      expect(container).toHaveClass("rmd-text-field-container--error");

      await user.click(reset);
      expect(field).toHaveValue(null);
      expect(container).not.toHaveClass("rmd-text-field-container--error");
    });
  });
});
