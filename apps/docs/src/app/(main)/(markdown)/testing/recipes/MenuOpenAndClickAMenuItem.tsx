import { type ReactElement } from "react";

import TestFrameworkCodeBlock from "../TestFrameworkCodeBlock.js";

const DEFAULT_CODE = `
import { expect, it, {LOCAL} } from "{FRAMEWORK}";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { rmdRender } from "@react-md/core/test-utils";

const handleClick1 = {LOCAL}.fn();
const handleClick2 = {LOCAL}.fn();

function Test() {
  return (
    <DropdownMenu buttonChildren="Menu Toggle">
      <MenuItem onClick={handleClick1}>First Item</MenuItem>
      <MenuItem onClick={handleClick2}>Second Item</MenuItem>
    </DropdownMenu>
  );
}

describe("Test", () => {
  it("should be able to open the menu and trigger actions", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const menuToggle = screen.getByRole("button", { name: "Menu Toggle" });
    expect(() => screen.getByRole("menu")).toThrow();

    await user.click(menuToggle);
    // this isn't really required, but shows how you can find the menu
    // the name defaults to the button label, but will reflect the \`aria-label\`
    // or \`aria-labelledby\` prop if it was provided
    expect(() =>
      screen.getByRole("menu", { name: "Menu Toggle" })
    ).not.toThrow();

    await user.click(screen.getByRole("menuitem", { name: "First Item" }));
    expect(handleClick1).toHaveBeenCalledTimes(1);
    // menu no longer is visible
    expect(() => screen.getByRole("menu")).toThrow();

    const menuToggle = screen.getByRole("button", { name: "Menu Toggle" });

    await user.click(screen.getByRole("menuitem", { name: "Second Item" }));
    expect(handleClick2).toHaveBeenCalledTimes(1);
  });
});
`;

export default function MenuOpenAndClickAMenuItem(): ReactElement {
  return (
    <TestFrameworkCodeBlock
      code={{
        jest: DEFAULT_CODE.replaceAll(
          "{FRAMEWORK}",
          "@jest/globals"
        ).replaceAll("{LOCAL}", "jest"),
        vitest: DEFAULT_CODE.replaceAll("{FRAMEWORK}", "vitest").replaceAll(
          "{LOCAL}",
          "vi"
        ),
      }}
      lang="tsx"
    />
  );
}
