import { type ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../button/Button.js";
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { Form } from "../Form.js";
import { TextField } from "../TextField.js";
import { type TextFieldHookOptions, useTextField } from "../useTextField.js";
import { type GetErrorIconOptions } from "../validation.js";

type TestProps = Partial<TextFieldHookOptions>;

function Test({ name = "field", ...options }: TestProps): ReactElement {
  const { fieldProps } = useTextField({
    ...options,
    name,
  });

  return (
    <Form name="form">
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
  const field = screen.getByRole<HTMLInputElement>("textbox", {
    name: "Field",
  });
  const message = screen.getByTestId("message");
  const container = screen.getByTestId("container");
  const messageContainer = screen.getByTestId("message-container");
  const form = screen.getByRole("form");
  const submit = screen.getByRole("button", { name: "Submit" });
  const reset = screen.getByRole("button", { name: "Reset" });
  return {
    user,
    rerender: (options?: Partial<TextFieldHookOptions>) =>
      rerender(<Test {...options} />),
    form,
    submit,
    reset,
    field,
    container,
    message,
    messageContainer,
  };
};

describe("useTextField", () => {
  it("should default to rendering with an empty FormMessage and linking it to the field", () => {
    const { field, message } = setup();
    expect(message.id).not.toBe(null);
    expect(field).toHaveAttribute("aria-describedby", message.id);
  });

  it("should apply all of the constraint props to the TextField", () => {
    const { field, rerender } = setup({
      pattern: "\\d{5,8}",
      minLength: 5,
      maxLength: 8,
      required: true,
    });

    expect(field).toHaveAttribute("minLength", "5");
    expect(field).toHaveAttribute("maxLength", "8");
    expect(field).toHaveAttribute("pattern", "\\d{5,8}");
    expect(field).toHaveAttribute("required");

    rerender({
      pattern: "\\d{5,8}",
      minLength: 5,
      maxLength: 8,
    });
    expect(field).toHaveAttribute("minLength", "5");
    expect(field).toHaveAttribute("maxLength", "8");
    expect(field).toHaveAttribute("pattern", "\\d{5,8}");
    expect(field).not.toBeRequired();
  });

  it("should render the helpText if when there is no error text", async () => {
    const { user, field, container, message } = setup({
      helpText: "Help Text",
      maxLength: 5,
      getErrorMessage: ({ value }) => (value.length > 0 ? "Error Message" : ""),
    });

    expect(message).toHaveTextContent("Help Text");
    expect(container).not.toHaveClass("rmd-text-field-container--error");
    expect(message).not.toHaveClass("rmd-error-color");

    await user.type(field, "Invalid");
    expect(message).toHaveTextContent("Error Message");
    expect(container).toHaveClass("rmd-text-field-container--error");
    expect(message).toHaveClass("rmd-error-color");
  });

  describe("error behavior", () => {
    it("should not update the error state on change if `validationType` is an empty array", async () => {
      const { user, field, container, message } = setup({
        minLength: 10,
        validationType: [],
      });

      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      await user.type(field, "1");
      expect(field).toHaveValue("1");
      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      fireEvent.blur(field);
      expect(container).toHaveClass("rmd-text-field-container--error");
      expect(message).toHaveClass("rmd-error-color");
    });

    it("should render an error icon as the rightAddon when there is an error", async () => {
      const { field, user } = setup({
        errorIcon: <span data-testid="error-icon" />,
        maxLength: 3,
        disableMaxLength: true,
      });

      expect(() => screen.getByTestId("error-icon")).toThrow();

      await user.type(field, "invalid");
      expect(() => screen.getByTestId("error-icon")).not.toThrow();

      await user.clear(field);
      expect(() => screen.getByTestId("error-icon")).toThrow();
    });

    it("should allow for a custom isErrored function", async () => {
      const isErrored = vi.fn(() => false);
      const { user, field, container, message } = setup({
        isErrored,
        maxLength: 3,
        disableMaxLength: true,
      });

      expect(isErrored).not.toHaveBeenCalled();
      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      await user.type(field, "invalid");
      expect(container).not.toHaveClass("rmd-text-field-container--error");
      expect(message).not.toHaveClass("rmd-error-color");

      expect(isErrored).toHaveBeenCalledWith({
        value: "invalid",
        errorMessage: "",
        maxLength: 3,
        isNumber: false,
        isBlurEvent: false,
        validationType: "recommended",
        validationMessage: "",
        validity: field.validity,
      });
    });

    it("should call the onErrorChange option correctly", async () => {
      const onErrorChange = vi.fn();
      const { user, field } = setup({
        onErrorChange,
        maxLength: 3,
        disableMaxLength: true,
      });

      expect(onErrorChange).not.toHaveBeenCalled();
      await user.type(field, "inva");
      expect(onErrorChange).toHaveBeenCalledWith({
        ref: expect.any(Object),
        name: "field",
        error: true,
        errorMessage: "",
      });

      await user.type(field, "{Backspace}");
      expect(onErrorChange).toHaveBeenCalledWith({
        ref: expect.any(Object),
        name: "field",
        error: false,
        errorMessage: "",
      });
      expect(onErrorChange).toHaveBeenCalledTimes(2);
    });

    it("should allow for custom logic for displaying the error icon", async () => {
      const getErrorIcon = vi.fn((options: GetErrorIconOptions) => {
        const { error, errorIcon } = options;
        if (!error) {
          return <span data-testid="right-addon" />;
        }

        return <span data-testid="wrapper">{errorIcon}</span>;
      });

      const errorIcon = <span data-testid="error-icon" />;

      const { user, field } = setup({
        maxLength: 3,
        errorIcon,
        getErrorIcon,
        disableMaxLength: true,
      });

      expect(() => screen.getByTestId("right-addon")).not.toThrow();
      expect(() => screen.getByTestId("wrapper")).toThrow();
      expect(() => screen.getByTestId("error-icon")).toThrow();
      expect(getErrorIcon).toHaveBeenCalledWith({
        error: false,
        errorIcon,
        errorMessage: "",
      });

      await user.type(field, "inva");
      expect(() => screen.getByTestId("right-addon")).toThrow();
      expect(() => screen.getByTestId("wrapper")).not.toThrow();
      expect(() => screen.getByTestId("error-icon")).not.toThrow();
      expect(getErrorIcon).toHaveBeenCalledWith({
        error: true,
        errorIcon,
        errorMessage: "",
      });
      expect(getErrorIcon).toHaveBeenCalledTimes(5);
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
        pattern: "\\d+",
      });
      expect(container).not.toHaveClass("rmd-text-field-container--error");

      await user.type(field, "Hello");
      fireEvent.blur(field);
      expect(field).toHaveValue("Hello");
      expect(container).toHaveClass("rmd-text-field-container--error");

      await user.click(reset);
      expect(field).toHaveValue("");
      expect(container).not.toHaveClass("rmd-text-field-container--error");
    });
  });

  describe("counter", () => {
    it("should be able to display an inline counter when the maxLength and counter options are provided", async () => {
      const { user, rerender, field, message, container } = setup();
      expect(() => screen.getByTestId("counter")).toThrow();

      rerender({ maxLength: 20 });
      expect(() => screen.getByTestId("counter")).toThrow();
      expect(field).toHaveAttribute("maxLength", "20");

      rerender({ counter: true, maxLength: 20 });
      const counter = screen.getByTestId("counter");
      expect(field).toHaveAttribute("maxLength", "20");
      expect(counter).toHaveTextContent("0 / 20");

      await user.type(field, "Hello, world!");
      expect(counter).toHaveTextContent("13 / 20");

      await user.type(field, " This is too long");
      expect(field).toHaveValue("Hello, world! This i");
      expect(counter).toHaveTextContent("20 / 20");
      expect(message).not.toHaveClass("rmd-error-color");
      expect(container).not.toHaveClass("rmd-text-field-container--error");
    });

    it("should allow the user to type more characters than the maxLength if the disableMaxLength prop is provided", async () => {
      const { user, container, field, message } = setup({
        counter: true,
        maxLength: 20,
        disableMaxLength: true,
      });
      const counter = screen.getByTestId("counter");
      expect(message).not.toHaveClass("rmd-error-color");

      await user.type(field, "Hello, world! This is too long");
      expect(field).toHaveValue("Hello, world! This is too long");
      expect(counter).toHaveTextContent("30 / 20");
      expect(message).toHaveClass("rmd-error-color");
      expect(container).toHaveClass("rmd-text-field-container--error");

      await user.type(field, "{Backspace}".repeat(10));
      expect(field).toHaveValue("Hello, world! This i");
      expect(counter).toHaveTextContent("20 / 20");
      expect(message).not.toHaveClass("rmd-error-color");
      expect(container).not.toHaveClass("rmd-text-field-container--error");
    });
  });

  describe("validation", () => {
    it.todo("should handle validation, but it requires real browser tests");
  });
});
