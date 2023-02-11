import { fireEvent, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { AppSizeProvider } from "../../AppSizeProvider";
import { Button } from "../../button";
import { DropdownMenu } from "../../menu";
import { Form } from "../Form";
import { MenuItemRadio } from "../MenuItemRadio";
import { Radio } from "../Radio";

import { useRadioGroup } from "../useRadioGroup";

describe("useRadioGroup", () => {
  it("should not check any radio elements by default", () => {
    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({ name: "example" });

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
        </Form>
      );
    }

    const { getByRole, container } = render(<Test />);

    const radio1 = getByRole("radio", { name: "First" });
    const radio2 = getByRole("radio", { name: "Second" });
    const radio3 = getByRole("radio", { name: "Third" });
    const radio4 = getByRole("radio", { name: "Forth" });
    expect(radio1).toHaveAttribute("value", "a");
    expect(radio2).toHaveAttribute("value", "b");
    expect(radio3).toHaveAttribute("value", "c");
    expect(radio4).toHaveAttribute("value", "d");
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();
  });

  it("should support creating a required radio group", () => {
    const onInvalid = jest.fn();
    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({
        name: "example",
        required: true,
        onInvalid,
      });

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    const { getByRole, container } = render(<Test />);
    expect(onInvalid).not.toHaveBeenCalled();

    const submit = getByRole("button", { name: "Submit" });
    const radio1 = getByRole("radio", { name: "First" });

    fireEvent.click(submit);

    expect(onInvalid).toHaveBeenCalledTimes(4);
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(container).toMatchSnapshot();
  });

  it("should support a default value and inferring the valid types from that default value", () => {
    type ExampleValue = "a" | "b" | "c" | "d";

    const onChange = jest.fn();
    const defaultValue: ExampleValue = "a";

    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({
        name: "example",
        onChange,
        defaultValue,
      });

      // @ts-expect-error
      getRadioProps("invalid");

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
        </Form>
      );
    }

    const { getByRole } = render(<Test />);

    const radio1 = getByRole("radio", { name: "First" });
    const radio2 = getByRole("radio", { name: "Second" });
    expect(onChange).not.toHaveBeenCalled();
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    fireEvent.click(radio1);
    expect(onChange).not.toHaveBeenCalled();
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    fireEvent.click(radio2);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it("should support resetting to the default value", () => {
    function Test(): ReactElement {
      const { getRadioProps, reset } = useRadioGroup({
        name: "example",
        defaultValue: () => "c",
      });

      return (
        <Form onReset={reset}>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
          <Button type="reset">Reset</Button>
        </Form>
      );
    }

    const { getByRole } = render(<Test />);

    const radio1 = getByRole("radio", { name: "First" });
    const radio2 = getByRole("radio", { name: "Second" });
    const radio3 = getByRole("radio", { name: "Third" });
    const radio4 = getByRole("radio", { name: "Forth" });
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(getByRole("button", { name: "Reset" }));
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();
  });

  it("should support rendering within a menu", () => {
    type Value = 1 | 2 | 3 | 4;

    function Test() {
      const { getRadioProps } = useRadioGroup<Value>({
        menu: true,
        defaultValue: 3,
      });

      return (
        <DropdownMenu buttonChildren="Toggle">
          <MenuItemRadio {...getRadioProps(1)}>First</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(2)}>Second</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(3)}>Third</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(4)}>Forth</MenuItemRadio>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />, { wrapper: AppSizeProvider });

    fireEvent.click(getByRole("button", { name: "Toggle" }));
    expect(getByRole("menu")).toMatchSnapshot();

    const radio1 = getByRole("menuitemradio", { name: "First" });
    const radio2 = getByRole("menuitemradio", { name: "Second" });
    const radio3 = getByRole("menuitemradio", { name: "Third" });
    const radio4 = getByRole("menuitemradio", { name: "Forth" });
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
  });
});
