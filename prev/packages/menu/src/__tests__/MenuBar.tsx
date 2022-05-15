import { Configuration } from "@react-md/layout";
import type { RenderResult } from "@testing-library/react";
import {
  act,
  fireEvent,
  render as baseRender,
  waitFor,
} from "@testing-library/react";
import type { FC, ReactElement, MouseEventHandler } from "react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuBar } from "../MenuBar";
import { MenuItem } from "../MenuItem";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

interface TestProps {
  hoverTimeout?: number;
  onMouseEnter?: MouseEventHandler<HTMLLIElement>;
  onMouseLeave?: MouseEventHandler<HTMLLIElement>;
  disableTextAlign?: boolean;
}

function Test({
  hoverTimeout,
  onMouseEnter,
  onMouseLeave,
  disableTextAlign,
}: TestProps): ReactElement {
  return (
    <MenuBar aria-label="Example" hoverTimeout={hoverTimeout}>
      <DropdownMenu
        id="menu-1"
        buttonChildren="Font"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <MenuItem>Roboto</MenuItem>
        <MenuItem>Sans-serif</MenuItem>
        <MenuItem>Monospace</MenuItem>
      </DropdownMenu>
      <DropdownMenu id="menu-2" buttonChildren="Style">
        <MenuItem>Bold</MenuItem>
        <MenuItem>Italic</MenuItem>
      </DropdownMenu>
      <DropdownMenu
        id="menu-3"
        buttonChildren="Text Align"
        disabled={disableTextAlign}
      >
        <MenuItem>Left</MenuItem>
        <MenuItem>Center</MenuItem>
        <MenuItem>Right</MenuItem>
        <MenuItem>Justify</MenuItem>
      </DropdownMenu>
      <DropdownMenu id="menu-4" buttonChildren="Size">
        <MenuItem>Normal</MenuItem>
        <MenuItem>Small</MenuItem>
        <DropdownMenu id="submenu-1" buttonChildren="Submenu">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </DropdownMenu>
      </DropdownMenu>
    </MenuBar>
  );
}

