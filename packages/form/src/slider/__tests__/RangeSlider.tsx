import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { RangeSlider, RangeSliderProps } from "../RangeSlider";
import { RangeSliderValue, SliderStepOptions } from "../types";
import { useRangeSlider } from "../useRangeSlider";

interface TestProps
  extends SliderStepOptions,
    Pick<
      RangeSliderProps,
      | "thumb1Props"
      | "thumb2Props"
      | "onBlur"
      | "onMouseDown"
      | "onTouchStart"
      | "vertical"
      | "disabled"
      | "getValueText"
    > {
  defaultValue?: RangeSliderValue;
}

function Test({
  defaultValue,
  disabled,
  vertical,
  thumb1Props,
  thumb2Props,
  onBlur,
  onMouseDown,
  onTouchStart,
  getValueText,
  ...options
}: TestProps): ReactElement {
  const [, controls] = useRangeSlider(defaultValue, options);

  return (
    <RangeSlider
      {...controls}
      baseId="slider"
      label="Price"
      disabled={disabled}
      vertical={vertical}
      thumb1Props={thumb1Props}
      thumb2Props={thumb2Props}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      getValueText={getValueText}
    />
  );
}

describe("RangeSlider", () => {
  it("should render correctly", () => {
    const { container, getByRole, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    const slider1 = getByRole("slider", { name: "Min" });
    const slider2 = getByRole("slider", { name: "Max" });

    slider1.focus();
    expect(container).toMatchSnapshot();

    slider1.blur();
    slider2.focus();
    expect(container).toMatchSnapshot();

    slider2.blur();
    expect(container).toMatchSnapshot();

    rerender(<Test vertical />);
    expect(container).toMatchSnapshot();

    slider1.focus();
    expect(container).toMatchSnapshot();

    slider1.blur();
    slider2.focus();
    expect(container).toMatchSnapshot();

    slider2.blur();
    expect(container).toMatchSnapshot();

    rerender(<Test disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Test disabled vertical />);
    expect(container).toMatchSnapshot();
  });

  it("should call the prop events correctly", () => {
    const thumb1KeyDown = jest.fn();
    const thumb2KeyDown = jest.fn();
    const onBlur = jest.fn();
    const onMouseDown = jest.fn();
    const onTouchStart = jest.fn();

    const { container, getByRole } = render(
      <Test
        thumb1Props={{ onKeyDown: thumb1KeyDown }}
        thumb2Props={{ onKeyDown: thumb2KeyDown }}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      />
    );

    const track = container.querySelector(".rmd-slider-track");
    if (!track) {
      throw new Error();
    }
    const slider1 = getByRole("slider", { name: "Min" });
    const slider2 = getByRole("slider", { name: "Max" });

    fireEvent.keyDown(slider1);
    expect(thumb1KeyDown).toBeCalledTimes(1);

    fireEvent.keyDown(slider2);
    expect(thumb2KeyDown).toBeCalledTimes(1);

    fireEvent.mouseDown(slider1, { altKey: true });
    expect(onMouseDown).toBeCalledTimes(1);

    fireEvent.touchStart(slider1);
    expect(onTouchStart).toBeCalledTimes(1);

    fireEvent.blur(track);
    expect(onBlur).toBeCalledTimes(1);
  });

  it("should ensure the value stays within the range if it changes after initial render to prevent errors from being thrown", () => {
    const props = {
      min: 0,
      max: 5,
      step: 1,
    };
    const { rerender, getByRole } = render(<Test {...props} />);

    const slider1 = getByRole("slider", { name: "Min" });
    const slider2 = getByRole("slider", { name: "Max" });
    expect(slider1).toHaveAttribute("aria-valuemin", "0");
    expect(slider1).toHaveAttribute("aria-valuemax", "5");
    expect(slider1).toHaveAttribute("aria-valuenow", "0");
    expect(slider2).toHaveAttribute("aria-valuemin", "0");
    expect(slider2).toHaveAttribute("aria-valuemax", "5");
    expect(slider2).toHaveAttribute("aria-valuenow", "5");

    rerender(<Test {...props} step={2} max={6} />);
    expect(slider1).toHaveAttribute("aria-valuemin", "0");
    expect(slider1).toHaveAttribute("aria-valuemax", "6");
    expect(slider1).toHaveAttribute("aria-valuenow", "0");
    expect(slider2).toHaveAttribute("aria-valuemin", "0");
    expect(slider2).toHaveAttribute("aria-valuemax", "6");
    expect(slider2).toHaveAttribute("aria-valuenow", "6");

    rerender(<Test {...props} step={3} max={6} />);
    expect(slider1).toHaveAttribute("aria-valuemin", "0");
    expect(slider1).toHaveAttribute("aria-valuemax", "6");
    expect(slider1).toHaveAttribute("aria-valuenow", "0");
    expect(slider2).toHaveAttribute("aria-valuemin", "0");
    expect(slider2).toHaveAttribute("aria-valuemax", "6");
    expect(slider2).toHaveAttribute("aria-valuenow", "6");

    rerender(<Test {...props} step={10} max={100} />);
    expect(slider1).toHaveAttribute("aria-valuemin", "0");
    expect(slider1).toHaveAttribute("aria-valuemax", "100");
    expect(slider1).toHaveAttribute("aria-valuenow", "0");
    expect(slider2).toHaveAttribute("aria-valuemin", "0");
    expect(slider2).toHaveAttribute("aria-valuemax", "100");
    expect(slider2).toHaveAttribute("aria-valuenow", "10");

    rerender(<Test {...props} step={1} min={50} max={100} />);
    expect(slider1).toHaveAttribute("aria-valuemin", "50");
    expect(slider1).toHaveAttribute("aria-valuemax", "100");
    expect(slider1).toHaveAttribute("aria-valuenow", "50");
    expect(slider2).toHaveAttribute("aria-valuemin", "50");
    expect(slider2).toHaveAttribute("aria-valuemax", "100");
    expect(slider2).toHaveAttribute("aria-valuenow", "50");
  });

  describe("keyboard behavior", () => {
    it("should update the value correctly with specific keyboard keys", () => {
      const { getByRole } = render(<Test />);
      const slider1 = getByRole("slider", { name: "Min" });
      const slider2 = getByRole("slider", { name: "Max" });

      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      slider1.focus();
      fireEvent.keyDown(slider1, { key: "ArrowRight" });
      expect(slider1).toHaveAttribute("aria-valuenow", "1");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "PageUp" });
      expect(slider1).toHaveAttribute("aria-valuenow", "11");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "ArrowLeft" });
      expect(slider1).toHaveAttribute("aria-valuenow", "10");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "ArrowLeft" });
      expect(slider1).toHaveAttribute("aria-valuenow", "9");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "PageDown" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "End" });
      expect(slider1).toHaveAttribute("aria-valuenow", "99");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "Home" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "ArrowUp" });
      expect(slider1).toHaveAttribute("aria-valuenow", "1");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "ArrowDown" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.keyDown(slider1, { key: "Tab" });
      slider2.focus();
      fireEvent.keyDown(slider2, { key: "Home" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(slider2, { key: "PageUp" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "11");

      fireEvent.keyDown(slider2, { key: "ArrowLeft" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "10");

      fireEvent.keyDown(slider2, { key: "PageDown" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "1");
    });
  });

  describe("drag behavior", () => {
    it("should work correctly for mouse events", () => {
      const { container, getByRole } = render(<Test />);

      const slider1 = getByRole("slider", { name: "Min" });
      const slider2 = getByRole("slider", { name: "Max" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      jest.spyOn(slider1, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 48,
        top: 0,
        right: 48,
        left: 0,
        bottom: 1000,
        toJSON: () => "",
      }));
      jest.spyOn(slider2, "getBoundingClientRect").mockImplementation(() => ({
        x: 952,
        y: 0,
        height: 20,
        width: 48,
        top: 0,
        right: 1000,
        left: 952,
        bottom: 1000,
        toJSON: () => "",
      }));
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
      expect(slider1).toHaveAttribute("aria-valuenow", "20");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.mouseMove(window, { clientX: 500, clientY: 20 });
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.mouseUp(window);
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.mouseMove(window, { clientX: 200, clientY: 10 });
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");
    });

    it("should work correctly for touch events", () => {
      const { container, getByRole } = render(<Test />);

      const slider1 = getByRole("slider", { name: "Min" });
      const slider2 = getByRole("slider", { name: "Max" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      jest.spyOn(slider1, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 20,
        width: 48,
        top: 0,
        right: 48,
        left: 0,
        bottom: 1000,
        toJSON: () => "",
      }));
      jest.spyOn(slider2, "getBoundingClientRect").mockImplementation(() => ({
        x: 952,
        y: 0,
        height: 20,
        width: 48,
        top: 0,
        right: 1000,
        left: 952,
        bottom: 1000,
        toJSON: () => "",
      }));
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
      fireEvent.touchStart(track, {
        changedTouches: [{ clientX: 200, clientY: 0 }],
      });

      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "20");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.touchMove(window, {
        changedTouches: [{ clientX: 500, clientY: 20 }],
      });
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.touchEnd(window);
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      fireEvent.mouseMove(window, { clientX: 200, clientY: 10 });
      expect(slider1).toHaveAttribute("aria-valuenow", "50");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");
    });

    it("should handle vertical drag events correctly as well", () => {
      const { container, getByRole } = render(<Test vertical />);

      const slider1 = getByRole("slider", { name: "Min" });
      const slider2 = getByRole("slider", { name: "Max" });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "100");

      jest.spyOn(slider1, "getBoundingClientRect").mockImplementation(() => ({
        x: 10,
        y: 1000,
        height: 48,
        width: 20,
        top: 1000,
        right: 20,
        left: 0,
        bottom: 1000,
        toJSON: () => "",
      }));
      jest.spyOn(slider2, "getBoundingClientRect").mockImplementation(() => ({
        x: 10,
        y: 0,
        height: 48,
        width: 20,
        top: 0,
        right: 20,
        left: 0,
        bottom: 952,
        toJSON: () => "",
      }));
      const track =
        container.querySelector<HTMLSpanElement>(".rmd-slider-track");
      if (!track) {
        throw new Error();
      }

      jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
        x: 0,
        y: 0,
        height: 1000,
        width: 20,
        top: 0,
        right: 20,
        left: 0,
        bottom: 1000,
        toJSON: () => "",
      }));
      fireEvent.mouseDown(track, { clientX: 0, clientY: 200 });

      expect(container).toMatchSnapshot();
      // slider 2 gets updated instead for this flow since the clientY is closer to slider2
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "80");

      fireEvent.mouseMove(window, { clientX: 20, clientY: 500 });
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "50");

      fireEvent.mouseUp(window);
      expect(container).toMatchSnapshot();
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "50");

      fireEvent.mouseMove(window, { clientX: 10, clientY: 200 });
      expect(slider1).toHaveAttribute("aria-valuenow", "0");
      expect(slider2).toHaveAttribute("aria-valuenow", "50");
    });
  });

  describe("update behavior", () => {
    it('should only update value value on blur or dragend when the updateOn is set to "blur"', () => {
      const onChange = jest.fn();
      function Test({ blur }: { blur: boolean }): ReactElement {
        const [value, controls] = useRangeSlider([0, 50], {
          onChange,
          updateOn: blur ? "blur" : "change",
        });

        return (
          <>
            <span data-testid="value1">{value[0]}</span>
            <span data-testid="value2">{value[1]}</span>
            <RangeSlider {...controls} baseId="slider" label="Slider" />
          </>
        );
      }

      const { getByRole, getByTestId, rerender } = render(
        <Test blur={false} />
      );
      const value1 = getByTestId("value1");
      const value2 = getByTestId("value2");
      const slider1 = getByRole("slider", { name: "Min" });

      expect(value1.textContent).toBe("0");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "0");

      slider1.focus();
      fireEvent.keyDown(slider1, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value1.textContent).toBe("1");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(slider1, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value1.textContent).toBe("2");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "2");

      slider1.blur();
      // it's pretty much useless to use `onChange` with updateOn === "change"
      expect(onChange).not.toBeCalled();

      rerender(<Test blur />);
      expect(onChange).not.toBeCalled();
      expect(value1.textContent).toBe("2");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "2");

      fireEvent.keyDown(slider1, { key: "ArrowRight" });
      expect(onChange).not.toBeCalled();
      expect(value1.textContent).toBe("2");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "3");

      fireEvent.keyDown(slider1, { key: "Home" });
      expect(onChange).not.toBeCalled();
      expect(value1.textContent).toBe("2");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "0");

      fireEvent.blur(slider1);
      expect(onChange).toBeCalledWith([0, 50]);
      expect(value1.textContent).toBe("0");
      expect(value2.textContent).toBe("50");
      expect(slider1).toHaveAttribute("aria-valuenow", "0");

      slider1.focus();
      fireEvent.keyDown(slider1, { key: "ArrowRight" });
      fireEvent.keyDown(slider1, { key: "ArrowLeft" });
      slider1.blur();
      // should not be called again if value hasn't changed
      expect(onChange).toBeCalledTimes(1);
    });
  });
});
