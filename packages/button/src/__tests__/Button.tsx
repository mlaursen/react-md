import React from "react";
import { render } from "@testing-library/react";

import Button from "../Button";
import {
  ButtonTheme,
  ButtonThemeType,
  ButtonType,
  ButtonThemeProps,
} from "../buttonThemeClassNames";
import { FABPosition } from "../FAB";

const themes: ButtonTheme[] = [
  "clear",
  "primary",
  "secondary",
  "warning",
  "error",
];
const themeTypes: ButtonThemeType[] = ["flat", "contained", "outline"];
const buttonTypes: ButtonType[] = ["text", "icon"];
const floatingTypes: FABPosition[] = [
  null,
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

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
          themeTypes.map((themeType) =>
            floatingTypes.map((floating) => ({
              buttonType,
              theme,
              themeType,
              children: buttonType === "text" ? "Button Text" : <i />,
              floating,
            }))
          )
        )
      )
    ).forEach((themeProps) => {
      const { container, rerender, unmount } = render(
        <Button {...themeProps} />
      );
      expect(container.firstChild).toMatchSnapshot();

      rerender(<Button {...themeProps} disabled />);
      expect(container.firstChild).toMatchSnapshot();

      unmount();
    });
  });
});
