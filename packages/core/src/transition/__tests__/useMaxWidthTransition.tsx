import { describe, expect, it } from "@jest/globals";
import { type ReactElement } from "react";
import { Button } from "../../button/Button.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { rmdRender, screen, userEvent } from "test-utils";
import { useToggle } from "../../useToggle.js";
import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { useMaxWidthTransition } from "../useMaxWidthTransition.js";

describe("useMaxWidthTransition", () => {
  it("should return the element unchanged if the disabled option is true or the element is not a ReactElement", async () => {
    const user = userEvent.setup();

    function Test(): ReactElement {
      const { toggled, toggle } = useToggle(false);
      const element1 = useMaxWidthTransition({
        element: <FontIcon>home</FontIcon>,
        transitionIn: toggled,
        disabled: true,
      });
      const element2 = useMaxWidthTransition({
        element: toggled && "icon",
        transitionIn: toggled,
      });

      return (
        <>
          <div data-testid="icon-1">{element1}</div>
          <div data-testid="icon-2">{element2}</div>
          <Button onClick={toggle}>Toggle</Button>
        </>
      );
    }

    rmdRender(<Test />);
    const icon1 = screen.getByTestId("icon-1");
    const icon2 = screen.getByTestId("icon-2");
    const toggle = screen.getByRole("button", { name: "Toggle" });

    expect(icon1.firstElementChild).not.toHaveClass("rmd-max-width-transition");
    expect(icon2).toBeEmptyDOMElement();
    expect(icon1).toMatchSnapshot();
    expect(icon2).toMatchSnapshot();

    await user.click(toggle);
    expect(icon1.firstElementChild).not.toHaveClass("rmd-max-width-transition");
    expect(icon2).not.toBeEmptyDOMElement();
    expect(icon1).toMatchSnapshot();
    expect(icon2).toMatchSnapshot();
  });

  it("should add the transition classes", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      const { toggled, toggle } = useToggle(false);
      const icon = useMaxWidthTransition({
        element: <FontIcon className="custom-class-name">home</FontIcon>,
        transitionIn: toggled,
      });

      return (
        <>
          <div data-testid="icon">{icon}</div>
          <Button onClick={toggle}>Toggle</Button>
        </>
      );
    }

    rmdRender(<Test />);
    const icon = screen.getByTestId("icon").firstElementChild;
    if (!(icon instanceof HTMLElement)) {
      throw new Error("Unable to find icon");
    }
    const toggle = screen.getByRole("button", { name: "Toggle" });

    expect(icon).toHaveClass("custom-class-name");
    expect(icon).toHaveClass("rmd-max-width-transition");
    expect(icon).not.toHaveClass("rmd-max-width-transition--visible");
    expect(icon).toMatchSnapshot();

    await user.click(toggle);
    expect(icon).toHaveClass("custom-class-name");
    expect(icon).toHaveClass("rmd-max-width-transition");
    expect(icon).toHaveClass("rmd-max-width-transition--visible");
    expect(icon).toMatchSnapshot();
  });

  it("should use the DISPLAY_NONE_CLASS when the transition is disabled", async () => {
    const user = userEvent.setup();
    function Test(): ReactElement {
      const { toggled, toggle } = useToggle(false);
      const icon = useMaxWidthTransition({
        element: <FontIcon className="custom-class-name">home</FontIcon>,
        transitionIn: toggled,
        disableTransition: true,
      });

      return (
        <>
          <div data-testid="icon">{icon}</div>
          <Button onClick={toggle}>Toggle</Button>
        </>
      );
    }

    rmdRender(<Test />);
    const icon = screen.getByTestId("icon").firstElementChild;
    if (!(icon instanceof HTMLElement)) {
      throw new Error("Unable to find icon");
    }
    const toggle = screen.getByRole("button", { name: "Toggle" });

    expect(icon).toHaveClass("custom-class-name");
    expect(icon).toHaveClass(DISPLAY_NONE_CLASS);
    expect(icon).not.toHaveClass("rmd-max-width-transition");
    expect(icon).toMatchSnapshot();

    await user.click(toggle);
    expect(icon).toHaveClass("custom-class-name");
    expect(icon).not.toHaveClass(DISPLAY_NONE_CLASS);
    expect(icon).not.toHaveClass("rmd-max-width-transition");
  });
});
