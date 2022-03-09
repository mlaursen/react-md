import { Configuration } from "@react-md/layout";
import { DropdownMenu } from "@react-md/menu";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render as baseRender } from "@testing-library/react";
import type { FC, ReactElement } from "react";
import type { MenuItemFileInputProps } from "../MenuItemFileInput";
import { MenuItemFileInput } from "../MenuItemFileInput";

const Wrapper: FC = ({ children }) => (
  <Configuration disableRipple>{children}</Configuration>
);

function render(ui: ReactElement): RenderResult {
  return baseRender(ui, { wrapper: Wrapper });
}

type TestProps = Omit<MenuItemFileInputProps, "id">;

function Test(props: TestProps): ReactElement {
  return (
    <DropdownMenu id="dropdown-menu" buttonChildren="Dropdown" timeout={0}>
      <MenuItemFileInput id="file-input" {...props} />
    </DropdownMenu>
  );
}

describe("MenuItemFileInput", () => {
  it("should work correctly", () => {
    const onChange = jest.fn();
    const { getByRole, getByLabelText } = render(<Test onChange={onChange} />);

    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).toMatchSnapshot();

    fireEvent.change(getByLabelText("Upload"));
    expect(onChange).toBeCalledTimes(1);
    expect(menu).toBeInTheDocument();
  });

  it("should call the onClick handlers correctly", () => {
    const onClick = jest.fn();
    const onInputClick = jest.fn();
    const onChange = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Test
        onClick={onClick}
        onChange={onChange}
        inputProps={{ onClick: onInputClick }}
      />
    );

    const dropdown = getByRole("button", { name: "Dropdown" });
    fireEvent.click(dropdown);
    const menu = getByRole("menu", { name: "Dropdown" });
    expect(menu).toMatchSnapshot();

    fireEvent.click(getByRole("menuitem"));
    expect(onClick).toBeCalledTimes(1);
    expect(onInputClick).toBeCalledTimes(1);
    expect(onChange).not.toBeCalled();
    expect(menu).toBeInTheDocument();

    fireEvent.click(getByLabelText("Upload"));
    expect(onClick).toBeCalledTimes(1);
    expect(onInputClick).toBeCalledTimes(2);
    expect(onChange).not.toBeCalled();
    expect(menu).toBeInTheDocument();
  });
});
