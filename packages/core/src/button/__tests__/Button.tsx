import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";
import { ElementInteractionProvider } from "../../interaction/ElementInteractionProvider.js";
import { fireEvent, render } from "../../test-utils/index.js";
import { Button } from "../Button.js";
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
    const { getByRole, rerender } = render(<Button {...props} />);

    const button = getByRole("button", { name: "Content" });
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
    const { getByRole, rerender } = render(<Button>Content</Button>, {
      wrapper: ({ children }) => (
        <ElementInteractionProvider disableHigherContrast>
          {children}
        </ElementInteractionProvider>
      ),
    });

    const button = getByRole("button", { name: "Content" });
    expect(button).toMatchSnapshot();

    rerender(
      <Button>
        <strong>Strong Content</strong>
      </Button>
    );
    expect(button).toMatchSnapshot();
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

    const { getByRole, rerender } = render(<Button>Content</Button>);
    const button = getByRole("button");
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
    const { getByRole } = render(
      <Button onClick={onClick} theme="disabled">
        Button
      </Button>
    );
    const button = getByRole("button");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("floating action buttons", () => {
    it("should default to a secondary themed contained icon button if the floating behavior is enabled", () => {
      const { getByRole, rerender } = render(
        <Button aria-label="Button" floating="bottom-right" />
      );

      const button = getByRole("button", { name: "Button" });
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
      const { getByRole } = render(
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

      const button = getByRole("button", { name: "Button" });
      const fab = button.parentElement;
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toBe(fab);
      expect(fab).toMatchSnapshot();
    });
  });
});
