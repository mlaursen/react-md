import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";

import { Button } from "../../button/Button.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { render, screen, userEvent } from "../../test-utils/index.js";
import { Form } from "../Form.js";
import { NativeSelect, type NativeSelectProps } from "../NativeSelect.js";

describe("NativeSelect", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSelectElement>();

    const { rerender } = render(
      <NativeSelect ref={ref} label="Select">
        <option value="a">First</option>
      </NativeSelect>
    );

    const select = screen.getByRole("combobox", { name: "Select" });
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toBe(select);
    expect(select).toMatchSnapshot();

    rerender(
      <NativeSelect
        ref={ref}
        style={{ color: "white" }}
        className="custom-class-name"
      >
        <option value="a">First</option>
      </NativeSelect>
    );
    expect(select).toMatchSnapshot();
  });

  it("should support the readOnly state", () => {
    render(
      <NativeSelect readOnly containerProps={{ "data-testid": "container" }}>
        <option value="a">First</option>
      </NativeSelect>
    );

    const container = screen.getByTestId("container");
    const field = screen.getByRole("combobox");
    expect(field).toHaveAttribute("readOnly");
    expect(container).toMatchSnapshot();
  });

  it("should support the disabled state", () => {
    render(
      <NativeSelect
        label="Label"
        disabled
        containerProps={{ "data-testid": "container" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const container = screen.getByTestId("container");
    const field = screen.getByRole("combobox");
    expect(field).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should support an error state", () => {
    render(
      <NativeSelect
        label="Label"
        error
        containerProps={{ "data-testid": "container" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });

  it("should allow the active state to be controlled programmatically instead of with css only by using the active prop", () => {
    const props: NativeSelectProps = {
      containerProps: { "data-testid": "container" },
      children: <option value="a">First</option>,
    };
    const { rerender } = render(<NativeSelect {...props} />);

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();

    rerender(<NativeSelect {...props} active />);
    expect(container).toMatchSnapshot();

    rerender(<NativeSelect {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<NativeSelect {...props} label="Label" active />);
    expect(container).toMatchSnapshot();
  });

  it("should render the FormMessageContainer when the messageProps have been defined", () => {
    const { rerender } = render(
      <NativeSelect
        label="Field"
        messageContainerProps={{ "data-testid": "message-container" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );
    expect(() => screen.getByTestId("message-container")).toThrow();

    rerender(
      <NativeSelect
        label="Field"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help text" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();

    rerender(
      <NativeSelect
        label="Field"
        inline
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help text" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );
    expect(messageContainer).toMatchSnapshot();
  });

  it("should automatically merge the error and theme props when messageProps have been defined", () => {
    render(
      <NativeSelect
        label="Field"
        error
        theme="filled"
        messageContainerProps={{ "data-testid": "message-container" }}
        messageProps={{ children: "Help Text" }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const messageContainer = screen.getByTestId("message-container");
    expect(messageContainer).toMatchSnapshot();
  });

  it("should allow for addons before and after the input", () => {
    render(
      <NativeSelect
        containerProps={{ "data-testid": "container" }}
        label="Field"
        leftAddon={<FontIcon data-testid="favorite">favorite</FontIcon>}
        rightAddon={<FontIcon data-testid="close">close</FontIcon>}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const container = screen.getByTestId("container");
    expect(() => screen.getByTestId("favorite")).not.toThrow();
    expect(() => screen.getByTestId("close")).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should allow the label to by styled by labelProps or the labelStyle/labelClassName", () => {
    const { rerender } = render(
      <NativeSelect
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
          style: { background: "orange" },
          className: "label-props-class-name",
        }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveStyle("background: orange");
    expect(label).not.toHaveStyle("color: red");
    expect(label).toHaveClass("label-props-class-name");
    expect(label).not.toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();

    rerender(
      <NativeSelect
        label="Label"
        labelStyle={{ color: "red" }}
        labelClassName="label-class-name"
        labelProps={{
          "data-testid": "label",
        }}
      >
        <option value="a">First</option>
      </NativeSelect>
    );

    expect(label).not.toHaveStyle("background: orange");
    expect(label).toHaveStyle("color: red");
    expect(label).not.toHaveClass("label-props-class-name");
    expect(label).toHaveClass("label-class-name");
    expect(label).toMatchSnapshot();
  });

  it("should be able to be required and display a placeholder", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    function Test() {
      return (
        <Form onSubmit={onSubmit}>
          <NativeSelect label="Label" name="choice" required defaultValue="">
            <option value="" disabled hidden />
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </NativeSelect>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    render(<Test />);
    const select = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Label",
    });
    const submit = screen.getByRole("button", { name: "Submit" });
    expect(select).toHaveValue("");
    expect(select.validity.valid).toBe(false);

    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    await user.selectOptions(select, "Option 1");
    expect(select).toHaveValue("Option 1");
    expect(select.validity.valid).toBe(true);

    await user.click(submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should allow for multiselect behavior", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    function Test() {
      return (
        <Form onSubmit={onSubmit}>
          <NativeSelect
            label="Label"
            name="choice"
            required
            defaultValue={[]}
            multiple
          >
            <option value="" disabled hidden />
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </NativeSelect>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    render(<Test />);
    const select = screen.getByRole<HTMLSelectElement>("listbox", {
      name: "Label",
    });
    const submit = screen.getByRole("button", { name: "Submit" });
    expect(select.validity.valid).toBe(false);
    expect(select).toMatchSnapshot();

    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    await user.selectOptions(select, ["Option 1", "Option 3"]);
    expect(select).toHaveValue(["Option 1", "Option 3"]);
    expect(select.validity.valid).toBe(true);
    expect(select).toMatchSnapshot();
  });
});
