import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { type MouseEventHandler, type ReactElement } from "react";

import {
  act,
  fireEvent,
  rmdRender,
  screen,
  userEvent,
  waitFor,
  within,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { DropdownMenu } from "../DropdownMenu.js";
import { MenuBar } from "../MenuBar.js";
import { MenuItem } from "../MenuItem.js";

interface TestProps {
  hoverTimeout?: number;
  onMouseEnter?: MouseEventHandler<HTMLLIElement | HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLLIElement | HTMLButtonElement>;
  disableTextAlign?: boolean;
}

function Test(props: TestProps): ReactElement {
  const { hoverTimeout, onMouseEnter, onMouseLeave, disableTextAlign } = props;

  return (
    <MenuBar aria-label="Example" hoverTimeout={hoverTimeout}>
      <DropdownMenu
        buttonChildren="Font"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <MenuItem>Roboto</MenuItem>
        <MenuItem>Sans-serif</MenuItem>
        <MenuItem>Monospace</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Style">
        <MenuItem>Bold</MenuItem>
        <MenuItem>Italic</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Text Align" disabled={disableTextAlign}>
        <MenuItem>Left</MenuItem>
        <MenuItem>Center</MenuItem>
        <MenuItem>Right</MenuItem>
        <MenuItem>Justify</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Size">
        <MenuItem>Normal</MenuItem>
        <MenuItem>Small</MenuItem>
        <DropdownMenu buttonChildren="Submenu">
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
  beforeEach(() => {
    jest.useRealTimers();
    TRANSITION_CONFIG.disabled = false;
  });

  it("should support a click-first hover mode behavior by default", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const menubar = screen.getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");
    expect(menubarItems).toHaveLength(4);
    expect(menubar).toMatchSnapshot();

    await user.hover(menubarItems[0]);
    expect(() => screen.getByRole("menu")).toThrow();

    await user.unhover(menubarItems[0]);
    expect(() => screen.getByRole("menu")).toThrow();

    await user.click(menubarItems[1]);
    await waitFor(() => {
      const menu = screen.getByRole("menu", { name: "Style" });
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });

    await user.hover(menubarItems[2]);
    await waitFor(() => {
      expect(() => screen.getByRole("menu", { name: "Style" })).toThrow();
    });
    await waitFor(() => {
      expect(() =>
        screen.getByRole("menu", { name: "Text Align" })
      ).not.toThrow();
    });

    await user.click(document.body);
    await waitFor(() => {
      expect(() => screen.getByRole("menu")).toThrow();
    });
  });

  it("should support immediate hover mode behavior by setting the hoverTimeout to 0", async () => {
    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} />);
    const item1 = screen.getByRole("menuitem", { name: "Font" });
    const item4 = screen.getByRole("menuitem", { name: "Size" });

    await user.hover(item1);
    // added timeouts to these since it might fail when running in watch mode
    // with a lot of tests
    await waitFor(
      () => {
        expect(() => screen.getByRole("menu", { name: "Font" })).not.toThrow();
      },
      { timeout: 10 }
    );
    await waitFor(() => {
      expect(screen.getByRole("menu", { name: "Font" })).not.toHaveClass(
        "rmd-scale-transition--enter"
      );
    });

    await user.hover(item4);
    await waitFor(
      () => {
        expect(() => screen.getByRole("menu", { name: "Size" })).not.toThrow();
      },
      { timeout: 10 }
    );
    await user.click(document.body);
    await waitFor(() => {
      expect(() => screen.getByRole("menu")).toThrow();
    });
  });

  it("should support a custom hover timeout to start the hover mode", () => {
    jest.useFakeTimers();
    rmdRender(<Test hoverTimeout={1000} />);

    const font = screen.getByRole("menuitem", { name: "Font" });
    const style = screen.getByRole("menuitem", { name: "Style" });
    fireEvent.mouseEnter(font);
    expect(() => screen.getByRole("menu")).toThrow();

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(() => screen.getByRole("menu")).toThrow();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(() => screen.getByRole("menu")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("menu")).not.toThrow();

    fireEvent.mouseLeave(font);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("menu")).not.toThrow();

    fireEvent.mouseEnter(style);
    expect(() => screen.getByRole("menu")).not.toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("menu")).not.toThrow();
    // animates into the new menu
    expect(() => screen.getByRole("menuitem", { name: "Bold" })).not.toThrow();
  });

  it("should open nested dropdown menus immediately on hover", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const menubar = screen.getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");

    await user.click(menubarItems[3]);
    await waitFor(() => {
      const menu = screen.getByRole("menu", { name: "Size" });
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });

    await user.hover(screen.getByRole("menuitem", { name: "Submenu" }));
    await waitFor(() => {
      expect(
        screen.getByRole("menuitem", { name: "Item 1" })
      ).toBeInTheDocument();
    });
  });

  it("should support keyboard movement correctly", async () => {
    const user = userEvent.setup();
    rmdRender(
      <>
        <button>before</button>
        <Test />
        <button>after</button>
      </>
    );

    const menubar = screen.getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");
    const before = screen.getByRole("button", { name: "before" });
    const after = screen.getByRole("button", { name: "after" });

    await user.tab();
    expect(before).toHaveFocus();

    await user.tab();
    expect(menubarItems[0]).toHaveFocus();

    await user.tab();
    expect(after).toHaveFocus();

    await user.tab({ shift: true });
    expect(menubarItems[0]).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(menubarItems[1]).toHaveFocus();
    });
    await user.keyboard("{End}");
    await waitFor(() => {
      expect(menubarItems[3]).toHaveFocus();
    });

    await user.keyboard("{Home}");
    await waitFor(() => {
      expect(menubarItems[0]).toHaveFocus();
    });

    await user.keyboard("s");
    await waitFor(() => {
      expect(menubarItems[1]).toHaveFocus();
    });

    await user.keyboard("s");
    await waitFor(() => {
      expect(menubarItems[3]).toHaveFocus();
    });

    await user.keyboard("{Enter}");
    const sizeMenu = screen.getByRole("menu", { name: "Size" });
    await waitFor(() => {
      expect(sizeMenu).not.toHaveClass("rmd-scale-transition--enter");
    });
    expect(screen.getByRole("menuitem", { name: "Normal" })).toHaveFocus();

    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Submenu" })).toHaveFocus();

    // arrow right should open nested dropdown menus
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Item 1" })).toHaveFocus();
    });

    // arrow left should close the nested dropdown menus
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Submenu" })).toHaveFocus();
    });

    // arrow left on a normal menuitem should open the menu to the left and focus the first item
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Left" })).toHaveFocus();
    });

    // arrow right should open the next menu and focus the first item
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Normal" })).toHaveFocus();
    });

    // Loops
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Roboto" })).toHaveFocus();
    });

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Normal" })).toHaveFocus();
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(menubarItems[3]).toHaveFocus();
    });

    // the tab index updated
    await user.tab();
    expect(after).toHaveFocus();

    await user.tab({ shift: true });
    expect(menubarItems[3]).toHaveFocus();

    await user.tab({ shift: true });
    expect(before).toHaveFocus();
  });

  it("should refocus the top-level menuitem when the tab key is pressed", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    await user.tab();
    await user.keyboard("[End][Space]");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Normal" })).toHaveFocus();
    });

    await user.keyboard("[End][Enter]");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Item 1" })).toHaveFocus();
    });

    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Size" })).toHaveFocus();
    });
  });
});
