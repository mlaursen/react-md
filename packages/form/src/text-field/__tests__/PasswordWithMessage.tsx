/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/aria-role */
import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { PasswordWithMessage } from "../PasswordWithMessage";
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

  return (
    <PasswordWithMessage
      {...fieldProps}
      messageProps={messageProps}
      placeholder="Password"
    />
  );
}

describe("PasswordWithMessage", () => {
  it("should work with all the defaults when only an id is provided", () => {
    const { container, getByPlaceholderText, getByRole } = render(<Test />);

    expect(container).toMatchSnapshot();
    const field = getByPlaceholderText("Password") as HTMLInputElement;
    expect(() => getByRole("alert")).toThrow();

    expect(field).toHaveAttribute("aria-describedby", "field-id-message");
    expect(field.value).toBe("");

    fireEvent.change(field, { target: { value: "a" } });
    expect(field.value).toBe("a");
  });

  it("should apply all of the constraint props to the Password", () => {
    const { rerender, getByPlaceholderText } = render(
      <Test pattern="\d{5,8}" minLength={5} maxLength={8} required />
    );

    const field = getByPlaceholderText("Password");
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

    const { rerender, getByPlaceholderText, getByRole } = render(
      <Test {...props} messageRole="alert" />
    );
    const field = getByPlaceholderText("Password");
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

  it("should allow for the maxLength attribute to not be passed to the Password", () => {
    const props = {
      maxLength: 20,
      disableMaxLength: true,
    };

    const { rerender, getByPlaceholderText } = render(<Test {...props} />);

    const field = getByPlaceholderText("Password");
    expect(field).not.toHaveAttribute("maxLength");

    rerender(<Test {...props} disableMaxLength={false} />);
    expect(field).toHaveAttribute("maxLength", "20");
  });

  it("should enable the error state if the value is greater than the maxLength", () => {
    const { getByPlaceholderText, getByRole } = render(
      <Test minLength={5} maxLength={20} messageRole="alert" />
    );
    const field = getByPlaceholderText("Password");
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
    const { getByPlaceholderText, getByRole } = render(
      <Test
        minLength={10}
        onChange={(event) => event.stopPropagation()}
        messageRole="alert"
      />
    );

    const field = getByPlaceholderText("Password");
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
    const { getByPlaceholderText, getByRole } = render(
      <Test minLength={10} validateOnChange={false} messageRole="alert" />
    );

    const field = getByPlaceholderText("Password");
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
    const { getByPlaceholderText, getByRole } = render(
      <Test minLength={10} validateOnChange={[]} messageRole="alert" />
    );

    const field = getByPlaceholderText("Password");
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
    const { getByPlaceholderText, getByRole } = render(
      <Test
        helpText="Help Text"
        messageRole="alert"
        maxLength={5}
        getErrorMessage={({ value }) =>
          value.length > 0 ? "Error Message" : ""
        }
      />
    );

    const field = getByPlaceholderText("Password");
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

  it.todo(
    "should verify the constraint validation, but it requires a real browser to work"
  );
});
