import * as React from "react";
import { mount } from "enzyme";
import { create } from "react-test-renderer";

import FakeButton from "../FakeButton";

import {
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
  IButtonThemeProps,
} from "../types";

const themes: ButtonTheme[] = [
  "clear",
  "primary",
  "secondary",
  "warning",
  "error",
  "default",
];
const themeTypes: ButtonThemeType[] = ["flat", "contained", "outline"];
const buttonTypes: ButtonType[] = ["text", "icon"];

function flattenDeep(
  arr: any[]
): (IButtonThemeProps & { children: React.ReactNode })[] {
  return arr.reduce(
    (flattened, val) =>
      Array.isArray(val)
        ? flattened.concat(flattenDeep(val))
        : flattened.concat(val),
    []
  );
}

describe("FakeButton", () => {
  it("should apply the aria-disabled attribute when the disabled prop is enabled", () => {
    const button = mount(<FakeButton>Button</FakeButton>);
    let div = button.find("div");

    expect(div.props()["aria-disabled"]).toBeUndefined();
    expect(div.props().disabled).toBeUndefined();

    button.setProps({ disabled: true });
    div = button.find("div");

    expect(div.props()["aria-disabled"]).toBe("true");
    expect(div.props().disabled).toBeUndefined();
  });

  it("should remove the tabIndex prop when the disabled prop is enabled", () => {
    const button = mount(<FakeButton>Button</FakeButton>);
    let div = button.find("div");

    expect(div.props().tabIndex).toBe(0);

    button.setProps({ disabled: true });
    div = button.find("div");
    expect(div.props().tabIndex).toBeUndefined();
  });

  it("should correctly call the onKeyDown prop", () => {
    const onKeyDown = jest.fn();
    const button = mount(<FakeButton onKeyDown={onKeyDown}>Button</FakeButton>);

    button.simulate("keyDown");
    expect(onKeyDown).toBeCalled();
  });

  it("should call preventDefault when the space key is pressed to prevent page scrolling", () => {
    const button = mount(<FakeButton>Button</FakeButton>);

    const preventDefault = jest.fn();
    button.simulate("keyDown", { preventDefault, key: " " });

    expect(preventDefault).toBeCalled();

    preventDefault.mockClear();
    button.simulate("keyDown", { preventDefault, key: "Enter" });
    expect(preventDefault).not.toBeCalled();
  });

  // Unfortunately I have to skip this test as the currentTarget doesn't seem to be
  // modifiable at this time and it doesn't actually trigger a click event in testing
  it.skip("should correctly trigger the click event after space or enter is pressed", () => {
    const onClick = jest.fn();
    const button = mount(<FakeButton onClick={onClick}>Button</FakeButton>);

    button.simulate("keyDown", { key: " " });
    expect(onClick).toBeCalled();

    onClick.mockClear();
    button.simulate("keyDown", { key: "Enter" });
    expect(onClick).toBeCalled();
  });

  it("should render correctly based on the theme props", () => {
    flattenDeep(
      buttonTypes.map(buttonType =>
        themes.map(theme =>
          themeTypes.map(themeType => ({
            buttonType,
            theme,
            themeType,
            children: buttonType === "text" ? "Button Text" : <i />,
          }))
        )
      )
    ).forEach(themeProps => {
      expect(create(<FakeButton {...themeProps} />).toJSON()).toMatchSnapshot();
    });
  });
});
