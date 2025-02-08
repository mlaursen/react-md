import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItemSwitch } from "@react-md/core/menu/MenuItemSwitch";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";
import { useState } from "react";

function Test() {
  const [checked, setChecked] = useState(false);
  return (
    <DropdownMenu buttonChildren="Toggle">
      <MenuItemSwitch
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
      >
        Mute
      </MenuItemSwitch>
    </DropdownMenu>
  );
}

describe("Test", () => {
  it("should be able to change the checked state", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const toggle = screen.getByRole("button", { name: "Toggle" });
    await user.click(toggle);

    const mute = screen.getByRole("menuitemcheckbox", { name: "Mute" });
    expect(mute).not.toBeChecked();

    await user.click(mute);
    // the menu has closed
    expect(mute).not.toBeInTheDocument();

    await user.click(toggle);
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Mute" })
    ).toBeChecked();
  });
});
`;

export default function MenuItemFileSwitch(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
