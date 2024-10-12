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
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
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
    overflowRef,
  } = useTooltip(options);

  return (
    <>
      <Button {...elementProps}>
        Button
        {options.overflowOnly && (
          <span ref={overflowRef} data-testid="resize-node" />
        )}
      </Button>
      <Tooltip {...tooltipProps} {...tooltip}>
        Tooltip
      </Tooltip>
      <Button onClick={hideTooltip}>Hide Tooltip</Button>
      <Button
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
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
    rmdRender(<Test />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.mouseEnter(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("tooltip")).not.toThrow();
  });

  it("should display the tooltip after focusing for 1s by default only in keyboard mode", () => {
    jest.useFakeTimers();
    rmdRender(<Test />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.keyDown(document.body);
    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const tooltip = screen.getByRole("tooltip");
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
    expect(tooltip).not.toBeInTheDocument();
  });

  it("should show the tooltip after touching for the hoverTimeout or if the onContextMenu is called on mobile", () => {
    // some mobile devices will trigger the context menu for long presses, so
    // need to make sure that does not happen for tooltipped elements on mobile
    jest.useFakeTimers();

    rmdRender(<Test />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.touchStart(button);
    expect(() => screen.getByRole("tooltip")).toThrow();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("rmd-tooltip--enter");

    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).not.toHaveClass("rmd-tooltip--enter");

    fireEvent.touchEnd(button);
    expect(tooltip).toHaveClass("rmd-tooltip--exit");

    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toBeInTheDocument();

    fireEvent.click(document.body);
    fireEvent.mouseEnter(button);
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.touchStart(button);
    expect(() => screen.getByRole("tooltip")).toThrow();
    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(() => screen.getByRole("tooltip")).toThrow();

    const empty = jest.spyOn(Selection.prototype, "empty");
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(() => screen.getByRole("tooltip")).not.toThrow();
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
    rmdRender(<Test />);

    const button = screen.getByRole("button", { name: "Button" });
    const toggleTooltip = screen.getByRole("button", {
      name: "Toggle Tooltip",
    });
    expect(() => screen.getByRole("tooltip")).toThrow();
    expect(button).not.toHaveAttribute("aria-describedby");

    await user.click(toggleTooltip);
    let tooltip = await screen.findByRole("tooltip");
    expect(button).toHaveAttribute("aria-describedby");
    expect(tooltip).toMatchSnapshot();
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });
    expect(tooltip).toMatchSnapshot();

    await user.click(toggleTooltip);
    await waitForElementToBeRemoved(tooltip);

    await user.click(toggleTooltip);
    tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.click(screen.getByRole("button", { name: "Hide Tooltip" }));
    await waitForElementToBeRemoved(tooltip);
  });

  it("should support rendering the tooltip using display: none instead of temporarily", async () => {
    const user = userEvent.setup();
    rmdRender(<Test tooltip={{ temporary: false }} hoverTimeout={0} />);
    expect(() => screen.getByRole("tooltip")).not.toThrow();

    await user.tab();
    await waitFor(() => {
      expect(() =>
        screen.getByRole("tooltip", { name: "Tooltip" })
      ).not.toThrow();
    });
  });

  it("should close the tooltip whenever the escape key is pressed", async () => {
    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} />);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    const tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.keyboard("[Escape]");
    await waitForElementToBeRemoved(tooltip);
  });

  it("should close the tooltip whenever the page is scrolled", async () => {
    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} />);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    const tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.scroll(document.body);
    await waitForElementToBeRemoved(tooltip);
  });

  it("should hide the tooltip when the page becomes inactive or blurs and not show the tooltip again on focus", async () => {
    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    let tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.blur(window);
    await waitForElementToBeRemoved(tooltip);

    fireEvent.focus(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    await user.tab({ shift: true });
    expect(button).toHaveFocus();
    tooltip = await screen.findByRole("tooltip");
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
    await waitForElementToBeRemoved(tooltip);

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    fireEvent.focus(button);
    expect(() => screen.getByRole("tooltip")).toThrow();
  });

  it("should use the position prop when provided instead of determining a position within the viewport", async () => {
    const vh = 768;
    expect(window.innerHeight).toBe(vh);

    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} position="above" />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    const baseRect = document.body.getBoundingClientRect();
    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: vh / 2,
    });

    await user.tab();
    let tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
    });
    await waitFor(() => {
      expect(tooltip).toHaveClass("rmd-tooltip--above");
    });

    await user.tab();
    await waitForElementToBeRemoved(tooltip);

    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: 0,
    });
    await user.tab({ shift: true });
    tooltip = await screen.findByRole("tooltip");
    expect(isElementVisible(tooltip)).toBe(true);
    expect(tooltip).toHaveClass("rmd-tooltip--above");
  });

  it("should never display the tooltip if the disabled option is true", async () => {
    const user = userEvent.setup();
    rmdRender(<Test hoverTimeout={0} disabled />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.tab();
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.hover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.unhover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.touchStart(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    fireEvent.touchEnd(button);
    expect(() => screen.getByRole("tooltip")).toThrow();
  });

  it("should automatically attempt to determine the spacing based on the computed style of the spacing custom property", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test hoverTimeout={0} />);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

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
    let tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
    });
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    // disable since I am mocking window.getComputedStyle
    // eslint-disable-next-line jest-dom/prefer-to-have-style
    expect(tooltip.style.top).toBe(`${spacingPixels}px`);

    await user.unhover(button);
    await waitForElementToBeRemoved(tooltip);

    getComputedStyle.mockImplementation(
      // @ts-expect-error
      () => ({
        getPropertyValue() {
          return "";
        },
      })
    );

    await user.hover(button);
    tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
    });
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const defaultSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_SPACING,
    });
    // disable since I am mocking window.getComputedStyle
    // eslint-disable-next-line jest-dom/prefer-to-have-style
    expect(tooltip.style.top).toBe(`${defaultSpacingPixels}px`);

    await user.unhover(button);
    await waitForElementToBeRemoved(tooltip);

    rerender(<Test dense disableAutoSpacing hoverTimeout={0} />);
    expect(() => screen.getByRole("tooltip")).toThrow();
    await user.hover(button);
    tooltip = await screen.findByRole("tooltip");
    await waitFor(() => {
      expect(isElementVisible(tooltip)).toBe(true);
    });
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const denseSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_DENSE_SPACING,
    });
    // disable since I am mocking window.getComputedStyle
    // eslint-disable-next-line jest-dom/prefer-to-have-style
    expect(tooltip.style.top).toBe(`${denseSpacingPixels}px`);
  });

  it("should support displaying a tooltip only when the text is overflown", async () => {
    const user = userEvent.setup();
    rmdRender(<Test overflowOnly />);

    const resizeNode = screen.getByTestId("resize-node");
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    const rect = resizeNode.getBoundingClientRect();
    jest.spyOn(resizeNode, "scrollWidth", "get").mockReturnValue(300);
    const offsetWidth = jest
      .spyOn(resizeNode, "offsetWidth", "get")
      .mockReturnValue(300);
    const getBoundingClientRect = jest
      .spyOn(resizeNode, "getBoundingClientRect")
      .mockReturnValue({ ...rect, width: 300 });

    await user.hover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.unhover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    offsetWidth.mockReturnValue(150);
    getBoundingClientRect.mockReturnValue({ ...rect, width: 150 });
    await user.hover(button);
    await waitFor(() => {
      expect(() => screen.getByRole("tooltip")).not.toThrow();
    });
  });
});
