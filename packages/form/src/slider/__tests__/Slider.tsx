import React, { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { Slider, SliderProps } from "../Slider";
import { SliderStepOptions, SliderValue } from "../types";
import { useSlider } from "../useSlider";

interface TestProps
  extends SliderStepOptions,
    Pick<
      SliderProps,
      | "thumbProps"
      | "onMouseDown"
      | "onTouchStart"
      | "vertical"
      | "disabled"
      | "getValueText"
    > {
  defaultValue?: SliderValue;
}

function Test({
  defaultValue,
  disabled,
  vertical,
  thumbProps,
  onMouseDown,
  onTouchStart,
  getValueText,
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
    const onKeyDown = jest.fn();
    const onMouseDown = jest.fn();
    const onTouchStart = jest.fn();

    const { getByRole } = render(
      <Test
        thumbProps={{ onKeyDown }}
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
    });
  });
});
