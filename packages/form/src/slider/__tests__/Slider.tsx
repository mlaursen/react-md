import React, { ReactElement } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Dir, InteractionModeListener } from "@react-md/utils";

import { Slider, SliderProps } from "../Slider";
import { SliderStepOptions, SliderValue } from "../types";
import { useSlider } from "../useSlider";

interface TestProps
  extends SliderStepOptions,
    Pick<
      SliderProps,
      | "thumbProps"
      | "onBlur"
      | "onMouseDown"
      | "onTouchStart"
      | "vertical"
      | "disabled"
      | "getValueText"
      | "discrete"
    > {
  defaultValue?: SliderValue;
}

function Test({
  defaultValue,
  disabled,
  vertical,
  thumbProps,
  onBlur,
  onMouseDown,
  onTouchStart,
  getValueText,
  discrete,
  ...options
}: TestProps): ReactElement {
  const [, controls] = useSlider(defaultValue, options);

  return (
    <Slider
      {...controls}
      baseId="slider"
      label="Volume"
      disabled={disabled}
      vertical={vertical}
      thumbProps={thumbProps}
      discrete={discrete}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      getValueText={getValueText}
    />
  );
}

describe("Slider", () => {
  it("should render correctly", () => {
    const { container, getByRole, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    const slider = getByRole("slider");
    slider.focus();
    expect(container).toMatchSnapshot();

    slider.blur();
    expect(container).toMatchSnapshot();

    rerender(<Test vertical />);
    expect(container).toMatchSnapshot();

    slider.focus();
    expect(container).toMatchSnapshot();

    slider.blur();
    expect(container).toMatchSnapshot();

    rerender(<Test disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Test disabled vertical />);
    expect(container).toMatchSnapshot();
  });

  it("should allow for custom valuetext", () => {
    const { getByRole, rerender } = render(
      <Test getValueText={(value) => `$${value}`} />
    );

    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuetext", "$0");

    rerender(<Test getValueText={() => ""} />);
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).not.toHaveAttribute("aria-valuetext");

    rerender(<Test />);
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).not.toHaveAttribute("aria-valuetext");
  });

  it("should call the prop events correctly", () => {
    const onBlur = jest.fn();
    const onKeyDown = jest.fn();
    const onMouseDown = jest.fn();
    const onTouchStart = jest.fn();

    const { getByRole } = render(
      <Test
        thumbProps={{ onKeyDown }}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      />
    );

    const slider = getByRole("slider");

    fireEvent.keyDown(slider);
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.mouseDown(slider, { altKey: true });
    expect(onMouseDown).toBeCalledTimes(1);

    fireEvent.touchStart(slider);
    expect(onTouchStart).toBeCalledTimes(1);

    fireEvent.blur(slider);
    expect(onBlur).toBeCalledTimes(1);
  });

  it("should ensure the value stays within the range if it changes after initial render to prevent errors from being thrown", () => {
    const props = {
      defaultValue: 5,
      min: 0,
      max: 5,
      step: 1,
    };
    const { rerender, getByRole } = render(<Test {...props} />);

    const slider = getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "5");

    rerender(<Test {...props} step={2} max={6} />);
    expect(slider).toHaveAttribute("aria-valuenow", "6");

    rerender(<Test {...props} step={3} max={6} />);
    expect(slider).toHaveAttribute("aria-valuenow", "6");

    rerender(<Test {...props} step={10} max={100} />);
    expect(slider).toHaveAttribute("aria-valuenow", "10");

    rerender(<Test {...props} step={1} min={50} max={100} />);
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("should log an error if the slider does not have a valid label", () => {
    function Test(
      props: Pick<
        SliderProps,
        "label" | "thumbLabel" | "thumbLabelledBy" | "thumbProps"
      >
    ): ReactElement {
      const [, controls] = useSlider();

      return <Slider {...props} {...controls} baseId="slider" />;
    }

    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(<Test label="Label" />);
    rerender(<Test thumbLabel="Label" />);
    rerender(<Test thumbLabelledBy="some-id" />);
    rerender(<Test thumbProps={{ "aria-label": "Label" }} />);
    rerender(<Test thumbProps={{ "aria-labelledby": "some-id" }} />);

    expect(error).not.toBeCalled();
    rerender(<Test />);
    expect(error).toBeCalledTimes(1);

    error.mockRestore();
  });

  describe("keyboard behavior", () => {
    it("should update the value correctly with specific keyboard keys", () => {
      const { getByRole } = render(<Test />);
      const slider = getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuenow", "0");

      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(slider).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(slider, { key: "PageUp" });
      expect(slider).toHaveAttribute("aria-valuenow", "11");

      fireEvent.keyDown(slider, { key: "ArrowLeft" });
      expect(slider).toHaveAttribute("aria-valuenow", "10");

      fireEvent.keyDown(slider, { key: "ArrowLeft" });
      expect(slider).toHaveAttribute("aria-valuenow", "9");

      fireEvent.keyDown(slider, { key: "PageDown" });
      expect(slider).toHaveAttribute("aria-valuenow", "0");

      fireEvent.keyDown(slider, { key: "End" });
      expect(slider).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider, { key: "Home" });
      expect(slider).toHaveAttribute("aria-valuenow", "0");

      fireEvent.keyDown(slider, { key: "ArrowUp" });
      expect(slider).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(slider, { key: "ArrowDown" });
      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });
  });

  describe("drag behavior", () => {
    it("should work correctly", () => {
      jest.useFakeTimers();
      const { container, getByRole } = render(<Test />);

      const slider = getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "0");
      const track =
        container.querySelector<HTMLSpanElement>(".rmd-slider-track");
      if (!track) {
        throw new Error();
      }

      jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 1000,
        top: 0,
        right: 1000,
        left: 0,
        bottom: 20,
        toJSON: () => "",
      }));
      fireEvent.mouseDown(track, { clientX: 200, clientY: 0 });

      expect(container).toMatchSnapshot();
      expect(track.className).toContain("rmd-slider-track--animate");
      expect(slider).toHaveAttribute("aria-valuenow", "20");
      expect(setTimeout).toBeCalledTimes(1);
      act(() => {
        jest.runAllTimers();
      });
      expect(container).toMatchSnapshot();
      expect(track.className).not.toContain("rmd-slider-track--animate");

      fireEvent.mouseMove(window, { clientX: 500, clientY: 20 });
      expect(container).toMatchSnapshot();
      expect(slider).toHaveAttribute("aria-valuenow", "50");

      fireEvent.mouseUp(window);
      expect(container).toMatchSnapshot();
      expect(track.className).toContain("rmd-slider-track--animate");
      expect(slider).toHaveAttribute("aria-valuenow", "50");

      expect(setTimeout).toBeCalledTimes(1);

      fireEvent.mouseMove(window, { clientX: 200, clientY: 10 });
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(container).toMatchSnapshot();

      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it("should reverse the drag value for RTL languages", () => {
      jest.useFakeTimers();
      const { container, getByRole } = render(
        <Dir defaultDir="rtl">
          <Test />
        </Dir>
      );
      const slider = getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "0");
      const track =
        container.querySelector<HTMLSpanElement>(".rmd-slider-track");
      if (!track) {
        throw new Error();
      }

      jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 1000,
        top: 0,
        right: 1000,
        left: 0,
        bottom: 20,
        toJSON: () => "",
      }));
      fireEvent.mouseDown(track, { clientX: 200, clientY: 0 });

      expect(container).toMatchSnapshot();
      expect(track.className).toContain("rmd-slider-track--animate");
      expect(slider).toHaveAttribute("aria-valuenow", "80");
      expect(setTimeout).toBeCalledTimes(1);
      act(() => {
        jest.runAllTimers();
      });
      expect(container).toMatchSnapshot();
      expect(track.className).not.toContain("rmd-slider-track--animate");

      fireEvent.mouseMove(window, { clientX: 500, clientY: 20 });
      expect(container).toMatchSnapshot();
      expect(slider).toHaveAttribute("aria-valuenow", "50");

      fireEvent.mouseUp(window);
      expect(container).toMatchSnapshot();
      expect(track.className).toContain("rmd-slider-track--animate");
      expect(slider).toHaveAttribute("aria-valuenow", "50");

      expect(setTimeout).toBeCalledTimes(1);

      fireEvent.mouseMove(window, { clientX: 200, clientY: 10 });
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(container).toMatchSnapshot();

      jest.clearAllTimers();
      jest.useRealTimers();
    });
  });

  describe("update behavior", () => {
    it('should only update value value on blur or dragend when the updateOn is set to "blur"', () => {
      const onChange = jest.fn();
      function Test({ blur }: { blur: boolean }): ReactElement {
        const [value, controls] = useSlider(0, {
          onChange,
          updateOn: blur ? "blur" : "change",
        });

        return (
          <>
            <span data-testid="value">{value}</span>
            <Slider {...controls} baseId="slider" label="Slider" />
          </>
        );
      }

      const { getByRole, getByTestId, rerender } = render(
        <Test blur={false} />
      );
      const value = getByTestId("value");
      const slider = getByRole("slider");

      expect(value.textContent).toBe("0");
      expect(slider).toHaveAttribute("aria-valuenow", "0");

      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value.textContent).toBe("1");
      expect(slider).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value.textContent).toBe("2");
      expect(slider).toHaveAttribute("aria-valuenow", "2");

      slider.blur();
      // it's pretty much useless to use `onChange` with updateOn === "change"
      expect(onChange).not.toBeCalled();

      rerender(<Test blur />);
      expect(onChange).not.toBeCalled();
      expect(value.textContent).toBe("2");
      expect(slider).toHaveAttribute("aria-valuenow", "2");

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value.textContent).toBe("2");
      expect(slider).toHaveAttribute("aria-valuenow", "3");

      fireEvent.keyDown(slider, { key: "Home" });
      expect(onChange).not.toBeCalled();
      expect(value.textContent).toBe("2");
      expect(slider).toHaveAttribute("aria-valuenow", "0");

      fireEvent.blur(slider);
      expect(onChange).toBeCalledWith(0);
      expect(value.textContent).toBe("0");
      expect(slider).toHaveAttribute("aria-valuenow", "0");

      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });
      fireEvent.keyDown(slider, { key: "ArrowLeft" });
      slider.blur();
      // should not be called again if value hasn't changed
      expect(onChange).toBeCalledTimes(1);
    });
  });

  describe("discrete sliders", () => {
    function DiscreteTest({ disabled }: { disabled?: boolean }): ReactElement {
      return (
        <InteractionModeListener>
          <Test discrete disabled={disabled} />
        </InteractionModeListener>
      );
    }

    it("should show the toolwip when the thumb gains focus while the user interaction mode is keyboard", async () => {
      const { getByRole, container } = render(<DiscreteTest />);
      expect(container).toMatchSnapshot();
      expect(() => getByRole("tooltip")).toThrow();

      const slider = getByRole("slider");
      // move into keyboard mode
      fireEvent.keyDown(slider);
      expect(() => getByRole("tooltip")).toThrow();

      slider.focus();
      const tooltip = getByRole("tooltip");
      expect(container).toMatchSnapshot();
      expect(tooltip.textContent).toBe("0");

      fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(tooltip.textContent).toBe("1");

      slider.blur();
      await waitFor(() => expect(() => getByRole("tooltip")).toThrow());
      expect(container).toMatchSnapshot();

      // move into mouse mode
      fireEvent.mouseDown(window);
      expect(() => getByRole("tooltip")).toThrow();
      slider.focus();
      expect(() => getByRole("tooltip")).toThrow();
    });

    it("should hide the tooltip if it becomes disabled while the tooltip is visible somehow", async () => {
      const { getByRole, rerender } = render(<DiscreteTest />);

      const slider = getByRole("slider");
      // move into keyboard mode
      fireEvent.keyDown(slider);
      expect(() => getByRole("tooltip")).toThrow();

      slider.focus();
      expect(() => getByRole("tooltip")).not.toThrow();

      rerender(<DiscreteTest disabled />);
      await waitFor(() => expect(() => getByRole("tooltip")).toThrow());
    });

    it("should wait the animationDuration before enabling the visibility for mouse mode", () => {
      jest.useFakeTimers();
      const { container, getByRole } = render(<DiscreteTest />);
      const track =
        container.querySelector<HTMLSpanElement>(".rmd-slider-track");
      if (!track) {
        throw new Error();
      }

      jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 1000,
        top: 0,
        right: 1000,
        left: 0,
        bottom: 20,
        toJSON: () => "",
      }));
      // sanity force mouse mode
      fireEvent.mouseDown(window);
      fireEvent.mouseDown(track, { clientX: 200, clientY: 0 });
      expect(() => getByRole("tooltip")).toThrow();
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("tooltip")).not.toThrow();

      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it("should not hide the tooltip if switching between keyboard to desktop mode and the track was clicked", () => {
      jest.useFakeTimers();
      const { container, getByRole } = render(<DiscreteTest />);
      const slider = getByRole("slider");
      const track =
        container.querySelector<HTMLSpanElement>(".rmd-slider-track");
      if (!track) {
        throw new Error();
      }

      jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 1000,
        top: 0,
        right: 1000,
        left: 0,
        bottom: 20,
        toJSON: () => "",
      }));

      // move into keyboard mode
      fireEvent.keyDown(slider);
      slider.focus();
      expect(() => getByRole("tooltip")).not.toThrow();

      fireEvent.mouseDown(track, { clientX: 200, clientY: 0 });
      expect(() => getByRole("tooltip")).not.toThrow();
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("tooltip")).not.toThrow();

      slider.blur();
      act(() => {
        jest.runAllTimers();
      });
      expect(() => getByRole("tooltip")).toThrow();

      jest.clearAllTimers();
      jest.useRealTimers();
    });
  });
});
