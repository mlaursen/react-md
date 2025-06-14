import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { FontIcon } from "../../icon/FontIcon.js";
import { render, screen } from "../../test-utils/index.js";
import { TextField, type TextFieldProps } from "../TextField.js";

describe("TextField", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      label: "Field",
      ref,
    } as const;
    const { rerender } = render(<TextField {...props} />);

    const field = screen.getByRole("textbox", { name: "Field" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(field);
    expect(field).toMatchSnapshot();

    rerender(
      <TextField
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(field).toMatchSnapshot();
  });

  it("should support the readOnly state", () => {
    render(
      <TextField readOnly containerProps={{ "data-testid": "container" }} />
    );

    const container = screen.getByTestId("container");
    const field = screen.getByRole("textbox");
    expect(field).toHaveAttribute("readOnly");
    expect(container).toMatchSnapshot();
  });

  it("should support the disabled state", () => {
    render(
      <TextField
        label="Label"
        disabled
        containerProps={{ "data-testid": "container" }}
      />
    );

    const container = screen.getByTestId("container");
    const field = screen.getByRole("textbox");
    expect(field).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should support an error state", () => {
    render(
      <TextField
        label="Label"
        error
        containerProps={{ "data-testid": "container" }}
      />
    );

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });

  it("should allow the active state to be controlled programmatically instead of with css only by using the active prop", () => {
    const props: TextFieldProps = {
      containerProps: { "data-testid": "container" },
    };
    const { rerender } = render(<TextField {...props} />);

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} active />);
    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} label="Label" active />);
    expect(container).toMatchSnapshot();
  });

  it("should render the FormMessageContainer when the messageProps have been defined", () => {
    const { rerender } = render(
      <TextField
        label="Field"
        messageContainerProps={{ "data-testid": "message-container" }}
      />
    );
    expect(() => screen.getByTestId("message-container")).toThrow();

    rerender(
      <TextField
        label="Field"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help text" }}
      />
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();

    rerender(
      <TextField
        label="Field"
        inline
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help text" }}
      />
    );
    expect(messageContainer).toMatchSnapshot();
  });

  it("should automatically merge the error and theme props when messageProps have been defined", () => {
    render(
      <TextField
        label="Field"
        error
        theme="filled"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help Text" }}
      />
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();
  });

  it("should update the placeholder to be a space instead of an empty string when a label has been provided so that floating labels work correctly", () => {
    const { rerender } = render(<TextField />);

    const field = screen.getByRole("textbox");
    expect(field).toHaveAttribute("placeholder", "");

    rerender(<TextField label="Label" />);
    expect(field).toHaveAttribute("placeholder", " ");

    rerender(<TextField label="Label" placeholder="" />);
    expect(field).toHaveAttribute("placeholder", " ");

    rerender(<TextField label="Label" placeholder="Placeholder" />);
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should allow for addons before and after the input", () => {
    render(
      <TextField
        containerProps={{ "data-testid": "container" }}
        label="Field"
        leftAddon={<FontIcon data-testid="favorite">favorite</FontIcon>}
        rightAddon={<FontIcon data-testid="close">close</FontIcon>}
      />
    );

    const container = screen.getByTestId("container");
    expect(() => screen.getByTestId("favorite")).not.toThrow();
    expect(() => screen.getByTestId("close")).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should allow the label to by styled by labelProps or the labelStyle/labelClassName", () => {
    const { rerender } = render(
      <TextField
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
          style: { background: "orange" },
          className: "label-props-class-name",
        }}
      />
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveStyle("background: orange");
    expect(label).not.toHaveStyle("color: red");
    expect(label).toHaveClass("label-props-class-name");
    expect(label).not.toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();

    rerender(
      <TextField
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
        }}
      />
    );

    expect(label).not.toHaveStyle("background: orange");
    expect(label).toHaveStyle("color: red");
    expect(label).not.toHaveClass("label-props-class-name");
    expect(label).toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();
  });
});
