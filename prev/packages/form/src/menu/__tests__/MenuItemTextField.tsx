import { Configuration } from "@react-md/layout";
import { DropdownMenu, MenuItem } from "@react-md/menu";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render as baseRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FC, ReactElement } from "react";
import type { MenuItemTextFieldProps } from "../MenuItemTextField";
import { MenuItemTextField } from "../MenuItemTextField";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

function Test({
  label = "Label",
  placeholder = "Placeholder",
  liProps: propLiProps,
  ...props
}: Partial<MenuItemTextFieldProps>): ReactElement {
  const liProps = {
    "data-testid": "li",
    ...propLiProps,
  } as const;
  return (
    <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown" timeout={0}>
      <MenuItem>Before</MenuItem>
      <MenuItemTextField
        id="text-field"
        {...props}
        liProps={liProps}
        label={label}
        placeholder={placeholder}
      />
      <MenuItem>After</MenuItem>
    </DropdownMenu>
  );
}

describe("MenuItemTextField", () => {
  it("should not change the menu's keyboard focus behavior while there is no value", () => {
    const { getByRole } = render(<Test />);

    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).toMatchSnapshot();

    const itemBefore = getByRole("menuitem", { name: "Before" });
    const itemAfter = getByRole("menuitem", { name: "After" });
    const textField = getByRole("textbox", { name: "Label" });

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(itemBefore);

    fireEvent.keyDown(itemBefore, { key: "A" });
    expect(document.activeElement).toBe(itemAfter);

    fireEvent.keyDown(itemAfter, { key: "ArrowUp" });
    expect(document.activeElement).toBe(textField);

    fireEvent.keyDown(textField, { key: "ArrowUp" });
    expect(document.activeElement).toBe(itemBefore);

    fireEvent.keyDown(itemAfter, { key: "ArrowDown" });
    expect(document.activeElement).toBe(textField);

    fireEvent.keyDown(textField, { key: "End" });
    expect(document.activeElement).toBe(itemAfter);

    fireEvent.keyDown(itemAfter, { key: "ArrowUp" });
    expect(document.activeElement).toBe(textField);

    fireEvent.change(textField, { target: { value: "letters" } });
    fireEvent.keyDown(textField, { key: "Home" });
    expect(document.activeElement).toBe(textField);

    fireEvent.keyDown(textField, { key: "End" });
    expect(document.activeElement).toBe(textField);

    fireEvent.keyDown(textField, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(textField);

    fireEvent.keyDown(textField, { key: "ArrowRight" });
    expect(document.activeElement).toBe(textField);

    userEvent.type(textField, "a");
    expect(document.activeElement).toBe(textField);
    expect(textField).toHaveValue("lettersa");

    fireEvent.keyDown(textField, { key: "Escape" });
    expect(menu).not.toBeInTheDocument();
  });

  it("should not cause the menu to close when the text field or li is clicked", () => {
    const { getByRole, getByTestId } = render(<Test />);
    fireEvent.click(getByRole("button", { name: "Dropdown" }));

    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).toBeInTheDocument();

    fireEvent.click(getByRole("textbox", { name: "Label" }));
    expect(menu).toBeInTheDocument();

    fireEvent.click(getByTestId("li"));
    expect(menu).toBeInTheDocument();
  });
});
