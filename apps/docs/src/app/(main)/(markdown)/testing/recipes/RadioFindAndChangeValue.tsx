import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { Form } from "@react-md/core/form/Form";
import { Radio } from "@react-md/core/form/Radio";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";

function Test() {
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

describe("Test", () => {
  it("should be able to change value", async () => {
    const user = userEvent.setup();
    render(<Test />);
    const radio1 = screen.getByRole("radio", { name: "First" });
    const radio2 = screen.getByRole("radio", { name: "Second" });
    const radio3 = screen.getByRole("radio", { name: "Third" });
    const radio4 = screen.getByRole("radio", { name: "Forth" });

    expect(radio1).toHaveAttribute("value", "a");
    expect(radio2).toHaveAttribute("value", "b");
    expect(radio3).toHaveAttribute("value", "c");
    expect(radio4).toHaveAttribute("value", "d");
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();

    await user.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();

    await user.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();
  });
});
`;

export default function RadioFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
