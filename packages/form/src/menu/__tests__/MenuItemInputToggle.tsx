import React, { useState } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { DropdownMenu } from "@react-md/menu";

import {
  BaseMenuItemInputToggleProps,
  MenuItemInputToggle,
} from "../MenuItemInputToggle";

function Test({
  iconAfter,
  addon,
  addonType,
  addonPosition,
  onClick,
}: Partial<BaseMenuItemInputToggleProps>) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <DropdownMenu
      id="menu-id"
      items={[
        <MenuItemInputToggle
          key="checkbox-1"
          id="menu-id-1"
          type="checkbox"
          checked={checkboxChecked}
          onCheckedChange={(nextChecked) => setCheckboxChecked(nextChecked)}
          onClick={onClick}
          iconAfter={iconAfter}
          addon={addon}
          addonType={addonType}
          addonPosition={addonPosition}
        >
          Checkbox
        </MenuItemInputToggle>,
        <div role="group" aria-label="Radio Group" key="radio">
          <MenuItemInputToggle
            type="radio"
            id="menu-id-2"
            onClick={onClick}
            checked={selectedIndex === 0}
            onCheckedChange={() => {
              setSelectedIndex(0);
            }}
            iconAfter={iconAfter}
            addon={addon}
            addonType={addonType}
            addonPosition={addonPosition}
          >
            Radio 1
          </MenuItemInputToggle>
          <MenuItemInputToggle
            type="radio"
            id="menu-id-3"
            onClick={onClick}
            checked={selectedIndex === 1}
            onCheckedChange={() => {
              setSelectedIndex(1);
            }}
            iconAfter={iconAfter}
            addon={addon}
            addonType={addonType}
            addonPosition={addonPosition}
          >
            Radio 2
          </MenuItemInputToggle>
        </div>,
        <MenuItemInputToggle
          key="switch"
          type="switch"
          id="menu-id-4"
          checked={switchChecked}
          onCheckedChange={(nextChecked) => setSwitchChecked(nextChecked)}
          onClick={onClick}
          iconAfter={iconAfter}
          addon={addon}
          addonType={addonType}
          addonPosition={addonPosition}
        >
          Switch
        </MenuItemInputToggle>,
      ]}
    >
      Button
    </DropdownMenu>
  );
}

describe("MenuItemInputToggle", () => {
  it("should render correctly", () => {
    const { getByRole, rerender } = render(<Test />);
    const button = getByRole("button", { name: "Button" });
    fireEvent.click(button);

    let checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    let radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    let radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    let switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(checkbox).toMatchSnapshot();
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(radio1).toMatchSnapshot();
    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toMatchSnapshot();
    expect(radio2).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toMatchSnapshot();
    expect(switchEl).toHaveAttribute("aria-checked", "false");

    fireEvent.click(checkbox);
    waitFor(() => expect(checkbox).not.toBeInTheDocument());

    fireEvent.click(button);
    checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(checkbox).toMatchSnapshot();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(radio1).toMatchSnapshot();
    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toMatchSnapshot();
    expect(radio2).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toMatchSnapshot();
    expect(switchEl).toHaveAttribute("aria-checked", "false");

    rerender(<Test iconAfter />);
    fireEvent.click(button);
    checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(checkbox).toMatchSnapshot();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(radio1).toMatchSnapshot();
    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toMatchSnapshot();
    expect(radio2).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toMatchSnapshot();
    expect(switchEl).toHaveAttribute("aria-checked", "false");

    rerender(
      <Test
        addon={<span data-testid="addon" />}
        addonType="media"
        addonPosition="bottom"
      />
    );
    fireEvent.click(button);
    checkbox = getByRole("menuitemcheckbox", { name: "Checkbox" });
    radio1 = getByRole("menuitemradio", { name: "Radio 1" });
    radio2 = getByRole("menuitemradio", { name: "Radio 2" });
    switchEl = getByRole("menuitemcheckbox", { name: "Switch" });
    expect(checkbox).toMatchSnapshot();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(radio1).toMatchSnapshot();
    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toMatchSnapshot();
    expect(radio2).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toMatchSnapshot();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });
});
