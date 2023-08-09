import type { ReactElement } from "react";
import {
  act,
  rmdRender,
  useImmediateRaf,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "../../test-utils";

import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
} from "../../AppSizeProvider";
import { Button } from "../../button/Button";
import { DialogFooter } from "../../dialog/DialogFooter";
import { DialogHeader } from "../../dialog/DialogHeader";
import { MaterialIcon } from "../../icon/MaterialIcon";
import { DropdownMenu } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";
import { useMenuVisibility } from "../MenuVisibilityProvider";

describe("DropdownMenu", () => {
  it("should render as a button and toggle the visibility when clicked", async () => {
    const user = userEvent.setup();
    const onItem1Click = jest.fn();
    const onItem2Click = jest.fn();
    const onItem3Click = jest.fn();

    const { getByRole, getByTestId, findByRole } = rmdRender(
      <>
        <div data-testid="outside" />
        <DropdownMenu buttonChildren="Dropdown">
          <MenuItem onClick={onItem1Click}>Item 1</MenuItem>
          <MenuItem onClick={onItem2Click}>Item 2</MenuItem>
          <MenuItem onClick={onItem3Click}>Item 3</MenuItem>
        </DropdownMenu>
      </>
    );

    const button = await findByRole("button", { name: "Dropdown" });
    expect(button).toMatchSnapshot();

    await user.click(button);

    const menu = await findByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });
    expect(menu).toMatchSnapshot();
    expect(document.activeElement).toBe(menu);

    await user.click(getByRole("menuitem", { name: "Item 2" }));
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });

    expect(document.activeElement).toBe(button);
    expect(onItem1Click).not.toHaveBeenCalled();
    expect(onItem2Click).toHaveBeenCalledTimes(1);
    expect(onItem3Click).not.toHaveBeenCalled();

    await user.click(button);
    await waitFor(() => {
      expect(getByRole("menu", { name: "Dropdown" })).not.toHaveClass(
        "rmd-scale-transition--enter"
      );
    });

    const outside = getByTestId("outside");
    await userEvent.click(outside);
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });

    // since the outside element is not focusable, the click event should bubble
    // up to the body and focus that instead
    expect(document.activeElement).toBe(document.body);
    expect(onItem1Click).not.toHaveBeenCalled();
    expect(onItem2Click).toHaveBeenCalledTimes(1);
    expect(onItem3Click).not.toHaveBeenCalled();
  });

  it("should allow all transitions to be disabled with the disableTransition prop", async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
    );

    const button = getByRole("button", { name: "Dropdown" });
    const icon = getByText("arrow_drop_down");
    expect(icon).not.toHaveClass("rmd-icon-rotator--animate");

    await user.click(button);
    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).not.toHaveClass("rmd-scale-transition--enter");

    await user.click(button);
    expect(menu).not.toBeInTheDocument();
  });

  // NOTE: Using disableTransition for all remaining tests since it makes it
  // easier to not have to wait for the transitions to complete
  it("should allow for a custom id for the button and menu", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(
      <DropdownMenu
        id="custom-button-id"
        menuProps={{ id: "custom-menu-id" }}
        buttonChildren="Dropdown"
        disableTransition
      >
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );

    const button = getByRole("button", { name: "Dropdown" });
    expect(button).toHaveAttribute("id", "custom-button-id");
    await user.click(button);

    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).toHaveAttribute("id", "custom-menu-id");
  });

  it("should allow for a custom aria-label instead of using the aria-labelledby", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(
      <DropdownMenu
        menuProps={{ "aria-label": "Custom" }}
        buttonChildren="Dropdown"
        disableTransition
      >
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );

    await user.click(getByRole("button", { name: "Dropdown" }));

    const menu = getByRole("menu", { name: "Custom" });
    expect(menu).not.toHaveAttribute("aria-labelledby");
    expect(menu).toHaveAttribute("aria-label", "Custom");
  });

  it("should implement the correct keyboard movement behavior", async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Another 1</MenuItem>
        <MenuItem>Orange</MenuItem>
        <MenuItem>Apple</MenuItem>
        <MenuItem>Another 2</MenuItem>
        <MenuItem>Beep</MenuItem>
      </DropdownMenu>
    );

    const button = getByRole("button", { name: "Dropdown" });

    await user.tab();
    expect(document.activeElement).toBe(button);

    await user.keyboard("{ArrowDown}");
    let menu = getByRole("menu", { name: "Dropdown" });
    let items = getAllByRole("menuitem");
    expect(document.activeElement).toBe(items[0]);

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items[1]);

    await user.keyboard("a");
    expect(document.activeElement).toBe(items[3]);

    await user.keyboard("a");
    expect(document.activeElement).toBe(items[4]);

    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(items[3]);

    // this is to emulate "Shift+A" movement which should start the search over
    // I can't do `A` since the `useKeyboardMovementProvider` stuff checks with
    // a shift key being held
    await user.keyboard("{Shift>}A{/Shift}");
    expect(document.activeElement).toBe(items[1]);

    await user.keyboard("{Escape}");
    expect(menu).not.toBeInTheDocument();
    // must wait because of animation frame
    await waitFor(() => {
      expect(document.activeElement).toBe(button);
    });

    await user.keyboard("{ArrowUp}");
    menu = getByRole("menu", { name: "Dropdown" });
    items = getAllByRole("menuitem");
    expect(document.activeElement).toBe(items[5]);
  });

  it("should hide the menu when the page is resized when the closeOnResize prop is enabled", async () => {
    const raf = useImmediateRaf();
    const user = userEvent.setup();
    const { getByRole, rerender } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );

    await user.click(getByRole("button", { name: "Dropdown" }));

    const menu = getByRole("menu", { name: "Dropdown" });

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(menu).toBeInTheDocument();

    rerender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition closeOnResize>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );
    expect(menu).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(menu).not.toBeInTheDocument();

    // when the menu closes because of resize events, the button should not be
    // refocused since it would scroll back to the button
    expect(document.activeElement).toBe(document.body);

    raf.mockRestore();
  });

  it("should hide the menu when the page is scrolled when the closeOnScroll prop is enabled or the menu button is scrolled out of the viewport", async () => {
    const raf = useImmediateRaf();
    const user = userEvent.setup();
    const { getByRole, rerender } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );

    await user.click(getByRole("button", { name: "Dropdown" }));

    let menu = getByRole("menu", { name: "Dropdown" });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(menu).toBeInTheDocument();

    rerender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition closeOnScroll>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );
    expect(menu).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(menu).not.toBeInTheDocument();

    // when the menu closes because of scroll events, the button should not be
    // refocused since it would scroll back to the button
    expect(document.activeElement).toBe(document.body);

    rerender(
      <DropdownMenu buttonChildren="Dropdown" disableTransition>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );

    const button = getByRole("button", { name: "Dropdown" });
    await user.click(button);

    menu = getByRole("menu", { name: "Dropdown" });

    // pretend the user scrolled the menu out of the viewport by scrolling down
    const baseRect = document.body.getBoundingClientRect();
    jest.spyOn(menu, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: -200,
      left: 16,
      bottom: -1,
    });
    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: -200,
      left: 16,
      bottom: -180,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(menu).not.toBeInTheDocument();
    expect(document.activeElement).toBe(document.body);

    raf.mockRestore();
  });

  it("should be able to render as a sheet", async () => {
    const user = userEvent.setup();

    type Listener = (event: MediaQueryListEvent) => void;
    const noop = (): void => {};
    const listeners = new Map<string, Listener>();
    const matchMedia = jest
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        media: query,
        matches:
          query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
          query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
        onchange: noop,
        addListener: noop,
        removeListener: noop,
        addEventListener(
          _type: "change",
          listener: Listener | EventListenerObject
        ) {
          if (typeof listener !== "function") {
            throw new Error();
          }

          listeners.set(query, listener);
        },
        removeEventListener: noop,
        dispatchEvent: () => false,
      }));

    function Header(): ReactElement {
      const { setVisible } = useMenuVisibility();
      return (
        <DialogHeader>
          <Button onClick={() => setVisible(false)}>Header Close</Button>
        </DialogHeader>
      );
    }

    function Footer(): ReactElement {
      const { setVisible } = useMenuVisibility();

      return (
        <DialogFooter>
          <Button onClick={() => setVisible(false)}>Footer Close</Button>
        </DialogFooter>
      );
    }

    const { getByRole, findByRole } = rmdRender(
      <DropdownMenu
        buttonChildren="Dropdown"
        renderAsSheet="phone"
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </DropdownMenu>
    );

    let button = getByRole("button", { name: "Dropdown" });
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    await user.click(button);

    let menu = await findByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(menu).not.toHaveClass("rmd-scale-transition--enter");
    });
    expect(() => getByRole("dialog")).toThrow();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });

    act(() => {
      listeners.forEach((listener, query) => {
        const event = new Event("change");
        listener({
          ...event,
          media: "",
          matches: query.includes(`${DEFAULT_PHONE_MAX_WIDTH}`),
        });
      });
    });

    button = getByRole("button", { name: "Dropdown" });
    expect(button).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(button);
    const sheet = await findByRole("dialog", { name: "Dropdown" });
    await waitFor(() => {
      expect(sheet).not.toHaveClass("rmd-sheet--enter");
    });
    expect(() =>
      within(sheet).getByRole("menu", { name: "Dropdown" })
    ).not.toThrow();
    menu = await findByRole("menu", { name: "Dropdown" });
    expect(sheet).toMatchSnapshot();
    expect(document.activeElement).toBe(sheet);

    const headerClose = getByRole("button", { name: "Header Close" });
    const footerClose = getByRole("button", { name: "Footer Close" });
    const item1 = getByRole("menuitem", { name: "Item 1" });
    const item2 = getByRole("menuitem", { name: "Item 2" });
    const item3 = getByRole("menuitem", { name: "Item 3" });
    await user.tab();
    expect(document.activeElement).toBe(headerClose);

    await user.tab();
    expect(document.activeElement).toBe(item1);

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(item2);

    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(item1);

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(item3);

    await user.tab();
    // once the menu is blurred in a sheet, it waits an animation frame before
    // updating the tab index back to 0 so it can be refocused
    await waitFor(() => {
      expect(menu).toHaveAttribute("tabIndex", "0");
    });
    expect(document.activeElement).toBe(footerClose);

    await user.tab({ shift: true });
    // there is no roving tab index here, so it'll always be the first item.
    // might be something to implement later?
    expect(document.activeElement).toBe(item1);

    matchMedia.mockRestore();
  });

  it("should remove the dropdown icon when rendered as an icon button", () => {
    const { getByRole, rerender } = rmdRender(
      <DropdownMenu
        aria-label="Options"
        buttonType="icon"
        buttonChildren={<MaterialIcon name="more_vert" />}
      />
    );
    let button = getByRole("button", { name: "Options" });
    expect(button).toMatchSnapshot();

    rerender(
      <DropdownMenu
        aria-label="Options"
        floating="bottom-right"
        buttonChildren={<MaterialIcon name="more_vert" />}
      />
    );
    button = getByRole("button", { name: "Options" });
    expect(button).toMatchSnapshot();
  });

  it("should allow for a custom dropdown icon before or after the children", () => {
    const { getByRole, rerender } = rmdRender(
      <DropdownMenu
        buttonChildren="Dropdown"
        icon={<MaterialIcon name="favorite" />}
      />
    );
    let button = getByRole("button", { name: "Dropdown" });
    expect(button).toMatchSnapshot();

    rerender(
      <DropdownMenu
        buttonChildren="Dropdown"
        icon={<MaterialIcon name="favorite" />}
        iconAfter={false}
      />
    );
    button = getByRole("button", { name: "Dropdown" });
    expect(button).toMatchSnapshot();

    // this one isn't really useful since it would be better just to add it as
    // children with the new button setup
    rerender(
      <DropdownMenu
        buttonChildren="Dropdown"
        icon={<MaterialIcon name="favorite" />}
        iconAfter={false}
        disableDropdownIcon
      />
    );
    button = getByRole("button", { name: "Dropdown" });
    expect(button).toMatchSnapshot();
  });

  it("should render as a menuitem when a DropdownMenu is a child of another DropdownMenu", async () => {
    const user = userEvent.setup();
    const { getByRole, findByRole } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown">
        <DropdownMenu buttonChildren="Nested Dropdown 1">
          <MenuItem>Nested Item 1</MenuItem>
          <MenuItem>Nested Item 2</MenuItem>
          <MenuItem>Nested Item 3</MenuItem>
        </DropdownMenu>
        <DropdownMenu buttonChildren="Nested Dropdown 2" renderAsSheet>
          <MenuItem>Nested Item 1</MenuItem>
          <MenuItem>Nested Item 2</MenuItem>
          <MenuItem>Nested Item 3</MenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );

    const button = getByRole("button", { name: "Dropdown" });
    await user.click(button);

    const nestedItem1 = await findByRole("menuitem", {
      name: "Nested Dropdown 1",
    });
    const nestedItem2 = await findByRole("menuitem", {
      name: "Nested Dropdown 2",
    });
    expect(nestedItem1).toHaveAttribute("aria-haspopup", "menu");
    expect(nestedItem2).toHaveAttribute("aria-haspopup", "dialog");
    expect(nestedItem1).not.toHaveAttribute("aria-expanded");
    expect(nestedItem2).not.toHaveAttribute("aria-expanded");
    expect(nestedItem1).toMatchSnapshot();
    expect(nestedItem2).toMatchSnapshot();

    await user.click(nestedItem1);

    const nestedMenu1 = await findByRole("menu", { name: "Nested Dropdown 1" });
    await waitFor(() => {
      expect(nestedMenu1).not.toHaveClass("rmd-scale-transition--enter");
    });

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(nestedMenu1);
    expect(document.activeElement).toBe(nestedItem1);

    await user.click(nestedItem2);
    const nestedSheet = await findByRole("dialog", {
      name: "Nested Dropdown 2",
    });
    await waitFor(() => {
      expect(nestedSheet).not.toHaveClass("rmd-sheet--enter");
    });
    await user.keyboard("{Escape}");

    await waitForElementToBeRemoved(nestedSheet);
    expect(document.activeElement).toBe(nestedItem2);

    await user.keyboard("{Tab}");
    await waitForElementToBeRemoved(
      await findByRole("menu", { name: "Dropdown" })
    );
    expect(document.activeElement).toBe(button);
  });

  it("should include disabled menu items for the keyboard movement", async () => {
    const onItemClick = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = rmdRender(
      <DropdownMenu buttonChildren="Dropdown">
        <MenuItem disabled>Frozen yogurt</MenuItem>
        <MenuItem disabled onClick={onItemClick}>
          Ice cream
        </MenuItem>
        <MenuItem>Eclair</MenuItem>
      </DropdownMenu>
    );

    await user.tab();
    await user.keyboard("{Enter}");
    await waitFor(() => {
      expect(getByRole("menu", { name: "Dropdown" })).not.toHaveClass(
        "rmd-scale-transition--enter"
      );
    });

    const frozenYogurt = getByRole("menuitem", { name: "Frozen yogurt" });
    const iceCream = getByRole("menuitem", { name: "Ice cream" });
    const eclair = getByRole("menuitem", { name: "Eclair" });
    expect(frozenYogurt).toHaveAttribute("aria-disabled", "true");
    expect(iceCream).toHaveAttribute("aria-disabled", "true");
    expect(eclair).not.toHaveAttribute("aria-disabled");
    expect(document.activeElement).toBe(frozenYogurt);

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(eclair);

    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(iceCream);

    await user.keyboard("f");
    expect(document.activeElement).toBe(frozenYogurt);

    await user.keyboard(" ");
    expect(onItemClick).not.toHaveBeenCalled();

    await user.keyboard("{Tab}");
    await waitFor(() => {
      expect(() => getByRole("menu")).toThrow();
    });
    expect(document.activeElement).toBe(
      getByRole("button", { name: "Dropdown" })
    );
  });
});
