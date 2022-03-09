import { Configuration } from "@react-md/layout";
import type { RenderResult } from "@testing-library/react";
import {
  fireEvent,
  render as baseRender,
  waitFor,
} from "@testing-library/react";
import type { FC, ReactElement } from "react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";
import type { MenuItemLinkProps } from "../MenuItemLink";
import { MenuItemLink } from "../MenuItemLink";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

function Test(props: MenuItemLinkProps): ReactElement {
  return (
    <>
      <h4 id="#heading">Heading</h4>
      <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown">
        <MenuItemLink href="#heading" {...props}>
          Link
        </MenuItemLink>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    </>
  );
}

describe("MenuItemLink", () => {
  it("should disable refocusing the DropdownMenu when clicked", async () => {
    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    let menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });

    const link = getByRole("menuitem", { name: "Link" });
    fireEvent.click(link);
    await waitFor(() => {
      expect(link).not.toBeInTheDocument();
    });

    expect(document.activeElement).not.toBe(dropdown);
    fireEvent.click(dropdown);
    menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });
    const item = getByRole("menuitem", { name: "Item" });
    fireEvent.click(item);
    await waitFor(() => {
      expect(item).not.toBeInTheDocument();
    });

    expect(document.activeElement).toBe(dropdown);
  });

  it("should pass props correctly", async () => {
    const { getByRole } = render(
      <Test
        liProps={{ style: { color: "red" } }}
        className="custom"
        tabIndex={0}
      />
    );
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });

    const link = getByRole("menuitem", { name: "Link" });
    expect(link).toMatchSnapshot();
  });
});
