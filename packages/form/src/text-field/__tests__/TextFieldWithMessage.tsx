/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/aria-role */
import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";
import { IconProvider } from "@react-md/icon";
import { ErrorOutlineFontIcon } from "@react-md/material-icons";

import { TextFieldWithMessage } from "../TextFieldWithMessage";
import { TextFieldHookOptions, useTextField } from "../useTextField";
import { FormMessageProps } from "../../FormMessage";

function Test({
  id = "field-id",
  messageRole,
  ...options
}: Partial<TextFieldHookOptions> & { messageRole?: "alert" }): ReactElement {
  // first arg is value, but it isn't needed for these examples
  const [, fieldProps] = useTextField({
    id,
    ...options,
  });

  let messageProps: FormMessageProps = fieldProps.messageProps;
  if (messageRole && messageProps) {
    messageProps = { ...messageProps, role: messageRole };
  }

  return <TextFieldWithMessage {...fieldProps} messageProps={messageProps} />;
}

describe("TextFieldWithMessage", () => {
  it("should work with all the defaults when only an id is provided", () => {
    const { container, getByRole } = render(<Test />);

    expect(container).toMatchSnapshot();
    const field = getByRole("textbox") as HTMLInputElement;
    expect(() => getByRole("alert")).toThrow();

    expect(field).toHaveAttribute("aria-describedby", "field-id-message");
    expect(field.value).toBe("");

    fireEvent.change(field, { target: { value: "a" } });
    expect(field.value).toBe("a");
  });

  it("should apply all of the constraint props to the TextField", () => {
    const { rerender, getByRole } = render(
      <Test pattern="\d{5,8}" minLength={5} maxLength={8} required />
    );

    const field = getByRole("textbox");
    expect(field).toHaveAttribute("minLength", "5");
    expect(field).toHaveAttribute("maxLength", "8");
    expect(field).toHaveAttribute("pattern", "\\d{5,8}");
    expect(field).toHaveAttribute("required");

    rerender(<Test pattern="\d{5,8}" minLength={5} maxLength={8} />);
    expect(field).toHaveAttribute("minLength", "5");
    expect(field).toHaveAttribute("maxLength", "8");
    expect(field).toHaveAttribute("pattern", "\\d{5,8}");
    expect(field).not.toHaveAttribute("required");
  });

  it("should render the counter parts in the message when the counter option is enabled along with the maxLength", () => {
    const props = {
      counter: true,
      maxLength: 20,
    };

    const { rerender, getByRole } = render(
      <Test {...props} messageRole="alert" />
    );
    const field = getByRole("textbox");
    const message = getByRole("alert");

    expect(field).toHaveAttribute("maxLength", "20");
    expect(message.textContent).toBe("0 / 20");

    const value = "Hello, world!";
    fireEvent.change(field, { target: { value } });
    expect(message.textContent).toBe(`${value.length} / 20`);

    rerender(<Test {...props} counter={false} />);
    expect(field).toHaveAttribute("maxLength", "20");
    expect(message.textContent).toBe("");
  });

  it("should allow for the maxLength attribute to not be passed to the TextField", () => {
    const props = {
      maxLength: 20,
      disableMaxLength: true,
    };

    const { rerender, getByRole } = render(<Test {...props} />);

    const field = getByRole("textbox");
    expect(field).not.toHaveAttribute("maxLength");

    rerender(<Test {...props} disableMaxLength={false} />);
    expect(field).toHaveAttribute("maxLength", "20");
  });

  it("should enable the error state if the value is greater than the maxLength", () => {
    const { getByRole } = render(
      <Test minLength={5} maxLength={20} messageRole="alert" />
    );
    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");

    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "1" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "Valid" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "1234567890123456789" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "12345678901234567890" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "123456789012345678901" } });
    expect(container.className).toContain("--error");
    expect(message.className).toContain("--error");
  });

  it("should not update the error state on change or update the value if the custon onChange event stopped propagation", () => {
    const { getByRole } = render(
      <Test
        minLength={10}
        onChange={(event) => event.stopPropagation()}
        messageRole="alert"
      />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "1" } });
    expect(field).toHaveAttribute("value", "");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");
  });

  it("should not update the error state on change if `validateOnChange` is false", () => {
    const { getByRole } = render(
      <Test minLength={10} validateOnChange={false} messageRole="alert" />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "1" } });
    expect(field).toHaveAttribute("value", "1");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");
  });

  it("should not update the error state on change if `validateOnChange` is an empty array", () => {
    const { getByRole } = render(
      <Test minLength={10} validateOnChange={[]} messageRole="alert" />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "1" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");
    expect(field).toHaveAttribute("value", "1");
  });

  it("should render the helpText if when there is no error text", () => {
    const { getByRole } = render(
      <Test
        helpText="Help Text"
        messageRole="alert"
        maxLength={5}
        getErrorMessage={({ value }) =>
          value.length > 0 ? "Error Message" : ""
        }
      />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");

    expect(message.textContent).toBe("Help Text");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "Invalid" } });
    expect(message.textContent).toBe("Error Message");
    expect(container.className).toContain("--error");
    expect(message.className).toContain("--error");
  });

  it("should render an icon next to the text field when there is an error by default", () => {
    const { getByRole, getByText } = render(
      <Test maxLength={3} errorIcon={<ErrorOutlineFontIcon />} />
    );
    const field = getByRole("textbox");

    expect(() => getByText("error_outline")).toThrow();
    fireEvent.change(field, { target: { value: "Invalid" } });
    expect(() => getByText("error_outline")).not.toThrow();
  });

  it("should default to the icon from the IconProvider", () => {
    const { getByText, getByRole } = render(
      <IconProvider>
        <Test maxLength={3} />
      </IconProvider>
    );
    const field = getByRole("textbox");

    expect(() => getByText("error_outline")).toThrow();
    fireEvent.change(field, { target: { value: "Invalid" } });
    expect(() => getByText("error_outline")).not.toThrow();
  });

  it("should override the IconProvider error icon when the errorIcon prop is defined", () => {
    const { getByRole, getByText, rerender } = render(
      <IconProvider>
        <Test maxLength={3} errorIcon={null} />
      </IconProvider>
    );
    const field = getByRole("textbox");

    expect(() => getByText("error_outline")).toThrow();
    fireEvent.change(field, { target: { value: "Invalid" } });
    expect(() => getByText("error_outline")).toThrow();

    rerender(
      <IconProvider>
        <Test maxLength={3} errorIcon={<span>My Icon!</span>} />
      </IconProvider>
    );
    expect(() => getByText("My Icon!")).not.toThrow();
  });

  it("should correctly reset with the provided return function", () => {
    function ResetTest(): ReactElement {
      const [, props, { reset }] = useTextField({ id: "field-id" });

      return (
        <>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <TextFieldWithMessage {...props} />
        </>
      );
    }
    const { getByRole } = render(<ResetTest />);

    const button = getByRole("button");
    const field = getByRole("textbox");

    expect(field).toHaveAttribute("value", "");
    fireEvent.change(field, { target: { value: "my value" } });
    expect(field).toHaveAttribute("value", "my value");

    fireEvent.click(button);
    expect(field).toHaveAttribute("value", "");
  });

  it("should validate on blur", () => {
    const { getByRole } = render(
      <Test messageRole="alert" minLength={10} validateOnChange={false} />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");

    fireEvent.change(field, { target: { value: "invalid" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.blur(field);
    expect(container.className).toContain("--error");
    expect(message.className).toContain("--error");
  });

  it("should not do anything if the provided onBlur function calls stopPropagation", () => {
    const { getByRole } = render(
      <Test
        onBlur={(event) => event.stopPropagation()}
        messageRole="alert"
        maxLength={3}
        validateOnChange={false}
      />
    );

    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");

    fireEvent.change(field, { target: { value: "invalid" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.blur(field);
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");
  });

  it("should allow for a custom default value string", () => {
    const { getByRole } = render(<Test defaultValue="Hello, world!" />);
    const field = getByRole("textbox");

    expect(field).toHaveAttribute("value", "Hello, world!");
  });

  it("should allow for a custom default value function", () => {
    const { getByRole } = render(<Test defaultValue={() => "Hello, world!"} />);
    const field = getByRole("textbox");

    expect(field).toHaveAttribute("value", "Hello, world!");
  });

  it("should not render the FormMessage when the disableMessage option is true", () => {
    const { container, getByRole } = render(
      <Test disableMessage messageRole="alert" />
    );
    expect(container).toMatchSnapshot();

    expect(container.firstElementChild?.className).toContain("rmd-text-field");
    expect(container.firstElementChild?.className).not.toContain(
      "rmd-field-message-container"
    );
    expect(() => getByRole("alert")).toThrow();
  });

  it("should allow for a custom isErrored function", () => {
    const isErrored = jest.fn(() => false);
    const { getByRole } = render(
      <Test isErrored={isErrored} messageRole="alert" maxLength={3} />
    );

    expect(isErrored).not.toBeCalled();
    const field = getByRole("textbox");
    const container = field.parentElement!;
    const message = getByRole("alert");
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    fireEvent.change(field, { target: { value: "invalid" } });
    expect(container.className).not.toContain("--error");
    expect(message.className).not.toContain("--error");

    expect(isErrored).toBeCalledWith({
      value: "invalid",
      errorMessage: "",
      maxLength: 3,
      isBlurEvent: false,
      validateOnChange: "recommended",
      validationMessage: "",
      validity: (field as HTMLInputElement).validity,
    });
  });

  it("should call the onErrorChange option correctly", () => {
    const onErrorChange = jest.fn();
    const { getByRole } = render(
      <Test onErrorChange={onErrorChange} maxLength={3} />
    );

    expect(onErrorChange).not.toBeCalled();
    const field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "invalid" } });
    expect(onErrorChange).toBeCalledWith("field-id", true);

    fireEvent.change(field, { target: { value: "v" } });
    expect(onErrorChange).toBeCalledWith("field-id", false);
    expect(onErrorChange).toBeCalledTimes(2);
  });

  it("should allow for custom logic for displaying the error icon", () => {
    const getErrorIcon = jest.fn(
      (errorMessage, error, errorIcon) =>
        error && <span data-testid="wrapper">{errorIcon}</span>
    );
    const errorIcon = <span data-testid="error-icon" />;

    const { getByTestId, getByRole } = render(
      <Test maxLength={3} errorIcon={errorIcon} getErrorIcon={getErrorIcon} />
    );
    const field = getByRole("textbox");

    expect(() => getByTestId("wrapper")).toThrow();
    expect(() => getByTestId("error-icon")).toThrow();
    expect(getErrorIcon).toBeCalledWith("", false, errorIcon);

    fireEvent.change(field, { target: { value: "invalid" } });
    expect(() => getByTestId("wrapper")).not.toThrow();
    expect(() => getByTestId("error-icon")).not.toThrow();
    expect(getErrorIcon).toBeCalledWith("", true, errorIcon);
    expect(getErrorIcon).toBeCalledTimes(2);
  });

  it.todo(
    "should verify the constraint validation, but it requires a real browser to work"
  );
});
