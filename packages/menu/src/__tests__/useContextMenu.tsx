import { Configuration } from "@react-md/layout";
import {
  ContentCopySVGIcon,
  ContentCutSVGIcon,
  ContentPasteSVGIcon,
} from "@react-md/material-icons";
import { BELOW_CENTER_ANCHOR } from "@react-md/utils";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render as baseRender } from "@testing-library/react";
import type { FC, MouseEvent, ReactElement } from "react";

import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import type { ContextMenuHookOptions } from "../useContextMenu";
import { useContextMenu } from "../useContextMenu";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

type TestProps = ContextMenuHookOptions;

function Test(props: TestProps): ReactElement {
  const { menuRef, menuProps, onContextMenu } = useContextMenu(props);
  return (
    <>
      <div data-testid="container" onContextMenu={onContextMenu} />
      <Menu {...menuProps} ref={menuRef} timeout={0}>
        <MenuItem leftAddon={<ContentCutSVGIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopySVGIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteSVGIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}

describe("useContextMenu", () => {
  it("should work correctly", () => {
    const { getByTestId, getByRole } = render(<Test />);
    const container = getByTestId("container");

    expect(() => getByRole("menu")).toThrow();

    fireEvent.contextMenu(container, {
      clientX: 100,
      clientY: 50,
      button: 1,
      buttons: 1,
    });
    expect(document.body).toMatchSnapshot();
    const menu = getByRole("menu", { name: "Context Menu" });
    expect(menu).toBeInTheDocument();
  });

  it("should not display if a custom onContextMenu function calls event.stopPropagation()", () => {
    const onContextMenu = jest.fn((event: MouseEvent) => {
      event.stopPropagation();
    });

    const { getByTestId, getByRole } = render(
      <Test onContextMenu={onContextMenu} />
    );

    fireEvent.contextMenu(getByTestId("container"));
    expect(onContextMenu).toBeCalledTimes(1);
    expect(() => getByRole("menu")).toThrow();
  });

  it("should allow the anchor, baseId, and menuLabel to be configured", () => {
    const { getByTestId, getByRole } = render(
      <Test
        anchor={BELOW_CENTER_ANCHOR}
        baseId="custom-context-menu"
        menuLabel="Custom Label"
      />
    );
    const container = getByTestId("container");

    expect(() => getByRole("menu")).toThrow();

    fireEvent.contextMenu(container);
    expect(document.body).toMatchSnapshot();
    const menu = getByRole("menu", { name: "Custom Label" });
    expect(menu).toBeInTheDocument();
  });
});
