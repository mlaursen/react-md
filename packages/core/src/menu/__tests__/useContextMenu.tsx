import { describe, expect, it } from "@jest/globals";
import { type ReactElement } from "react";

import { fireEvent, rmdRender, screen } from "../../test-utils/index.js";
import { Menu } from "../Menu.js";
import { MenuItem } from "../MenuItem.js";
import { useContextMenu } from "../useContextMenu.js";

function Test(): ReactElement {
  const { menuProps, onContextMenu } = useContextMenu();
  return (
    <>
      <label>
        Example
        <textarea onContextMenu={onContextMenu} />
      </label>
      <Menu {...menuProps}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
    </>
  );
}

describe("useContextMenu", () => {
  // I should add some real tests later...
  it("should work as expected", async () => {
    rmdRender(<Test />);
    const textarea = screen.getByRole("textbox", { name: "Example" });

    fireEvent.contextMenu(textarea, {
      clientX: 300,
      clientY: 600,
    });

    const menu = await screen.findByRole("menu", { name: "Context Menu" });
    // mostly verifying that the useFixedPositioning allows for the initialX and
    // initialY set by clientX and clientY
    expect(menu).toMatchSnapshot();
  });
});
