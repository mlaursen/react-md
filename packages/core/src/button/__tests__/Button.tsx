import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";

import { FontIcon } from "../../icon/FontIcon.js";
import { INTERACTION_CONFIG } from "../../interaction/config.js";
import { fireEvent, render, screen } from "../../test-utils/index.js";
import { SrOnly } from "../../typography/SrOnly.js";
import { Button, type ButtonProps } from "../Button.js";
import {
  type ButtonTheme,
  type ButtonThemeType,
  type ButtonType,
} from "../buttonStyles.js";

describe("Button", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<Button {...props} />);

    const button = screen.getByRole("button", { name: "Content" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <Button
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();
  });

  it("should wrap text children in span elements to enable higher contrast unless the higher contrast is disabled", () => {
    const higherContrastMock = jest
      .spyOn(INTERACTION_CONFIG, "higherContrast", "get")
      .mockReturnValue(false);
    const { rerender } = render(<Button>Content</Button>);

    const button = screen.getByRole("button", { name: "Content" });
    expect(button).toMatchSnapshot();

    rerender(
      <Button>
        <strong>Strong Content</strong>
      </Button>
    );
    expect(button).toMatchSnapshot();

    higherContrastMock.mockRestore();
  });

  it("should allow for the different themes", () => {
    const buttonTypes: readonly ButtonType[] = ["text", "icon"];
    const themes: readonly ButtonTheme[] = [
      "clear",
      "primary",
      "secondary",
      "warning",
      "error",
      "disabled",
    ];
    const themeTypes: readonly ButtonThemeType[] = [
      "flat",
      "outline",
      "contained",
    ];

    const { rerender } = render(<Button>Content</Button>);
    const button = screen.getByRole("button");
    expect(button).toMatchSnapshot();

    buttonTypes.forEach((buttonType) => {
      themes.forEach((theme) => {
        themeTypes.forEach((themeType) => {
          rerender(
            <Button theme={theme} themeType={themeType} buttonType={buttonType}>
              Content
            </Button>
          );

          expect(button).toMatchSnapshot();
        });
      });
    });
  });

  it("should not fire the onClick event handler when the theme is set to disabled", () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} theme="disabled">
        Button
      </Button>
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("floating action buttons", () => {
    it("should default to a secondary themed contained icon button if the floating behavior is enabled", () => {
      const { rerender } = render(
        <Button aria-label="Button" floating="bottom-right" />
      );

      const button = screen.getByRole("button", { name: "Button" });
      expect(button).toHaveClass("rmd-button--icon");
      expect(button.parentElement).toHaveClass("rmd-fab");
      expect(button.parentElement).toMatchSnapshot();

      rerender(<Button aria-label="Button" floating="top-right" />);
      expect(button).toHaveClass("rmd-button--icon");
      expect(button.parentElement).toHaveClass("rmd-fab");
      expect(button.parentElement).toMatchSnapshot();

      rerender(
        <Button
          aria-label="Button"
          floating="top-left"
          theme="primary"
          themeType="outline"
        />
      );
      expect(button).toHaveClass("rmd-button--icon");
      expect(button.parentElement).toHaveClass("rmd-fab");
      expect(button.parentElement).toMatchSnapshot();

      rerender(
        <Button
          floating="top-left"
          theme="clear"
          themeType="outline"
          buttonType="text"
        >
          Content
        </Button>
      );
      expect(button).toHaveClass("rmd-button--text");
      expect(button.parentElement).toHaveClass("rmd-fab");
      expect(button.parentElement).toMatchSnapshot();
    });

    it("should allow for custom props to be passed to the wrapper span element", () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <Button
          aria-label="Button"
          floating="bottom-left"
          floatingProps={{
            ref,
            style: { zIndex: 20 },
            className: "custom-class-name",
          }}
        />
      );

      const button = screen.getByRole("button", { name: "Button" });
      const fab = button.parentElement;
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toBe(fab);
      expect(fab).toMatchSnapshot();
    });

    it("should support the small and large icon button sizes which also defaults to the icon buttonType for convenience", () => {
      const props: ButtonProps = {
        iconSize: "small",
        children: "Button",
      };
      const { rerender } = render(<Button {...props} />);
      const button = screen.getByRole("button", { name: "Button" });

      expect(button).toMatchSnapshot();

      rerender(<Button {...props} iconSize="normal" />);
      expect(button).toMatchSnapshot();

      rerender(<Button {...props} iconSize="large" />);
      expect(button).toMatchSnapshot();
    });

    it("should allow for responsive icon with label behavior by enabling the responsive prop and using the SrOnly component", () => {
      render(
        <Button responsive>
          <FontIcon>favorite</FontIcon>
          <SrOnly phoneOnly>Label</SrOnly>
        </Button>
      );
      const button = screen.getByRole("button", { name: "Label" });

      expect(button).toMatchSnapshot();
    });
  });
});
