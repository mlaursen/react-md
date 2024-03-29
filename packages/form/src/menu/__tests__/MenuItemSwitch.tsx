import { useState } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { DropdownMenu } from "@react-md/menu";
import { AppSizeListener } from "@react-md/utils";

import { MenuItemSwitch } from "../MenuItemSwitch";

describe("MenuItemSwitch", () => {
  it("should update the state and close the menu once clicked", () => {
    function Test() {
      const [checked, setChecked] = useState(false);

      return (
        <AppSizeListener>
          <DropdownMenu id="menu-id" buttonChildren="Button">
            <MenuItemSwitch
              key="item-1"
              id="menu-id-1"
              checked={checked}
              onCheckedChange={(nextChecked) => setChecked(nextChecked)}
            >
              Switch
            </MenuItemSwitch>
          </DropdownMenu>
        </AppSizeListener>
      );
    }
    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });

    fireEvent.click(button);

    let switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(switchEl).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toMatchSnapshot();

    fireEvent.click(switchEl);
    waitFor(() => expect(switchEl).not.toBeInTheDocument());

    fireEvent.click(button);
    switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(switchEl).toHaveAttribute("aria-checked", "true");
    expect(switchEl).toMatchSnapshot();
  });
});
