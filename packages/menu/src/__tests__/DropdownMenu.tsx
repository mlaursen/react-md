import { Configuration } from "@react-md/layout";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import type { RenderResult } from "@testing-library/react";
import {
  fireEvent,
  render as baseRender,
  waitFor,
} from "@testing-library/react";
import type {
  FC,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";
import { MenuItemLink } from "../MenuItemLink";
import type { BaseMenuButtonProps } from "../types";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

describe("DropdownMenu", () => {
  it("should render as a Button by default and handle visibility correctly", async () => {
    interface TestProps {
      onItem1Click?: MouseEventHandler<HTMLLIElement>;
      onItem2Click?: MouseEventHandler<HTMLLIElement>;
      onItem3Click?: MouseEventHandler<HTMLLIElement>;
    }

    function Test({
      onItem1Click,
      onItem2Click,
      onItem3Click,
    }: TestProps): ReactElement {
      return (
        <>
          <div data-testid="outside" />
          <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown">
            <MenuItem onClick={onItem1Click}>Item 1</MenuItem>
            <MenuItem onClick={onItem2Click}>Item 2</MenuItem>
            <MenuItem onClick={onItem3Click}>Item 3</MenuItem>
          </DropdownMenu>
        </>
      );
    }

    const onItem1Click = jest.fn();
    const onItem2Click = jest.fn();
    const onItem3Click = jest.fn();
    const { getByRole, getByTestId } = render(
      <Test
        onItem1Click={onItem1Click}
        onItem2Click={onItem2Click}
        onItem3Click={onItem3Click}
      />
    );
    const button = getByRole("button", { name: "Dropdown" });
    expect(button.querySelector(".rmd-icon")).not.toBeNull();
    expect(button).toMatchSnapshot();

    expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();

    fireEvent.click(button);
    // it gains the "Dropdown" name because it should have
    // `aria-labelledby="dropdown-menu"`
    expect(() => getByRole("menu", { name: "Dropdown" })).not.toThrow();

    fireEvent.click(getByTestId("outside"));
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();
    });

    fireEvent.click(button);
    expect(() => getByRole("menu", { name: "Dropdown" })).not.toThrow();
    expect(onItem1Click).not.toBeCalled();
    expect(onItem2Click).not.toBeCalled();
    expect(onItem3Click).not.toBeCalled();

    fireEvent.click(getByRole("menuitem", { name: "Item 2" }));
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();
    });

    expect(onItem1Click).not.toBeCalled();
    expect(onItem2Click).toBeCalledTimes(1);
    expect(onItem3Click).not.toBeCalled();
  });

  it("should allow button specific props to be provided", () => {
    function Test({
      buttonChildren = "Dropdown",
      ...props
    }: Omit<BaseMenuButtonProps, "id"> & {
      buttonChildren?: ReactNode;
    }): ReactElement {
      return (
        <DropdownMenu
          {...props}
          id="dropdown-menu"
          buttonChildren={buttonChildren}
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </DropdownMenu>
      );
    }

    const { container, getByRole, rerender } = render(
      <Test
        aria-label="Options"
        disabled
        buttonType="icon"
        disableDropdownIcon
        buttonChildren={<MoreVertSVGIcon />}
      />
    );

    const dropdown = getByRole("button", { name: "Options" });
    expect(container).toMatchSnapshot();

    fireEvent.click(dropdown);
    expect(() => getByRole("menu", { name: "Options" })).toThrow();

    rerender(<Test themeType="contained" theme="secondary" />);
    expect(container).toMatchSnapshot();

    rerender(
      <Test
        iconAfter={false}
        iconRotatorProps={{ className: "custom-rotator-class" }}
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<Test textIconSpacingProps={{ stacked: true }} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render as submenu when it is a child of another menu", async () => {
    const onItem1Click = jest.fn();
    const onSubItemClick = jest.fn();
    function Test(): ReactElement {
      return (
        <DropdownMenu id="main-menu" buttonChildren="Dropdown">
          <MenuItem onClick={onItem1Click}>Item 1</MenuItem>
          <DropdownMenu id="sub-menu" buttonChildren="Submenu">
            <MenuItem onClick={onSubItemClick}>Submenu item</MenuItem>
          </DropdownMenu>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    expect(() => getByRole("menu", { name: "Submenu" })).toThrow();
    expect(() => getByRole("menuitem", { name: "Item 1" })).not.toThrow();
    expect(() => getByRole("menuitem", { name: "Submenu" })).not.toThrow();

    fireEvent.click(getByRole("menuitem", { name: "Submenu" }));
    expect(() => getByRole("menuitem", { name: "Item 1" })).not.toThrow();
    expect(() => getByRole("menuitem", { name: "Submenu item" })).not.toThrow();
    expect(onItem1Click).not.toBeCalled();
    expect(onSubItemClick).not.toBeCalled();

    fireEvent.click(getByRole("menuitem", { name: "Submenu item" }));
    // all menus should close when a submenu is clicked
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();
      expect(() => getByRole("menu", { name: "Submenu" })).toThrow();
    });
    expect(onItem1Click).not.toBeCalled();
    expect(onSubItemClick).toBeCalledTimes(1);

    fireEvent.click(dropdown);
    expect(() => getByRole("menu", { name: "Submenu" })).toThrow();
    expect(() => getByRole("menuitem", { name: "Item 1" })).not.toThrow();
    expect(() => getByRole("menuitem", { name: "Submenu" })).not.toThrow();

    fireEvent.click(getByRole("menuitem", { name: "Item 1" }));
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();
      expect(() => getByRole("menu", { name: "Submenu" })).toThrow();
    });
    expect(onItem1Click).toBeCalledTimes(1);
    expect(onSubItemClick).toBeCalledTimes(1);
  });

  it("should work correctly when the temporary prop is set to false", () => {
    function Test(): ReactElement {
      return (
        <>
          <div data-testid="outside" />
          <DropdownMenu
            id="dropdown-menu"
            buttonChildren="Dropdown"
            temporary={false}
            menuLabel="Menu"
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </DropdownMenu>
        </>
      );
    }
    const { getByRole } = render(<Test />);
    expect(document.body).toMatchSnapshot();

    const dropdown = getByRole("button", { name: "Dropdown" });
    // there is no name while hidden apparently?
    const menu = getByRole("menu", { hidden: true });

    fireEvent.click(dropdown);
    expect(menu).not.toHaveAttribute("hidden");
    expect(getByRole("menu", { name: "Menu" })).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it("should not close the menu if the list or menu element is clicked instead of one of the menu items", async () => {
    function Test(): ReactElement {
      return (
        <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });

    const list = document.querySelector(".rmd-list");
    if (!list) {
      throw new Error();
    }

    fireEvent.click(list);
    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });

  it("should not close the menu if the menu's onClick event handler calls event.stopPropagation()", () => {
    function Test(): ReactElement {
      return (
        <DropdownMenu
          id="dropdown-menu"
          buttonChildren="Dropdown"
          menuProps={{
            onClick: (event) => event.stopPropagation(),
          }}
          timeout={0}
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    fireEvent.click(getByRole("menuitem", { name: "Item 1" }));
    expect(menu).toBeInTheDocument();
  });

  it("should close the menu when the Tab or escape keys are pressed", () => {
    function Test(): ReactElement {
      return (
        <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown" timeout={0}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <DropdownMenu
            id="dropdown-submenu"
            buttonChildren="Submenu"
            timeout={0}
          >
            <MenuItem>Subitem 1</MenuItem>
            <MenuItem>Subitem 2</MenuItem>
            <MenuItem>Subitem 3</MenuItem>
          </DropdownMenu>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    let menu = getByRole("menu", { name: "Dropdown" });

    fireEvent.keyDown(menu, { key: "Tab" });
    expect(menu).not.toBeInTheDocument();

    fireEvent.click(dropdown);
    menu = getByRole("menu", { name: "Dropdown" });
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(menu).not.toBeInTheDocument();

    fireEvent.click(dropdown);
    menu = getByRole("menu", { name: "Dropdown" });
    fireEvent.click(getByRole("menuitem", { name: "Submenu" }));
    const submenu = getByRole("menu", { name: "Submenu" });
    fireEvent.keyDown(submenu, { key: "Tab" });
    expect(submenu).not.toBeInTheDocument();
    expect(menu).not.toBeInTheDocument();
  });

  it("should not close the menu if the menu's onKeyDown event handler calls event.stopPropagation()", () => {
    function Test(): ReactElement {
      return (
        <DropdownMenu
          id="dropdown-menu"
          buttonChildren="Dropdown"
          timeout={0}
          menuProps={{ onKeyDown: (event) => event.stopPropagation() }}
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });

    fireEvent.keyDown(menu, { key: "Tab" });
    expect(menu).toBeInTheDocument();
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(menu).toBeInTheDocument();
  });

  it("should not open the menu if the button's onClick event handler calls event.stopPropagation()", () => {
    function Test(): ReactElement {
      return (
        <DropdownMenu
          id="dropdown-menu"
          buttonChildren="Dropdown"
          timeout={0}
          // have to typecast since it's really MouseEvent<HTMLButtonElement | HTMLLIElement>
          // so Typescript thinks it's `any`
          onClick={(event: MouseEvent<HTMLButtonElement>) =>
            event.stopPropagation()
          }
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </DropdownMenu>
      );
    }

    const { getByRole } = render(<Test />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    expect(() => getByRole("menu", { name: "Dropdown" })).toThrow();
  });

  describe("keyboard movement", () => {
    function Test({ horizontal }: { horizontal?: boolean }): ReactElement {
      return (
        <DropdownMenu
          id="main-menu"
          buttonChildren="Dropdown"
          horizontal={horizontal}
        >
          <MenuItem>An Item</MenuItem>
          <DropdownMenu id="sub-menu" buttonChildren="Submenu">
            <MenuItem>Subitem 1</MenuItem>
            <MenuItem>Subitem 2</MenuItem>
            <MenuItem>Subitem 3</MenuItem>
          </DropdownMenu>
          <MenuItemLink href="#">Link</MenuItemLink>
          <MenuItem disabled>Disabled Item</MenuItem>
          <MenuItem>Delta</MenuItem>
        </DropdownMenu>
      );
    }

    it("should work correctly for vertical menus", async () => {
      const { getByRole } = render(<Test />);
      fireEvent.click(getByRole("button", { name: "Dropdown" }));

      // since the app isn't in keyboard mode, the first menuitem will not gain
      // focus by default. I don't know how to keyboard click either...
      const menu = getByRole("menu", { name: "Dropdown" });
      await waitFor(() => {
        expect(document.activeElement).toBe(menu);
      });

      fireEvent.keyDown(menu, { key: "ArrowDown" });
      const item1 = getByRole("menuitem", { name: "An Item" });
      const item2 = getByRole("menuitem", { name: "Submenu" });
      const item3 = getByRole("menuitem", { name: "Link" });
      const item4 = getByRole("menuitem", { name: "Disabled Item" });
      const item5 = getByRole("menuitem", { name: "Delta" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "D" });
      expect(document.activeElement).toBe(item4);

      fireEvent.keyDown(item4, { key: "D" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "Home" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "ArrowUp" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "ArrowDown" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "ArrowDown" });
      expect(document.activeElement).toBe(item2);

      fireEvent.keyDown(item2, { key: "ArrowUp" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "End" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "A" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "L" });
      expect(document.activeElement).toBe(item3);

      fireEvent.keyDown(item3, { key: "ArrowUp" });
      expect(document.activeElement).toBe(item2);

      fireEvent.keyDown(item2, { key: "ArrowRight" });
      await waitFor(() => {
        expect(document.activeElement).toBe(
          getByRole("menuitem", { name: "Subitem 1" })
        );
      });

      fireEvent.keyDown(getByRole("menuitem", { name: "Subitem 1" }), {
        key: "ArrowLeft",
      });
      await waitFor(() => {
        expect(document.activeElement).toBe(item2);
      });

      // does nothing
      fireEvent.keyDown(item2, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(item2);
    });

    it("should work correctly for horizontal menus", async () => {
      const { getByRole } = render(<Test horizontal />);
      fireEvent.click(getByRole("button", { name: "Dropdown" }));

      // since the app isn't in keyboard mode, the first menuitem will not gain
      // focus by default. I don't know how to keyboard click either...
      const menu = getByRole("menu", { name: "Dropdown" });
      await waitFor(() => {
        expect(document.activeElement).toBe(menu);
      });

      fireEvent.keyDown(menu, { key: "ArrowRight" });
      const item1 = getByRole("menuitem", { name: "An Item" });
      const item2 = getByRole("menuitem", { name: "Submenu" });
      const item3 = getByRole("menuitem", { name: "Link" });
      const item4 = getByRole("menuitem", { name: "Disabled Item" });
      const item5 = getByRole("menuitem", { name: "Delta" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "D" });
      expect(document.activeElement).toBe(item4);

      fireEvent.keyDown(item4, { key: "D" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "Home" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "ArrowRight" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "ArrowRight" });
      expect(document.activeElement).toBe(item2);

      fireEvent.keyDown(item2, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "End" });
      expect(document.activeElement).toBe(item5);

      fireEvent.keyDown(item5, { key: "A" });
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: "L" });
      expect(document.activeElement).toBe(item3);

      fireEvent.keyDown(item3, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(item2);

      fireEvent.keyDown(item2, { key: "ArrowDown" });
      await waitFor(() => {
        expect(document.activeElement).toBe(
          getByRole("menuitem", { name: "Subitem 1" })
        );
      });

      fireEvent.keyDown(getByRole("menuitem", { name: "Subitem 1" }), {
        key: "ArrowUp",
      });
      await waitFor(() => {
        expect(document.activeElement).toBe(item2);
      });

      // does nothing
      fireEvent.keyDown(item2, { key: "ArrowUp" });
      expect(document.activeElement).toBe(item2);
    });

    it("should not open the submenu when the ArrowRight key is pressed if the menuitem is disabled or the onKeyDown event handler calls event.stopPropagation()", () => {
      function Test(): ReactElement {
        return (
          <DropdownMenu
            id="dropdown-menu"
            buttonChildren="Dropdown"
            timeout={0}
          >
            <MenuItem>Item 1</MenuItem>
            <DropdownMenu
              id="submenu-1"
              buttonChildren="Submenu 1"
              timeout={0}
              disabled
            >
              <MenuItem>Submenu Item 1-1</MenuItem>
              <MenuItem>Submenu Item 1-2</MenuItem>
              <MenuItem>Submenu Item 1-3</MenuItem>
            </DropdownMenu>
            <DropdownMenu
              id="submenu-2"
              buttonChildren="Submenu 2"
              timeout={0}
              onKeyDown={(event: KeyboardEvent<HTMLLIElement>) =>
                event.stopPropagation()
              }
            >
              <MenuItem>Submenu Item 2-1</MenuItem>
              <MenuItem>Submenu Item 2-2</MenuItem>
              <MenuItem>Submenu Item 2-3</MenuItem>
            </DropdownMenu>
          </DropdownMenu>
        );
      }

      const { getByRole } = render(<Test />);
      const dropdown = getByRole("button", { name: "Dropdown" });
      fireEvent.click(dropdown);

      const menu = getByRole("menu", { name: "Dropdown" });

      fireEvent.keyDown(getByRole("menuitem", { name: "Submenu 1" }), {
        key: "ArrowRight",
      });
      expect(() => getByRole("menu", { name: "Submenu 1" })).toThrow();
      expect(menu).toBeInTheDocument();

      fireEvent.keyDown(getByRole("menuitem", { name: "Submenu 2" }), {
        key: "ArrowRight",
      });
      expect(() => getByRole("menu", { name: "Submenu 2" })).toThrow();
      expect(menu).toBeInTheDocument();
    });
  });
});
