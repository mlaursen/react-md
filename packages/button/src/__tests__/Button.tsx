import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Button } from "../Button";
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
  "disabled",
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

  it("should default to type=button to prevent form submits for most buttons", () => {
    const { getByText, rerender } = render(<Button>Text</Button>);

    const button = getByText("Text");
    expect(button).toHaveAttribute("type", "button");

    rerender(<Button type="submit">Text</Button>);
    expect(button).toHaveAttribute("type", "submit");

    rerender(<Button type="button">Text</Button>);
    expect(button).toHaveAttribute("type", "button");
  });

  it("should default to an icon button using the secondary and contained theme if the floating prop is provided", () => {
    const { getByRole, rerender } = render(
      <Button floating="top-left">Text</Button>
    );
    const button = getByRole("button");
    expect(button.className).toContain("rmd-button--contained");
    expect(button.className).toContain("rmd-button--secondary");

    rerender(
      <Button floating="top-left" theme="primary">
        Text
      </Button>
    );
    expect(button.className).toContain("rmd-button--contained");
    expect(button.className).toContain("rmd-button--primary");
  });

  it("should correctly pass the event handlers down and fire them as expected", () => {
    const onClick = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchEnd = jest.fn();
    const handlers = {
      onClick,
      onKeyUp,
      onKeyDown,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };

    const { getByRole } = render(
      <Button
        {...handlers}
        disableRipple
        disablePressedFallback
        enablePressedAndRipple={false}
      >
        Button
      </Button>
    );
    const button = getByRole("button");

    fireEvent.keyDown(button);
    fireEvent.keyUp(button);
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.mouseLeave(button);
    fireEvent.click(button);
    fireEvent.touchStart(button);
    fireEvent.touchMove(button);
    fireEvent.touchEnd(button);

    expect(onClick).toBeCalled();
    expect(onKeyUp).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onMouseUp).toBeCalled();
    expect(onMouseDown).toBeCalled();
    expect(onMouseLeave).toBeCalled();
    expect(onTouchStart).toBeCalled();
    expect(onTouchMove).toBeCalled();
    expect(onTouchEnd).toBeCalled();
  });

  it("should not allow for any of the interaction state handlers to be called while the theme is disabled", () => {
    const onClick = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchEnd = jest.fn();
    const handlers = {
      onClick,
      onKeyUp,
      onKeyDown,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };

    const { getByRole } = render(
      <Button {...handlers} theme="disabled">
        Button
      </Button>
    );
    const button = getByRole("button");

    fireEvent.keyDown(button);
    fireEvent.keyUp(button);
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.click(button);
    fireEvent.mouseLeave(button);
    fireEvent.touchStart(button);
    fireEvent.touchMove(button);
    fireEvent.touchEnd(button);

    expect(onClick).not.toBeCalled();
    expect(onKeyUp).not.toBeCalled();
    expect(onKeyDown).not.toBeCalled();
    expect(onMouseUp).not.toBeCalled();
    expect(onMouseDown).not.toBeCalled();
    expect(onMouseLeave).not.toBeCalled();
    expect(onTouchStart).not.toBeCalled();
    expect(onTouchMove).not.toBeCalled();
    expect(onTouchEnd).not.toBeCalled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
