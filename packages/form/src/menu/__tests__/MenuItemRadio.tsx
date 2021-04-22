import React, { useState } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { DropdownMenu } from "@react-md/menu";

import { MenuItemRadio } from "../MenuItemRadio";

describe("MenuItemRadio", () => {
  it("should update the state and close the menu once clicked", () => {
    function Test() {
      const [selectedIndex, setSelectedIndex] = useState(0);

      return (
        <DropdownMenu
          id="menu-id"
          items={[
            <div role="group" aria-label="Radio Group" key="group">
              <MenuItemRadio
                id="menu-id-1"
                checked={selectedIndex === 0}
                onCheckedChange={() => {
                  setSelectedIndex(0);
                }}
              >
                Radio 1
              </MenuItemRadio>
              <MenuItemRadio
                id="menu-id-2"
                checked={selectedIndex === 1}
                onCheckedChange={() => {
                  setSelectedIndex(1);
                }}
              >
                Radio 2
              </MenuItemRadio>
            </div>,
          ]}
        >
          Button
        </DropdownMenu>
      );
    }
    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });

    fireEvent.click(button);

    let radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    let radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toHaveAttribute("aria-checked", "false");
    expect(radio1).toMatchSnapshot();
    expect(radio2).toMatchSnapshot();

    fireEvent.click(radio2);
    waitFor(() => expect(radio1).not.toBeInTheDocument());

    fireEvent.click(button);
    radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    expect(radio1).toHaveAttribute("aria-checked", "false");
    expect(radio2).toHaveAttribute("aria-checked", "true");
    expect(radio1).toMatchSnapshot();
    expect(radio2).toMatchSnapshot();
  });
});
