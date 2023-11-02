import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { type ReactElement } from "react";
import {
  act,
  fireEvent,
  rmdRender,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { FontIcon } from "../../icon/FontIcon.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { parseCssLengthUnit } from "../../utils/parseCssLengthUnit.js";
import { Tooltip, type TooltipProps } from "../Tooltip.js";
import {
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_SPACING,
} from "../constants.js";
import { useTooltip, type TooltipOptions } from "../useTooltip.js";

interface TestProps extends TooltipOptions {
  tooltip?: Partial<TooltipProps>;
}

function Test(props: TestProps): ReactElement {
  const { tooltip, ...options } = props;
  const {
    elementProps,
    tooltipProps,
    animatedOnce,
    hideTooltip,
    setVisible,
    visible,
  } = useTooltip(options);

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps} {...tooltip}>
        Tooltip
      </Tooltip>
      <Button onClick={hideTooltip}>Hide Tooltip</Button>
      <Button onClick={() => setVisible((prev) => !prev)}>
        Toggle Tooltip
      </Button>
      <div data-testid="animatedOnce">{`${animatedOnce}`}</div>
      <div data-testid="visible">
        {visible ? <FontIcon>favorite</FontIcon> : <FontIcon>close</FontIcon>}
      </div>
    </>
  );
}

