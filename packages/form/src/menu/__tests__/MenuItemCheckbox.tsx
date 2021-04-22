import React, { useState } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { DropdownMenu } from "@react-md/menu";

import { MenuItemCheckbox } from "../MenuItemCheckbox";

describe("MenuItemCheckbox", () => {
  it("should update the state and close the menu once clicked", () => {
    function Test() {
      const [checked, setChecked] = useState(false);

      return (
        <DropdownMenu
          id="menu-id"
          items={[
            <MenuItemCheckbox
              key="item-1"
              id="menu-id-1"
              checked={checked}
              onCheckedChange={(nextChecked) => setChecked(nextChecked)}
            >
              Checkbox
            </MenuItemCheckbox>,
          ]}
        >
          Button
        </DropdownMenu>
      );
    }
    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });

    fireEvent.click(button);

    let checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toMatchSnapshot();

    fireEvent.click(checkbox);
    waitFor(() => expect(checkbox).not.toBeInTheDocument());

    fireEvent.click(button);
    checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toMatchSnapshot();
  });
});
