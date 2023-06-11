import {
  act,
  fireEvent,
  render as baseRender,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { Button } from "../../button";
import { CoreProviders } from "../../CoreProviders";
import { FontIcon } from "../../icon";
import { parseCssLengthUnit } from "../../utils";
import {
  DEFAULT_TOOLTIP_DENSE_SPACING,
  DEFAULT_TOOLTIP_SPACING,
} from "../constants";
import type { TooltipProps } from "../Tooltip";
import { Tooltip } from "../Tooltip";
import type { TooltipHookOptions } from "../useTooltip";
import { useTooltip } from "../useTooltip";

const render = (ui: ReactElement): ReturnType<typeof baseRender> =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <CoreProviders elementInteractionMode="none">{children}</CoreProviders>
    ),
  });

interface TestProps extends TooltipHookOptions {
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
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should display the tooltip after hovering for 1s by default", () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseEnter(button);
    expect(tooltip).toHaveAttribute("hidden");

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.mouseLeave(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.mouseEnter(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toHaveAttribute("hidden");
  });

  it("should display the tooltip after focusing for 1s by default only in keyboard mode", () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(tooltip).toHaveAttribute("hidden");
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.keyDown(document.body);
    fireEvent.focus(button);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(tooltip).not.toHaveAttribute("hidden");
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
    expect(tooltip).toHaveAttribute("hidden");
    expect(tooltip).toMatchSnapshot();
  });

  it("should show the tooltip after touching for the hoverTime or if the onContextMenu is called on mobile", () => {
    // some mobile devices will trigger the context menu for long presses, so
    // need to make sure that does not happen for tooltipped elements on mobile
    jest.useFakeTimers();

    const { getByRole } = render(<Test />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

    fireEvent.touchStart(button);
    expect(tooltip).toHaveAttribute("hidden");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(tooltip).not.toHaveAttribute("hidden");
    expect(tooltip).toHaveClass("rmd-tooltip--enter");

    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toHaveAttribute("hidden");
    expect(tooltip).not.toHaveClass("rmd-tooltip--enter");

    fireEvent.touchEnd(button);
    expect(tooltip).toHaveClass("rmd-tooltip--exit");

    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.click(document.body);
    fireEvent.mouseEnter(button);
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.touchStart(button);
    expect(tooltip).toHaveAttribute("hidden");
    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(tooltip).toHaveAttribute("hidden");

    const empty = jest.spyOn(Selection.prototype, "empty");
    fireEvent.contextMenu(button);
    act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toHaveAttribute("hidden");
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
    const { getByRole } = render(<Test />);

    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });
    const toggleTooltip = getByRole("button", { name: "Toggle Tooltip" });
    expect(tooltip).toBeInTheDocument();
    expect(button).not.toHaveAttribute("aria-describedby");

    await user.click(toggleTooltip);
    expect(tooltip).not.toHaveAttribute("hidden");
    expect(button).toHaveAttribute("aria-describedby");
    expect(tooltip).toMatchSnapshot();
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });
    expect(tooltip).toMatchSnapshot();

    await user.click(toggleTooltip);
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });
    expect(tooltip).toMatchSnapshot();

    await user.click(toggleTooltip);
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.click(getByRole("button", { name: "Hide Tooltip" }));
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });
    expect(tooltip).toMatchSnapshot();
  });

  it("should support rendering the tooltip temporarily instead of using hidden", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Test tooltip={{ temporary: true }} hoverTime={0} />
    );

    expect(() => getByRole("tooltip", { hidden: true })).toThrow();

    await user.tab();
    await waitFor(() => {
      expect(() => getByRole("tooltip", { name: "Tooltip" })).not.toThrow();
    });
  });

  it("should close the tooltip whenever the escape key is pressed", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTime={0} />);
    const tooltip = getByRole("tooltip", { hidden: true });

    await user.tab();
    await waitFor(() => {
      expect(tooltip).not.toHaveAttribute("hidden");
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.keyboard("[Escape]");
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });
  });

  it("should close the tooltip whenever the page is scrolled", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTime={0} />);
    const tooltip = getByRole("tooltip", { hidden: true });

    await user.tab();
    await waitFor(() => {
      expect(tooltip).not.toHaveAttribute("hidden");
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.scroll(document.body);
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });
  });

  it("should hide the tooltip when the page becomes inactive or blurs and not show the tooltip again on focus", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTime={0} />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

    await user.tab();
    expect(tooltip).not.toHaveAttribute("hidden");
    await waitFor(() => {
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    fireEvent.blur(window);
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });

    fireEvent.focus(button);
    expect(tooltip).toHaveAttribute("hidden");

    await user.tab();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(button);
    expect(tooltip).not.toHaveAttribute("hidden");
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
      expect(tooltip).toHaveAttribute("hidden");
    });

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    fireEvent.focus(button);
    expect(tooltip).toHaveAttribute("hidden");
  });

  it("should use the position prop when provided instead of determining a position within the viewport", async () => {
    const vh = 768;
    expect(window.innerHeight).toBe(vh);

    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTime={0} position="above" />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

    const baseRect = document.body.getBoundingClientRect();
    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: vh / 2,
    });

    await user.tab();
    expect(tooltip).not.toHaveAttribute("hidden");
    expect(tooltip).toHaveClass("rmd-tooltip--above");

    await user.tab();
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });

    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      ...baseRect,
      top: 0,
    });
    await user.tab({ shift: true });
    expect(tooltip).not.toHaveAttribute("hidden");
    expect(tooltip).toHaveClass("rmd-tooltip--above");
  });

  it("should never display the tooltip if the disabled option is true", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Test hoverTime={0} disabled />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

    await user.tab();
    expect(tooltip).toHaveAttribute("hidden");

    await user.tab();
    expect(tooltip).toHaveAttribute("hidden");

    await user.hover(button);
    expect(tooltip).toHaveAttribute("hidden");

    await user.unhover(button);
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.touchStart(button);
    expect(tooltip).toHaveAttribute("hidden");

    fireEvent.touchEnd(button);
    expect(tooltip).toHaveAttribute("hidden");
  });

  it("should automatically attempt to determine the spacing based on the computed style of the spacing custom property", async () => {
    const user = userEvent.setup();
    const { getByRole, rerender } = render(<Test hoverTime={0} />);
    const button = getByRole("button", { name: "Button" });
    const tooltip = getByRole("tooltip", { hidden: true });

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
      expect(tooltip).not.toHaveAttribute("hidden");
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });
    expect(tooltip.style.top).toBe(`${spacingPixels}px`);

    await user.unhover(button);
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });

    getComputedStyle.mockImplementation(
      // @ts-expect-error
      () => ({
        getPropertyValue() {
          return null;
        },
      })
    );

    await user.hover(button);
    await waitFor(() => {
      expect(tooltip).not.toHaveAttribute("hidden");
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const defaultSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_SPACING,
    });
    expect(tooltip.style.top).toBe(`${defaultSpacingPixels}px`);

    await user.unhover(button);
    await waitFor(() => {
      expect(tooltip).toHaveAttribute("hidden");
    });

    rerender(<Test dense disableAutoSpacing hoverTime={0} />);
    expect(tooltip).toBeInTheDocument();
    await user.hover(button);
    await waitFor(() => {
      expect(tooltip).not.toHaveAttribute("hidden");
      expect(tooltip).not.toHaveClass("rmd-tooltip--enter");
    });

    const denseSpacingPixels = parseCssLengthUnit({
      value: DEFAULT_TOOLTIP_DENSE_SPACING,
    });
    expect(tooltip.style.top).toBe(`${denseSpacingPixels}px`);
  });
});
