import * as React from "react";
import { create } from "react-test-renderer";

import Button from "../Button";
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

describe("Button", () => {
  // this is actually really bad practice and kind of worthess
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
      expect(create(<Button {...themeProps} />).toJSON()).toMatchSnapshot();
    });
  });
});
