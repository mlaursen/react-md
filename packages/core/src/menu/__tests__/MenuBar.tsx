import type { RenderOptions } from "@testing-library/react";
import {
  act,
  fireEvent,
  render as baseRender,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MouseEventHandler, ReactElement } from "react";
import { CoreProviders } from "../../CoreProviders";
import { DropdownMenu } from "../DropdownMenu";

import { MenuBar } from "../MenuBar";
import { MenuItem } from "../MenuItem";

const render = (ui: ReactElement, options?: RenderOptions) =>
  baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <CoreProviders elementInteractionMode="none">{children}</CoreProviders>
    ),
  });

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
  });

  it("should support a click-first hover mode behavior by default", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test />);

    const menubar = getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");
    expect(menubarItems).toHaveLength(4);
    expect(menubar).toMatchSnapshot();

    await user.hover(menubarItems[0]);
    expect(() => getByRole("menu")).toThrow();

    await user.unhover(menubarItems[0]);
    expect(() => getByRole("menu")).toThrow();

    await user.click(menubarItems[1]);
    await waitFor(() => {
      const menu = getByRole("menu", { name: "Style" });
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });

    await user.hover(menubarItems[2]);
    await waitFor(() => {
      expect(() => getByRole("menu", { name: "Style" })).toThrow();
      expect(() => getByRole("menu", { name: "Text Align" })).not.toThrow();
    });

    await user.click(document.body);
    await waitFor(() => {
      expect(() => getByRole("menu")).toThrow();
    });
  });

  it("should support immediate hover mode behavior by setting the hoverTimeout to 0", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTimeout={0} />);
    const item1 = getByRole("menuitem", { name: "Font" });
    const item4 = getByRole("menuitem", { name: "Size" });

    await user.hover(item1);
    // added timeouts to these since it might fail when running in watch mode
    // with a lot of tests
    await waitFor(
      () => {
        expect(() => getByRole("menu", { name: "Font" })).not.toThrow();
      },
      { timeout: 10 }
    );
    await waitFor(() => {
      expect(getByRole("menu", { name: "Font" })).not.toHaveClass(
        "rmd-scale-transition--enter"
      );
    });

    await user.hover(item4);
    await waitFor(
      () => {
        expect(() => getByRole("menu", { name: "Size" })).not.toThrow();
      },
      { timeout: 10 }
    );
    await user.click(document.body);
    await waitFor(() => {
      expect(() => getByRole("menu")).toThrow();
    });
  });

  it("should support a custom hover timeout to start the hover mode", () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Test hoverTimeout={1000} />);

    const font = getByRole("menuitem", { name: "Font" });
    const style = getByRole("menuitem", { name: "Style" });
    fireEvent.mouseEnter(font);
    expect(() => getByRole("menu")).toThrow();

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(() => getByRole("menu")).toThrow();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(() => getByRole("menu")).not.toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("menu")).not.toThrow();

    fireEvent.mouseLeave(font);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("menu")).not.toThrow();

    fireEvent.mouseEnter(style);
    expect(() => getByRole("menu")).not.toThrow();
    act(() => {
      jest.runAllTimers();
    });
    expect(() => getByRole("menu")).not.toThrow();
    // animates into the new menu
    expect(() => getByRole("menuitem", { name: "Bold" })).not.toThrow();
  });

  it("should open nested dropdown menus immediately on hover", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test />);

    const menubar = getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");

    await user.click(menubarItems[3]);
    await waitFor(() => {
      const menu = getByRole("menu", { name: "Size" });
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });

    await user.hover(getByRole("menuitem", { name: "Submenu" }));
    expect(getByRole("menuitem", { name: "Item 1" })).toBeInTheDocument();
  });

  it("should support keyboard movement correctly", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <>
        <button>before</button>
        <Test />
        <button>after</button>
      </>
    );

    const menubar = getByRole("menubar", { name: "Example" });
    const menubarItems = within(menubar).getAllByRole("menuitem");
    const before = getByRole("button", { name: "before" });
    const after = getByRole("button", { name: "after" });

    await user.tab();
    expect(document.activeElement).toBe(before);

    await user.tab();
    expect(document.activeElement).toBe(menubarItems[0]);

    await user.tab();
    expect(document.activeElement).toBe(after);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(menubarItems[0]);

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[1]);
    });
    await user.keyboard("{End}");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[3]);
    });

    await user.keyboard("{Home}");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[0]);
    });

    await user.keyboard("s");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[1]);
    });

    await user.keyboard("s");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[3]);
    });

    await user.keyboard("{Enter}");
    const sizeMenu = getByRole("menu", { name: "Size" });
    await waitFor(() => {
      expect(sizeMenu).not.toHaveClass("rmd-scale-transition--enter");
    });
    expect(document.activeElement).toBe(
      getByRole("menuitem", { name: "Normal" })
    );

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(
      getByRole("menuitem", { name: "Submenu" })
    );

    // arrow right should open nested dropdown menus
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Item 1" })
      );
    });

    // arrow left should close the nested dropdown menus
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Submenu" })
      );
    });

    // arrow left on a normal menuitem should open the menu to the left and focus the first item
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Left" })
      );
    });

    // arrow right should open the next menu and focus the first item
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Normal" })
      );
    });

    // Loops
    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Roboto" })
      );
    });

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Normal" })
      );
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(document.activeElement).toBe(menubarItems[3]);
    });

    // the tab index updated
    await user.tab();
    expect(document.activeElement).toBe(after);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(menubarItems[3]);

    await user.tab({ shift: true });
    expect(document.activeElement).toBe(before);
  });

  it("should refocus the top-level menuitem when the tab key is pressed", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test />);

    await user.tab();
    await user.keyboard("[End][Space]");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Normal" })
      );
    });

    await user.keyboard("[End][Enter]");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Item 1" })
      );
    });

    await user.tab();
    await waitFor(() => {
      expect(document.activeElement).toBe(
        getByRole("menuitem", { name: "Size" })
      );
    });
  });
});
