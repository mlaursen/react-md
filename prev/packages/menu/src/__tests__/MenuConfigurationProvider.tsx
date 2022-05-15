import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import { Divider } from "@react-md/divider";
import { Configuration } from "@react-md/layout";
import { CloseSVGIcon } from "@react-md/material-icons";
import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
} from "@react-md/utils";
import type { RenderResult } from "@testing-library/react";
import {
  fireEvent,
  render as baseRender,
  waitFor,
} from "@testing-library/react";
import type { FC, ReactElement } from "react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuConfigurationProvider } from "../MenuConfigurationProvider";
import { MenuItem } from "../MenuItem";
import { MenuItemLink } from "../MenuItemLink";
import { useMenuVisibility } from "../MenuVisibilityProvider";
import type { MenuConfiguration } from "../types";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

interface TestProps extends MenuConfiguration {
  horizontal?: boolean;
}

function Test(props: TestProps): ReactElement {
  return (
    <DropdownMenu {...props} id="main-menu" buttonChildren="Dropdown">
      <MenuItem>An Item</MenuItem>
      <DropdownMenu {...props} id="sub-menu" buttonChildren="Submenu">
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

function mockMedia(
  size: "phone" | "tablet" | "desktop"
): jest.SpyInstance<MediaQueryList, [query: string]> {
  let regexp: RegExp;
  switch (size) {
    case "phone":
      regexp = new RegExp(`max-width: ${DEFAULT_PHONE_MAX_WIDTH}`);
      break;
    case "tablet":
      regexp = new RegExp(`max-width: ${DEFAULT_TABLET_MAX_WIDTH}`);
      break;
    case "desktop":
      regexp = new RegExp(
        `min-width: (${DEFAULT_DESKTOP_MIN_WIDTH}|${DEFAULT_DESKTOP_LARGE_MIN_WIDTH})`
      );
      break;
  }

  return jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
    media: query,
    matches: regexp.test(query),
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

describe("MenuConfigurationProvider", () => {
  describe('renderAsSheet="phone"', () => {
    let mock: ReturnType<typeof mockMedia>;
    beforeAll(() => {
      mock = mockMedia("phone");
    });

    afterAll(() => {
      mock?.mockRestore();
    });

    it("should allow menus to be rendered in a sheet on phones", async () => {
      const { getByRole } = render(
        <MenuConfigurationProvider renderAsSheet="phone">
          <Test />
        </MenuConfigurationProvider>
      );

      const dropdown = getByRole("button", { name: "Dropdown" });
      fireEvent.click(dropdown);
      expect(document.body).toMatchSnapshot();

      const sheet = getByRole("dialog", { name: "Dropdown" });
      const menu = getByRole("menu", { name: "Dropdown" });
      await waitFor(() => {
        expect(document.activeElement).toBe(menu);
      });

      fireEvent.click(getByRole("menuitem", { name: "Delta" }));
      await waitFor(() => {
        expect(menu).not.toBeInTheDocument();
        expect(sheet).not.toBeInTheDocument();
      });
      expect(document.body).toMatchSnapshot();
    });
  });

  it("should allow menus to be rendered in a sheet by enabling renderAsSheet", async () => {
    const { getByRole, rerender } = render(
      <MenuConfigurationProvider renderAsSheet>
        <Test />
      </MenuConfigurationProvider>
    );

    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    expect(document.body).toMatchSnapshot();
    const sheet = getByRole("dialog", { name: "Dropdown" });
    const menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });

    fireEvent.click(getByRole("menuitem", { name: "Delta" }));
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
      expect(sheet).not.toBeInTheDocument();
    });
    expect(document.body).toMatchSnapshot();

    rerender(
      <MenuConfigurationProvider renderAsSheet>
        <Test renderAsSheet={false} />
      </MenuConfigurationProvider>
    );
    fireEvent.click(dropdown);
    expect(document.body).toMatchSnapshot();
    expect(() => getByRole("dialog")).toThrow();
  });

  it("should allow for a custom header and footer for the sheet", async () => {
    function Header(): ReactElement {
      const { setVisible } = useMenuVisibility();
      return (
        <AppBar theme="clear">
          <AppBarTitle>Custom</AppBarTitle>
          <AppBarAction first last onClick={() => setVisible(false)}>
            <CloseSVGIcon />
          </AppBarAction>
        </AppBar>
      );
    }

    function Footer(): ReactElement {
      const { setVisible } = useMenuVisibility();
      return (
        <>
          <Divider />
          <DialogFooter>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
          </DialogFooter>
        </>
      );
    }

    const { getByRole, rerender } = render(
      <MenuConfigurationProvider
        renderAsSheet
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
      >
        <Test />
      </MenuConfigurationProvider>
    );

    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    let sheet = getByRole("dialog", { name: "Dropdown" });
    let menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });
    expect(sheet).toMatchSnapshot();
    expect(() => getByRole("heading", { name: "Custom" })).not.toThrow();
    expect(() => getByRole("separator")).not.toThrow();

    // shouldn't close
    fireEvent.click(getByRole("heading", { name: "Custom" }));
    expect(sheet).toBeInTheDocument();
    expect(menu).toBeInTheDocument();

    const overlay = document.querySelector(".rmd-overlay");
    if (!overlay) {
      throw new Error();
    }
    fireEvent.click(overlay);
    await waitFor(() => {
      expect(sheet).not.toBeInTheDocument();
      expect(menu).not.toBeInTheDocument();
    });

    rerender(
      <MenuConfigurationProvider
        renderAsSheet
        sheetHeader={<Header />}
        sheetFooter={<Footer />}
      >
        <Test sheetHeader={null} sheetFooter={null} />
      </MenuConfigurationProvider>
    );
    fireEvent.click(dropdown);

    sheet = getByRole("dialog", { name: "Dropdown" });
    menu = getByRole("menu", { name: "Dropdown" });
    await waitFor(() => {
      expect(document.activeElement).toBe(menu);
    });
    expect(sheet).toMatchSnapshot();
    expect(() => getByRole("heading", { name: "Custom" })).toThrow();
    expect(() => getByRole("separator")).toThrow();
  });

  describe("useMenuVisibility", () => {
    const error = jest.spyOn(console, "error");
    beforeAll(() => {
      error.mockImplementation(() => {
        // do nothing
      });
    });

    afterAll(() => {
      error.mockRestore();
    });

    it("should throw an error if there isn't a parent MenuConfigurationProvider when the setVisible function is called", () => {
      function Test(): null {
        const { setVisible } = useMenuVisibility();
        setVisible(false);
        return null;
      }

      expect(() => render(<Test />)).toThrowError(
        '"MenuVisibilityProvider" must be a parent component'
      );
    });
  });
});
