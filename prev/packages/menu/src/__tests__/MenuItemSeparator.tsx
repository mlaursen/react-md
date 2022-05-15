import { Configuration } from "@react-md/layout";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render as baseRender } from "@testing-library/react";
import type { FC, ReactElement } from "react";

import { DropdownMenu } from "../DropdownMenu";
import { MenuItem } from "../MenuItem";
import { MenuItemSeparator } from "../MenuItemSeparator";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

function Test({
  horizontal,
  inset,
  vertical,
  maxHeight,
}: {
  horizontal?: boolean;
  inset?: boolean;
  vertical?: boolean;
  maxHeight?: number;
}): ReactElement {
  return (
    <DropdownMenu
      id="dropdown-menu"
      buttonChildren="Dropdown"
      horizontal={horizontal}
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItemSeparator
        maxHeight={maxHeight}
        inset={inset}
        vertical={vertical}
      />
      <MenuItem>Item 2</MenuItem>
    </DropdownMenu>
  );
}

describe("MenuItemSeparator", () => {
  it("should render based on the menu's orientation", () => {
    const { getByRole, rerender } = render(<Test horizontal={false} />);
    let dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    let separator = getByRole("separator");
    expect(separator).not.toHaveAttribute("aria-orientation");
    expect(separator).toMatchSnapshot();

    rerender(<Test key="horizontal" horizontal />);
    expect(dropdown).not.toBeInTheDocument();
    expect(separator).not.toBeInTheDocument();

    dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    separator = getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toMatchSnapshot();
  });

  it("should allow the inset styles when not rendered vertically", () => {
    const { getByRole, rerender } = render(<Test inset />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    const separator = getByRole("separator");
    expect(separator).toHaveClass("rmd-divider--inset");

    rerender(<Test inset horizontal />);
    expect(separator).toBeInTheDocument();
    expect(separator).not.toHaveClass("rmd-divider--inset");
  });

  it("should allow for the orientation to be overridden by the vertical prop", () => {
    const { getByRole } = render(<Test vertical />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    const separator = getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toMatchSnapshot();
  });

  it("should allow for a custom maxHeight for vertical styles", () => {
    const { getByRole, rerender } = render(<Test maxHeight={0.5} />);
    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);

    const separator = getByRole("separator");
    expect(separator).toMatchSnapshot();

    rerender(<Test maxHeight={0.5} vertical />);
    expect(separator).toMatchSnapshot();
  });
});