describe("Tooltip", () => {
  beforeEach(() => {
    TRANSITION_CONFIG.disabled = false;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should display the tooltip after hovering for 1s by default", () => {
    jest.useFakeTimers();
    const { getByRole } = rmdRender(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseEnter(button);
    expect(isElementVisible(tooltip)).toBe(false);

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(true);
  });

  it("should display the tooltip after focusing for 1s by default only in keyboard mode", () => {
    jest.useFakeTimers();
    const { getByRole } = rmdRender(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    expect(isElementVisible(tooltip)).toBe(false);
    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(isElementVisible(tooltip)).toBe(false);
    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.keyDown(document.body);
    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(isElementVisible(tooltip)).toBe(true);
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toMatchSnapshot();

    fireEvent.blur(button);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(tooltip).toHaveClass("rmd-tooltip--exit");

    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(false);
    expect(tooltip).toMatchSnapshot();
  });

  it("should show the tooltip after touching for the hoverTime or if the onContextMenu is called on mobile", () => {
    // some mobile devices will trigger the context menu for long presses, so
    // need to make sure that does not happen for tooltipped elements on mobile
    jest.useFakeTimers();

    const { getByRole } = rmdRender(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    fireEvent.touchStart(button);
    expect(isElementVisible(tooltip)).toBe(false);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(isElementVisible(tooltip)).toBe(true);
    expect(tooltip).toHaveClass("rmd-tooltip--enter");

    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(true);
    expect(tooltip).not.toHaveClass("rmd-tooltip--enter");

    fireEvent.touchEnd(button);
    expect(tooltip).toHaveClass("rmd-tooltip--exit");

    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.click(document.body);
    fireEvent.mouseEnter(button);
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.touchStart(button);
    expect(isElementVisible(tooltip)).toBe(false);
    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(isElementVisible(tooltip)).toBe(false);

    const empty = jest.spyOn(Selection.prototype, "empty");
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(isElementVisible(tooltip)).toBe(true);
    expect(empty).not.toHaveBeenCalled();

    const empty2 = jest.fn();
    jest.spyOn(window, "getSelection").mockReturnValue({
      empty: empty2,
      anchorNode: {
        parentElement: button,
      },
    } as unknown as Selection);

    fireEvent.contextMenu(button);
    expect(empty2).toHaveBeenCalled();
  });

  it("should support controlling the visibility manually with the setVisible and hideTooltip returned functions", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test />);

    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");
    const toggleTooltip = getByRole("button", { name: "Toggle Tooltip" });
    expect(tooltip).toBeInTheDocument();
    expect(button).not.toHaveAttribute("aria-describedby");

    await user.click(toggleTooltip);
    expect(isElementVisible(tooltip)).toBe(true);
    expect(button).toHaveAttribute("aria-describedby");
    expect(tooltip).toMatchSnapshot();
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });
    expect(tooltip).toMatchSnapshot();

    await user.click(toggleTooltip);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });
    expect(tooltip).toMatchSnapshot();

    await user.click(toggleTooltip);
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.click(getByRole("button", { name: "Hide Tooltip" }));
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });
    expect(tooltip).toMatchSnapshot();
  });

  it("should support rendering the tooltip temporarily instead of using display: none", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(
      <Test tooltip={{ temporary: true }} hoverTime={0} />
    );

    expect(() => getByRole("tooltip")).toThrow();

    await user.tab();
    await waitFor(() => {
      expect(() => getByRole("tooltip", { name: "Tooltip" })).not.toThrow();
    });
  });

  it("should close the tooltip whenever the escape key is pressed", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test hoverTime={0} />);
    const tooltip = getByRole("tooltip");

    await user.tab();
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.keyboard("[Escape]");
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });
  });

  it("should close the tooltip whenever the page is scrolled", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test hoverTime={0} />);
    const tooltip = getByRole("tooltip");

    await user.tab();
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.scroll(document.body);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });
  });

  it("should hide the tooltip when the page becomes inactive or blurs and not show the tooltip again on focus", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test hoverTime={0} />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    await user.tab();
    expect(isElementVisible(tooltip)).toBe(true);
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.blur(window);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });

    fireEvent.focus(button);
    expect(isElementVisible(tooltip)).toBe(false);

    await user.tab();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button);
    expect(isElementVisible(tooltip)).toBe(true);
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    jest
      .spyOn(document, "visibilityState", "get")
      .mockReturnValueOnce("hidden")
      .mockReturnValueOnce("visible");

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    fireEvent.focus(button);
    expect(isElementVisible(tooltip)).toBe(false);
  });

  it("should use the position prop when provided instead of determining a position within the viewport", async () => {
    const vh = 768;
    expect(window.innerHeight).toBe(vh);

    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test hoverTime={0} position="above" />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    const baseRect = document.body.getBoundingClientRect();
    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: vh / 2,
    });

    await user.tab();
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).toHaveClass("rmd-tooltip--above");
    });

    await user.tab();
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });

    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: 0,
    });
    await user.tab({ shift: true });
    expect(isElementVisible(tooltip)).toBe(true);
    expect(tooltip).toHaveClass("rmd-tooltip--above");
  });

  it("should never display the tooltip if the disabled option is true", async () => {
    const user = userEvent.setup();
    const { getByRole } = rmdRender(<Test hoverTime={0} disabled />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    await user.tab();
    expect(isElementVisible(tooltip)).toBe(false);

    await user.tab();
    expect(isElementVisible(tooltip)).toBe(false);

    await user.hover(button);
    expect(isElementVisible(tooltip)).toBe(false);

    await user.unhover(button);
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.touchStart(button);
    expect(isElementVisible(tooltip)).toBe(false);

    fireEvent.touchEnd(button);
    expect(isElementVisible(tooltip)).toBe(false);
  });

  it("should automatically attempt to determine the spacing based on the computed style of the spacing custom property", async () => {
    const user = userEvent.setup();
    const { getByRole, rerender } = rmdRender(<Test hoverTime={0} />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip");

    const spacing = "0.825rem";
    const spacingPixels = parseCssLengthUnit({ value: spacing });

    const getComputedStyle = jest
      .spyOn(window, "getComputedStyle")
      .mockImplementation(
        // @ts-expect-error
        () => ({
          getPropertyValue() {
            return spacing;
          },
        })
      );

    await user.hover(button);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });
    expect(tooltip.style.top).toBe(`${spacingPixels}px`);

    await user.unhover(button);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });

    getComputedStyle.mockImplementation(
      // @ts-expect-error
      () => ({
        getPropertyValue() {
          return "";
        },
      })
    );

    await user.hover(button);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const defaultSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_SPACING,
    });
    expect(tooltip.style.top).toBe(`${defaultSpacingPixels}px`);

    await user.unhover(button);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(false);
    });

    rerender(<Test dense disableAutoSpacing hoverTime={0} />);
    expect(tooltip).toBeInTheDocument();
    await user.hover(button);
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const denseSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_DENSE_SPACING,
    });
    expect(tooltip.style.top).toBe(`${denseSpacingPixels}px`);
  });
});
