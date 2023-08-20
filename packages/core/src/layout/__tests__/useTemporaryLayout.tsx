import { describe, expect, it } from "@jest/globals";
import type { ReactNode } from "react";
import { AppBar } from "../../app-bar/AppBar.js";
import { AppBarTitle } from "../../app-bar/AppBarTitle.js";
import { Button } from "../../button/Button.js";
import { Form } from "../../form/Form.js";
import { Radio } from "../../form/Radio.js";
import { useRadioGroup } from "../../form/useRadioGroup.js";
import { Sheet } from "../../sheet/Sheet.js";
import {
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { Main } from "../Main.js";
import type { TemporaryLayoutOptions } from "../useTemporaryLayout.js";
import { useTemporaryLayout } from "../useTemporaryLayout.js";

interface LayoutProps extends Omit<TemporaryLayoutOptions, "pathname"> {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children = "Hello, world!", ...options } = props;

  const { getRadioProps, value: pathname } = useRadioGroup<string>({
    defaultValue: "/",
    name: "pathname",
  });
  const { appBarProps, mainProps, navToggleProps, temporaryNavProps } =
    useTemporaryLayout({ pathname, ...options });

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Hello, world!</AppBarTitle>
      </AppBar>
      <Main {...mainProps}>{children}</Main>
      <Sheet {...temporaryNavProps}>
        {/* pretend like these are navigation items */}
        <Form>
          <Radio {...getRadioProps("/")} label="Home" />
          <Radio {...getRadioProps("/1")} label="Route 1" />
          <Radio {...getRadioProps("/2")} label="Route 2" />
        </Form>
      </Sheet>
    </>
  );
}

describe("useTemporaryLayout", () => {
  it("should allow you to create a temporary layout quickly", async () => {
    const user = userEvent.setup();
    rmdRender(<Layout />);

    const appBar = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const navToggle = screen.getByRole("button", { name: "Navigation" });

    expect(appBar).toMatchSnapshot();
    expect(main).toMatchSnapshot();
    expect(() => screen.getByRole("dialog")).toThrow();

    await user.click(navToggle);
    const nav = await screen.findByRole("dialog", { name: "Navigation" });
    await waitFor(() => {
      expect(nav).not.toHaveClass("rmd-sheet--offscreen");
    });
    expect(nav).toMatchSnapshot();

    await user.click(screen.getByRole("radio", { name: "Route 1" }));
    await waitFor(() => {
      expect(nav).not.toBeInTheDocument();
    });
  });

  it("should not offset the main element for static app bar layouts", () => {
    const { rerender } = rmdRender(<Layout appBarPosition="static" />);

    const main = screen.getByRole("main");
    expect(main).not.toHaveClass("rmd-layout-main--offset-v");
    expect(main).toMatchSnapshot();

    rerender(<Layout appBarPosition="sticky" />);
    expect(main).toHaveClass("rmd-layout-main--offset-v");
    expect(main).toMatchSnapshot();

    rerender(<Layout appBarPosition="fixed" />);
    expect(main).toHaveClass("rmd-layout-main--offset-v");
    expect(main).toMatchSnapshot();
  });

  it("should allow for the navigation to be visible by default", () => {
    rmdRender(<Layout defaultVisible />);

    expect(
      screen.getByRole("dialog", { name: "Navigation" })
    ).toBeInTheDocument();
  });
});
