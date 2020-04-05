import React from "react";
import { render } from "@testing-library/react";

import Button from "../Button";
import {
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
  ButtonThemeProps,
} from "../buttonThemeClassNames";

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
): (ButtonThemeProps & { children: React.ReactNode })[] {
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
      buttonTypes.map((buttonType) =>
        themes.map((theme) =>
          themeTypes.map((themeType) => ({
            buttonType,
            theme,
            themeType,
            children: buttonType === "text" ? "Button Text" : <i />,
          }))
        )
      )
    ).forEach((themeProps) => {
      const { getByTestId, rerender, unmount } = render(
        <Button data-testid="button" {...themeProps} />
      );
      expect(getByTestId("button")).toMatchSnapshot();

      rerender(<Button data-testid="button" {...themeProps} disabled />);
      expect(getByTestId("button")).toMatchSnapshot();

      unmount();
    });
  });
});
