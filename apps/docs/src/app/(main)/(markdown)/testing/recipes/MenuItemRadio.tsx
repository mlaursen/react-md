import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItemRadio } from "@react-md/core/menu/MenuItemRadio";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

const decorations = ["none", "underline", "overline", "strike-through"];

function Test() {
  const { getRadioProps } = useRadioGroup({
    menu: true,
    defaultValue: "none",
  });

  return (
    <DropdownMenu buttonChildren="Radio">
      {decorations.map((decoration) => (
        <MenuItemRadio key={decoration} {...getRadioProps(decoration)}>
          {decoration}
        </MenuItemRadio>
      ))}
    </DropdownMenu>
  );
}

describe("Test", () => {
  it("should be able to trigger the change event", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const toggle = screen.getByRole("button", { name: "Dropdown Menu" });
    await user.click(toggle);

    let none = screen.getByRole("menuitemradio", { name: "none" });
    let underline = screen.getByRole("menuitemradio", { name: "underline" });
    let overline = screen.getByRole("menuitemradio", { name: "overline" });
    let strikeThrough = screen.getByRole("menuitemradio", {
      name: "strike-through",
    });

    expect(none).toBeChecked();
    expect(underline).not.toBeChecked();
    expect(overline).not.toBeChecked();
    expect(strikeThrough).not.toBeChecked();

    await user.click(overline);
    // the menu has closed
    expect(none).not.toBeInTheDocument();
    expect(underline).not.toBeInTheDocument();
    expect(overline).not.toBeInTheDocument();
    expect(strikeThrough).not.toBeInTheDocument();

    await user.click(toggle);

    // can also just find them using the \`getAllByRole\`
    [none, underline, overline, strikeThrough] =
      screen.getAllByRole("menuitemradio");

    expect(none).not.toBeChecked();
    expect(underline).not.toBeChecked();
    expect(overline).toBeChecked();
    expect(strikeThrough).not.toBeChecked();
  });
});
`;

export default function MenuItemFileRadio(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