describe("MenuBar", () => {
  it("should allow keyboard movement to update focus and tabindex while the menus are closed", () => {
    const { getByRole } = render(<Test />);
    const menubar = getByRole("menubar", { name: "Example" });
    const item1 = getByRole("menuitem", { name: "Font" });
    const item2 = getByRole("menuitem", { name: "Style" });
    const item3 = getByRole("menuitem", { name: "Text Align" });
    const item4 = getByRole("menuitem", { name: "Size" });

    expect(menubar).toHaveAttribute("tabindex", "0");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");

    // move into keyboard mode
    fireEvent.keyDown(document.body, { key: "Shift" });

    fireEvent.focus(menubar);
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "0");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item1);

    fireEvent.keyDown(item1, { key: "S" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "0");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item2);

    fireEvent.keyDown(item2, { key: "S" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "0");
    expect(document.activeElement).toBe(item4);

    fireEvent.keyDown(item4, { key: "ArrowLeft" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "0");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item3);

    fireEvent.keyDown(item3, { key: "Home" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "0");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item1);

    fireEvent.keyDown(item1, { key: "ArrowRight" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "0");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item2);

    fireEvent.keyDown(item2, { key: "End" });
    expect(document.activeElement).toBe(item4);
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "0");

    // Loops
    fireEvent.keyDown(item4, { key: "ArrowRight" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "0");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item1);

    // Loops
    fireEvent.keyDown(item1, { key: "ArrowLeft" });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "0");
    expect(document.activeElement).toBe(item4);
  });

  it("should allow keyboard movement to change the visible menu with the ArrowLeft and ArrowRight keys", async () => {
    const { getByRole } = render(<Test />);
    const menubar = getByRole("menubar", { name: "Example" });
    const item1 = getByRole("menuitem", { name: "Font" });
    const item2 = getByRole("menuitem", { name: "Style" });
    const item3 = getByRole("menuitem", { name: "Text Align" });
    const item4 = getByRole("menuitem", { name: "Size" });

    // move into keyboard mode
    fireEvent.keyDown(document.body, { key: "Shift" });
    fireEvent.focus(menubar);
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "0");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(item1);

    fireEvent.click(item1);
    expect(() => getByRole("menu", { name: "Font" })).not.toThrow();

    // have to wait since it only focuses once the transition completes
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Roboto" })
      );
    });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "0");
    expect(item2).toHaveAttribute("tabindex", "-1");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");

    const subitem1 = getByRole("menuitem", { name: "Roboto" });
    const subitem2 = getByRole("menuitem", { name: "Sans-serif" });
    const subitem3 = getByRole("menuitem", { name: "Monospace" });

    fireEvent.keyDown(subitem1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(subitem2);

    fireEvent.keyDown(subitem2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(subitem1);

    fireEvent.keyDown(subitem1, { key: "End" });
    expect(document.activeElement).toBe(subitem3);

    fireEvent.keyDown(subitem2, { key: "Home" });
    expect(document.activeElement).toBe(subitem1);

    // Move to the next menu
    fireEvent.keyDown(subitem1, { key: "ArrowRight" });
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Font" })).toThrow();
      expect(() => getByRole("menu", { name: "Style" })).not.toThrow();
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Bold" })
      );
    });
    expect(menubar).toHaveAttribute("tabindex", "-1");
    expect(item1).toHaveAttribute("tabindex", "-1");
    expect(item2).toHaveAttribute("tabindex", "0");
    expect(item3).toHaveAttribute("tabindex", "-1");
    expect(item4).toHaveAttribute("tabindex", "-1");
  });

  it("should be able to open a menu with the ArrowDown key", async () => {
    const { getByRole } = render(<Test />);
    const item1 = getByRole("menuitem", { name: "Font" });
    fireEvent.keyDown(item1, { key: "ArrowDown" });
    const menu = getByRole("menu", { name: "Font" });
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(getByRole("menuitem", { name: "Roboto" }), {
      key: "Escape",
    });
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });
  });

  // These tests would be better written in Cypress...
  describe("hover mode", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it("should allow for a click-first hover mode", () => {
      const { getByRole } = render(<Test />);
      const item1 = getByRole("menuitem", { name: "Font" });
      const item2 = getByRole("menuitem", { name: "Style" });

      fireEvent.mouseEnter(item1);
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("menu", { name: "Font" })).toThrow();

      fireEvent.click(item1);
      const fontMenu = getByRole("menu", { name: "Font" });
      act(() => {
        jest.runAllTimers();
      });
      expect(document.activeElement).toBe(fontMenu);
      expect(document.body).toMatchSnapshot();

      fireEvent.mouseLeave(fontMenu);
      act(() => {
        jest.runAllTimers();
      });
      expect(fontMenu).toBeInTheDocument();
      expect(document.body).toMatchSnapshot();

      fireEvent.mouseEnter(item2);
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(fontMenu).not.toBeInTheDocument();
      expect(getByRole("menu", { name: "Style" })).toBeInTheDocument();
      expect(document.body).toMatchSnapshot();

      act(() => {
        jest.runAllTimers();
      });
      expect(document.body).toMatchSnapshot();
    });

    it("should allow for an immediate hover mode by setting the hoverTimeout to 0", async () => {
      const { getByRole } = render(<Test hoverTimeout={0} />);
      const item1 = getByRole("menuitem", { name: "Font" });
      const item4 = getByRole("menuitem", { name: "Size" });

      fireEvent.mouseEnter(item1);
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(() => getByRole("menu", { name: "Font" })).not.toThrow();
      expect(document.body).toMatchSnapshot();

      act(() => {
        jest.runAllTimers();
      });
      expect(document.body).toMatchSnapshot();

      fireEvent.mouseEnter(item4);
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(() => getByRole("menu", { name: "Font" })).toThrow();
      expect(() => getByRole("menu", { name: "Size" })).not.toThrow();
      expect(document.body).toMatchSnapshot();

      act(() => {
        jest.runAllTimers();
      });
      expect(document.body).toMatchSnapshot();

      fireEvent.mouseEnter(getByRole("menuitem", { name: "Submenu" }));
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(() => getByRole("menu", { name: "Size" })).not.toThrow();
      expect(() => getByRole("menu", { name: "Submenu" })).not.toThrow();
      expect(document.body).toMatchSnapshot();

      act(() => {
        jest.runAllTimers();
      });
      expect(document.body).toMatchSnapshot();

      fireEvent.click(getByRole("menuitem", { name: "Item 3" }));
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("menu", { name: "Size" })).toThrow();
      expect(() => getByRole("menu", { name: "Submenu" })).toThrow();
      expect(document.body).toMatchSnapshot();
    });

    it("should not enable the hover mode if the menubutton calls event.stopPropagation() or is disabled", () => {
      const onMouseLeave = jest.fn();
      const { getByRole } = render(
        <Test
          onMouseEnter={(event) => event.stopPropagation()}
          onMouseLeave={onMouseLeave}
          disableTextAlign
        />
      );
      const item1 = getByRole("menuitem", { name: "Font" });
      const item3 = getByRole("menuitem", { name: "Text Align" });

      fireEvent.mouseEnter(item1);
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("menu", { name: "Font" })).toThrow();
      expect(onMouseLeave).not.toBeCalled();

      fireEvent.mouseLeave(item1);
      expect(onMouseLeave).toBeCalledTimes(1);

      fireEvent.mouseEnter(item3);
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("menu", { name: "Text Align" })).toThrow();
    });
  });
});
