import { type ReactElement, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { drag } from "../../test-utils/drag.js";
import {
  fireEvent,
  getRangeSliderTestElements,
  getSliderTestElements,
  rmdRender,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { type RangeSliderProps, Slider, type SliderProps } from "../Slider.js";
import {
  type RangeSliderImplementation,
  type RangeSliderOptions,
  useRangeSlider,
} from "../useRangeSlider.js";
import {
  type SliderImplementation,
  type SliderOptions,
  useSlider,
} from "../useSlider.js";

const TRACK_SIZE = 400;

interface SingleThumbTestProps
  extends Omit<SliderProps, keyof SliderImplementation> {
  options?: SliderOptions;
}

function SingleThumbTest(props: SingleThumbTestProps): ReactElement {
  const { options, ...remaining } = props;
  const slider = useSlider(options);

  return <Slider {...slider} aria-label="Slider" {...remaining} />;
}

interface RangeSliderTestProps
  extends Omit<RangeSliderProps, keyof RangeSliderImplementation> {
  options?: RangeSliderOptions;
}

function RangeSliderTest(props: RangeSliderTestProps): ReactElement {
  const { options, ...remaining } = props;
  const slider = useRangeSlider(options);

  return <Slider {...slider} aria-label="Slider" {...remaining} />;
}

const setupRangeSliderDragTest = (vertical = false) => {
  const rect = document.body.getBoundingClientRect();
  rmdRender(
    <RangeSliderTest options={{ defaultValue: [30, 60] }} vertical={vertical} />
  );
  const { sliderTrack, minSlider, maxSlider } = getRangeSliderTestElements();

  // with this setup, each value is 4px making calculations easier
  vi.spyOn(sliderTrack, "getBoundingClientRect").mockReturnValue({
    ...rect,
    left: 0,
    right: vertical ? 48 : TRACK_SIZE,
    top: 0,
    bottom: vertical ? TRACK_SIZE : 48,
    height: vertical ? TRACK_SIZE : 48,
    width: vertical ? 48 : TRACK_SIZE,
  });
  // so to mock how it works in the browser, set the `x` location to the `(value * 4)`
  // when vertical, a bigger y value means a lower value, so y is `height - (value * 4)`
  vi.spyOn(minSlider, "getBoundingClientRect").mockImplementation(() => {
    const value = parseInt(minSlider.getAttribute("aria-valuenow") || "", 10);
    const position = value * 4;
    return {
      ...rect,
      x: vertical ? 0 : position,
      y: vertical ? TRACK_SIZE - position : 0,
    };
  });
  vi.spyOn(maxSlider, "getBoundingClientRect").mockImplementation(() => {
    const value = parseInt(maxSlider.getAttribute("aria-valuenow") || "", 10);
    const position = value * 4;
    return {
      ...rect,
      x: vertical ? 0 : position,
      y: vertical ? TRACK_SIZE - position : 0,
    };
  });

  return { sliderTrack, minSlider, maxSlider };
};

describe("Slider", () => {
  describe("single thumb slider", () => {
    it("should apply the correct styling, HTML attributes, and allow a ref", () => {
      const ref = createRef<HTMLDivElement>();
      const { rerender } = rmdRender(<SingleThumbTest containerRef={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toMatchSnapshot();

      rerender(
        <SingleThumbTest
          containerRef={ref}
          style={{ color: "white" }}
          className="custom-class-name"
        />
      );
      expect(ref.current).toMatchSnapshot();
    });

    it("should support a disabled state", () => {
      rmdRender(<SingleThumbTest data-testid="container" disabled />);
      const { slider, sliderInput } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveAttribute("aria-disabled", "true");
      expect(sliderInput).toBeDisabled();

      const container = screen.getByTestId("container");
      expect(container).toMatchSnapshot();
    });

    it("should be able to render addons before and after the slider", () => {
      const props = {
        "data-testid": "container",
        beforeAddon: <span data-testid="before" />,
        afterAddon: "After!",
      };
      const { rerender } = rmdRender(<SingleThumbTest {...props} />);
      const container = screen.getByTestId("container");
      expect(() => screen.getByTestId("before")).not.toThrow();
      expect(() => screen.getByText("After!")).not.toThrow();
      expect(container).toMatchSnapshot();

      rerender(<SingleThumbTest {...props} beforeAddon={null} />);
      expect(() => screen.getByTestId("before")).toThrow();
      expect(() => screen.getByText("After!")).not.toThrow();
      expect(container).toMatchSnapshot();

      rerender(<SingleThumbTest {...props} afterAddon={null} />);
      expect(() => screen.getByTestId("before")).not.toThrow();
      expect(container).toMatchSnapshot();

      rerender(<SingleThumbTest {...props} vertical />);
      expect(() => screen.getByTestId("before")).not.toThrow();
      expect(() => screen.getByText("After!")).not.toThrow();
      expect(container).toMatchSnapshot();

      rerender(<SingleThumbTest {...props} vertical beforeAddon={null} />);
      expect(() => screen.getByTestId("before")).toThrow();
      expect(() => screen.getByText("After!")).not.toThrow();
      expect(container).toMatchSnapshot();

      rerender(<SingleThumbTest {...props} vertical afterAddon={null} />);
      expect(() => screen.getByTestId("before")).not.toThrow();
      expect(container).toMatchSnapshot();
    });

    it("should allow the value to be changed through keyboard movement", async () => {
      const user = userEvent.setup();
      rmdRender(<SingleThumbTest />);

      const { slider, sliderInput } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveValue(50);
      expect(sliderInput).toHaveValue("50");

      await user.tab();
      expect(slider).toHaveFocus();

      await user.keyboard("[Home]");
      expect(slider).toHaveValue(0);
      expect(sliderInput).toHaveValue("0");

      await user.keyboard("[End]");
      expect(slider).toHaveValue(100);
      expect(sliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(slider).toHaveValue(90);
      expect(sliderInput).toHaveValue("90");

      await user.keyboard("[PageDown][PageDown]");
      expect(slider).toHaveValue(70);
      expect(sliderInput).toHaveValue("70");

      await user.keyboard("[PageUp]");
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");

      await user.keyboard("[ArrowLeft]");
      expect(slider).toHaveValue(79);
      expect(sliderInput).toHaveValue("79");

      await user.keyboard("[ArrowLeft][ArrowLeft][ArrowLeft]");
      expect(slider).toHaveValue(76);
      expect(sliderInput).toHaveValue("76");

      await user.keyboard("[ArrowRight]");
      expect(slider).toHaveValue(77);
      expect(sliderInput).toHaveValue("77");

      await user.keyboard("[ArrowRight][ArrowRight][ArrowRight]");
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");

      await user.tab();
      expect(slider).not.toHaveFocus();
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");
    });

    it("should allow the value to be changed through keyboard movement while vertical", async () => {
      const user = userEvent.setup();
      rmdRender(<SingleThumbTest vertical />);

      const { slider, sliderInput } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveValue(50);
      expect(sliderInput).toHaveValue("50");

      await user.tab();
      expect(slider).toHaveFocus();

      await user.keyboard("[Home]");
      expect(slider).toHaveValue(0);
      expect(sliderInput).toHaveValue("0");

      await user.keyboard("[End]");
      expect(slider).toHaveValue(100);
      expect(sliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(slider).toHaveValue(90);
      expect(sliderInput).toHaveValue("90");

      await user.keyboard("[PageDown][PageDown]");
      expect(slider).toHaveValue(70);
      expect(sliderInput).toHaveValue("70");

      await user.keyboard("[PageUp]");
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");

      await user.keyboard("[ArrowDown]");
      expect(slider).toHaveValue(79);
      expect(sliderInput).toHaveValue("79");

      await user.keyboard("[ArrowDown][ArrowDown][ArrowDown]");
      expect(slider).toHaveValue(76);
      expect(sliderInput).toHaveValue("76");

      await user.keyboard("[ArrowUp]");
      expect(slider).toHaveValue(77);
      expect(sliderInput).toHaveValue("77");

      await user.keyboard("[ArrowUp][ArrowUp][ArrowUp]");
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");

      await user.tab();
      expect(slider).not.toHaveFocus();
      expect(slider).toHaveValue(80);
      expect(sliderInput).toHaveValue("80");
    });

    it("should support updating the value using the onChange event handler", async () => {
      rmdRender(<SingleThumbTest />);
      const { sliderInput } = getSliderTestElements({ name: "Slider" });

      expect(sliderInput).toHaveValue("50");

      fireEvent.change(sliderInput, { target: { value: "30" } });
      expect(sliderInput).toHaveValue("30");
    });

    it("should support a default value as a number or function", () => {
      const { unmount } = rmdRender(
        <SingleThumbTest options={{ defaultValue: 30 }} />
      );
      expect(getSliderTestElements({ name: "Slider" }).slider).toHaveValue(30);
      unmount();

      rmdRender(<SingleThumbTest options={{ defaultValue: () => 55 }} />);
      expect(getSliderTestElements({ name: "Slider" }).slider).toHaveValue(55);
    });

    it("should allow for custom step amounts", async () => {
      const user = userEvent.setup();
      rmdRender(<SingleThumbTest options={{ step: 10 }} />);

      const { slider, sliderInput } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveValue(50);
      expect(sliderInput).toHaveValue("50");
      expect(sliderInput).toHaveAttribute("step", "10");

      await user.tab();
      await user.keyboard("[ArrowRight]");
      expect(slider).toHaveValue(60);
      expect(sliderInput).toHaveValue("60");

      await user.keyboard("[ArrowLeft]");
      expect(slider).toHaveValue(50);
      expect(sliderInput).toHaveValue("50");

      // home and end should be unaffected
      await user.keyboard("[Home]");
      expect(slider).toHaveValue(0);
      await user.keyboard("[End]");
      expect(slider).toHaveValue(100);
    });

    it("should allow the user to click on the track to quickly jump to a specific value", () => {
      const rect = document.body.getBoundingClientRect();
      rmdRender(<SingleThumbTest />);

      const { sliderTrack, slider } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveValue(50);

      vi.spyOn(sliderTrack, "getBoundingClientRect").mockReturnValue({
        ...rect,
        left: 0,
        right: TRACK_SIZE,
        top: 0,
        bottom: 48,
        height: 48,
        width: TRACK_SIZE,
      });
      fireEvent.mouseDown(sliderTrack, { clientX: 40 });
      expect(slider).toHaveValue(10);
      // need to apply focus for Chromium based browsers
      expect(slider).toHaveFocus();

      // if the user stutters while clicking
      fireEvent.mouseMove(sliderTrack, { clientX: 45 });
      expect(slider).toHaveValue(11);

      fireEvent.mouseMove(sliderTrack, { clientX: 41 });
      expect(slider).toHaveValue(10);
      fireEvent.mouseUp(sliderTrack, { clientX: 41 });
      expect(slider).toHaveValue(10);
      expect(slider).not.toHaveFocus();
    });

    it("should allow the user to click anywhere in the slider to start dragging to a new value", async () => {
      const rect = document.body.getBoundingClientRect();
      rmdRender(<SingleThumbTest />);

      const { sliderTrack, slider } = getSliderTestElements({ name: "Slider" });
      expect(slider).toHaveValue(50);

      vi.spyOn(sliderTrack, "getBoundingClientRect").mockReturnValue({
        ...rect,
        left: 0,
        right: TRACK_SIZE,
        top: 0,
        bottom: 48,
        height: 48,
        width: TRACK_SIZE,
      });

      await drag(sliderTrack, {
        to: {
          x: 300,
          y: -100,
        },
      });
      expect(slider).toHaveValue(75);

      await drag(sliderTrack, {
        to: {
          x: -300,
          y: 100,
        },
      });
      expect(slider).toHaveValue(0);
    });

    it("should allow the input name to be set preferring the thumbProps.name if it exists", () => {
      const { rerender } = rmdRender(<SingleThumbTest />);
      const { sliderInput } = getSliderTestElements({ name: "Slider" });

      expect(sliderInput).not.toHaveAttribute("name");

      rerender(<SingleThumbTest name="volume" />);
      expect(sliderInput).toHaveAttribute("name", "volume");

      rerender(<SingleThumbTest thumbProps={{ name: "intensity" }} />);
      expect(sliderInput).toHaveAttribute("name", "intensity");

      rerender(
        <SingleThumbTest name="volume" thumbProps={{ name: "intensity" }} />
      );
      expect(sliderInput).toHaveAttribute("name", "intensity");
    });
  });

  describe("range slider", () => {
    it("should apply the correct styling, HTML attributes, and allow a ref", () => {
      const ref = createRef<HTMLDivElement>();
      const { rerender } = rmdRender(<RangeSliderTest containerRef={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toMatchSnapshot();

      rerender(
        <SingleThumbTest
          containerRef={ref}
          style={{ color: "white" }}
          className="custom-class-name"
        />
      );
      expect(ref.current).toMatchSnapshot();
    });

    it("should support a disabled state", () => {
      rmdRender(<RangeSliderTest data-testid="container" disabled />);
      const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
        getRangeSliderTestElements();
      expect(minSlider).toHaveAttribute("aria-disabled", "true");
      expect(minSliderInput).toBeDisabled();
      expect(maxSlider).toHaveAttribute("aria-disabled", "true");
      expect(maxSliderInput).toBeDisabled();

      const container = screen.getByTestId("container");
      expect(container).toMatchSnapshot();
    });

    it("should support updating the value using the onChange event handler", async () => {
      rmdRender(<RangeSliderTest />);
      const { minSliderInput, maxSliderInput } = getRangeSliderTestElements();

      expect(minSliderInput).toHaveValue("0");
      expect(maxSliderInput).toHaveValue("100");

      fireEvent.change(minSliderInput, { target: { value: "30" } });
      expect(minSliderInput).toHaveValue("30");

      fireEvent.change(maxSliderInput, { target: { value: "40" } });
      expect(maxSliderInput).toHaveValue("40");
    });

    it("should allow the value to be changed through keyboard movement", async () => {
      const user = userEvent.setup();
      rmdRender(<RangeSliderTest />);

      const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
        getRangeSliderTestElements();
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.tab();
      expect(minSlider).toHaveFocus();

      // re-verify the min slider works
      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(99);
      expect(minSliderInput).toHaveValue("99");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(99);
      expect(minSliderInput).toHaveValue("99");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowLeft]");
      expect(minSlider).toHaveValue(98);
      expect(minSliderInput).toHaveValue("98");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowLeft][ArrowLeft]");
      expect(minSlider).toHaveValue(96);
      expect(minSliderInput).toHaveValue("96");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(86);
      expect(minSliderInput).toHaveValue("86");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown][PageDown][ArrowRight]");
      expect(minSlider).toHaveValue(67);
      expect(minSliderInput).toHaveValue("67");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowRight]");
      expect(minSlider).toHaveValue(68);
      expect(minSliderInput).toHaveValue("68");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowLeft]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowRight][PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      // now re-verify the max slider works
      await user.tab();
      expect(maxSlider).toHaveFocus();
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowRight]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowLeft]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(99);
      expect(maxSliderInput).toHaveValue("99");

      await user.keyboard("[ArrowLeft][PageDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(88);
      expect(maxSliderInput).toHaveValue("88");

      await user.keyboard("[PageDown][PageDown][ArrowLeft]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(67);
      expect(maxSliderInput).toHaveValue("67");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(77);
      expect(maxSliderInput).toHaveValue("77");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[ArrowLeft]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");
    });

    it("should allow the value to be changed through keyboard movement and vertical", async () => {
      const user = userEvent.setup();
      rmdRender(<RangeSliderTest vertical />);

      const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
        getRangeSliderTestElements();
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.tab();
      expect(minSlider).toHaveFocus();

      // re-verify the min slider works
      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(99);
      expect(minSliderInput).toHaveValue("99");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(99);
      expect(minSliderInput).toHaveValue("99");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowDown]");
      expect(minSlider).toHaveValue(98);
      expect(minSliderInput).toHaveValue("98");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowDown][ArrowDown]");
      expect(minSlider).toHaveValue(96);
      expect(minSliderInput).toHaveValue("96");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(86);
      expect(minSliderInput).toHaveValue("86");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown][PageDown][ArrowUp]");
      expect(minSlider).toHaveValue(67);
      expect(minSliderInput).toHaveValue("67");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowUp]");
      expect(minSlider).toHaveValue(68);
      expect(minSliderInput).toHaveValue("68");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowDown]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(0);
      expect(minSliderInput).toHaveValue("0");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowUp][PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      // now re-verify the max slider works
      await user.tab();
      expect(maxSlider).toHaveFocus();
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");

      await user.keyboard("[ArrowDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(99);
      expect(maxSliderInput).toHaveValue("99");

      await user.keyboard("[ArrowDown][PageDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(88);
      expect(maxSliderInput).toHaveValue("88");

      await user.keyboard("[PageDown][PageDown][ArrowDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(67);
      expect(maxSliderInput).toHaveValue("67");

      await user.keyboard("[PageUp]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(77);
      expect(maxSliderInput).toHaveValue("77");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[Home]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[ArrowDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[PageDown]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(12);
      expect(maxSliderInput).toHaveValue("12");

      await user.keyboard("[End]");
      expect(minSlider).toHaveValue(11);
      expect(minSliderInput).toHaveValue("11");
      expect(maxSlider).toHaveValue(100);
      expect(maxSliderInput).toHaveValue("100");
    });

    it("should allow the user to configure the thumb labels", () => {
      const { rerender } = rmdRender(
        <RangeSliderTest minThumbLabel="Minimum" maxThumbLabel="Maximum" />
      );
      expect(() =>
        getRangeSliderTestElements({
          min: { name: "Minimum" },
          max: { name: "Maximum" },
        })
      ).not.toThrow();

      rerender(
        <>
          <span id="label-1">Hello</span>
          <span id="label-2">World</span>
          <RangeSliderTest
            minThumbLabelledBy="label-1"
            maxThumbLabelledBy="label-2"
          />
        </>
      );
      const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
        getRangeSliderTestElements({
          min: { name: "Hello" },
          max: { name: "World" },
        });

      expect(minSlider).not.toHaveAttribute("aria-label");
      expect(minSliderInput).not.toHaveAttribute("aria-label");
      expect(maxSlider).not.toHaveAttribute("aria-label");
      expect(maxSliderInput).not.toHaveAttribute("aria-label");
    });

    it("should support a default value as a number or function", () => {
      const { unmount } = rmdRender(
        <RangeSliderTest options={{ defaultValue: [30, 60] }} />
      );
      let { minSlider, maxSlider } = getRangeSliderTestElements();
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);
      unmount();

      rmdRender(<RangeSliderTest options={{ defaultValue: () => [55, 80] }} />);
      ({ minSlider, maxSlider } = getRangeSliderTestElements());
      expect(minSlider).toHaveValue(55);
      expect(maxSlider).toHaveValue(80);
    });

    it("should find the closest thumb when clicking somewhere on the track before jumping and dragging", () => {
      const { minSlider, maxSlider, sliderTrack } = setupRangeSliderDragTest();
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseDown(sliderTrack, { clientX: 100 });
      expect(minSlider).toHaveFocus();
      expect(minSlider).toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(25);
      expect(maxSlider).toHaveValue(60);

      // switch to document.body since the dragging class gets applied which
      // removes pointer-events from the rest of the document while dragging
      fireEvent.mouseMove(document.body, { clientX: 101 });
      expect(minSlider).toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(25);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseUp(document.body, { clientX: 102 });
      expect(minSlider).not.toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseDown(sliderTrack, { clientX: 255 });
      expect(maxSlider).toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);

      fireEvent.mouseMove(document.body, { clientX: 254 });
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);

      fireEvent.mouseUp(document.body, { clientX: 255 });
      expect(maxSlider).not.toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);
    });

    it("should choose the min slider if the click event is exactly in the middle between the two thumbs", () => {
      const { minSlider, maxSlider, sliderTrack } = setupRangeSliderDragTest();
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseDown(sliderTrack, { clientX: 180 });
      expect(minSlider).toHaveFocus();
      expect(minSlider).toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(45);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseUp(sliderTrack, { clientX: 180 });
      expect(minSlider).not.toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(45);
      expect(maxSlider).toHaveValue(60);
    });

    it("should find the closest thumb when clicking somewhere on the track before jumping and dragging while vertical", () => {
      const { minSlider, maxSlider, sliderTrack } =
        setupRangeSliderDragTest(true);
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseDown(sliderTrack, {
        // TRACK_SIZE - (25 * 4)
        clientY: 300,
      });
      expect(minSlider).toHaveFocus();
      expect(minSlider).toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(25);
      expect(maxSlider).toHaveValue(60);

      // switch to document.body since the dragging class gets applied which
      // removes pointer-events from the rest of the document while dragging
      fireEvent.mouseMove(document.body, {
        // TRACK_SIZE - (25 * 4 - 1)
        clientY: 299,
      });
      expect(minSlider).toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(25);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseUp(document.body, {
        // TRACK_SIZE - (25 * 4 - 2)
        clientY: 298,
      });
      expect(minSlider).not.toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(60);

      fireEvent.mouseDown(sliderTrack, {
        // TRACK_SIZE - (64 * 4)
        clientY: 144,
      });
      expect(maxSlider).toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);

      fireEvent.mouseMove(document.body, {
        // TRACK_SIZE - (64 * 4 + 1)
        clientY: 143,
      });
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);

      fireEvent.mouseUp(document.body, { clientY: 144 });
      expect(maxSlider).not.toHaveFocus();
      expect(minSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(maxSlider).not.toHaveClass("rmd-slider-thumb--active");
      expect(minSlider).toHaveValue(26);
      expect(maxSlider).toHaveValue(64);
    });

    it("should allow the user to click anywhere in the slider to start dragging to a new value", async () => {
      const { minSlider, maxSlider, sliderTrack } = setupRangeSliderDragTest();
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);

      await drag(sliderTrack, {
        from: {
          x: 180,
          y: 0,
        },
        to: {
          x: 300,
          y: -100,
        },
      });
      // it should prevent dragging past the other thumb
      expect(minSlider).toHaveValue(59);
      expect(maxSlider).toHaveValue(60);

      await drag(sliderTrack, {
        to: {
          x: -300,
          y: 100,
        },
      });
      expect(minSlider).toHaveValue(0);
      expect(maxSlider).toHaveValue(60);
    });

    it("should allow the user to click anywhere in the slider to start dragging to a new value while vertical", async () => {
      const { minSlider, maxSlider, sliderTrack } =
        setupRangeSliderDragTest(true);
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(60);

      await drag(sliderTrack, {
        from: {
          x: 0,
          y: 160,
        },
        to: {
          x: 100,
          y: 800,
        },
      });
      // it should prevent dragging past the other thumb
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(31);

      await drag(sliderTrack, {
        to: {
          x: 10,
          y: -100,
        },
      });
      expect(minSlider).toHaveValue(30);
      expect(maxSlider).toHaveValue(100);
    });

    it("should automatically prefix the input name with min and max if it was provided", () => {
      const { rerender } = rmdRender(<RangeSliderTest />);
      const { minSliderInput, maxSliderInput } = getRangeSliderTestElements();

      expect(minSliderInput).not.toHaveAttribute("name");
      expect(maxSliderInput).not.toHaveAttribute("name");

      rerender(<RangeSliderTest name="volume" />);
      expect(minSliderInput).toHaveAttribute("name", "minvolume");
      expect(maxSliderInput).toHaveAttribute("name", "maxvolume");
    });

    it("should not automatically prefix the input name with min and max if the name prop is an array-like name", () => {
      rmdRender(<RangeSliderTest name="volume[]" />);
      const { minSliderInput, maxSliderInput } = getRangeSliderTestElements();

      expect(minSliderInput).toHaveAttribute("name", "volume[]");
      expect(maxSliderInput).toHaveAttribute("name", "volume[]");
    });

    it("should allow the min and max name props to be overridden by the thumb props objects", () => {
      const { rerender } = rmdRender(
        <RangeSliderTest
          minThumbProps={{ name: "intensity" }}
          maxThumbProps={{ name: "value" }}
        />
      );

      const { minSliderInput, maxSliderInput } = getRangeSliderTestElements();
      expect(minSliderInput).toHaveAttribute("name", "intensity");
      expect(maxSliderInput).toHaveAttribute("name", "value");

      rerender(
        <RangeSliderTest
          name="volume"
          minThumbProps={{ name: "intensity" }}
          maxThumbProps={{ name: "value" }}
        />
      );
      expect(minSliderInput).toHaveAttribute("name", "intensity");
      expect(maxSliderInput).toHaveAttribute("name", "value");
    });
  });

  describe("discrete sliders", () => {
    it("should support rendering a tooltip while focused or dragging by enabling the discrete prop", async () => {
      const user = userEvent.setup();
      rmdRender(<SingleThumbTest discrete />);
      expect(() => screen.getByRole("tooltip")).toThrow();
      const { slider } = getSliderTestElements({ name: "Slider" });
      await user.tab();
      expect(slider).toHaveFocus();

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveTextContent("50");
      expect(tooltip).toMatchSnapshot();

      await user.keyboard("[PageUp]");
      expect(tooltip).toHaveTextContent("60");
      expect(tooltip).toMatchSnapshot();

      await user.tab();
      expect(tooltip).not.toBeInTheDocument();
    });

    it("should support rendering the tooltip while hovered", async () => {
      const user = userEvent.setup();
      rmdRender(<SingleThumbTest discrete tooltipVisibility="hover" />);
      expect(() => screen.getByRole("tooltip")).toThrow();
      const { slider } = getSliderTestElements({ name: "Slider" });
      await user.hover(slider);

      let tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveTextContent("50");

      await user.unhover(slider);
      expect(tooltip).not.toBeInTheDocument();

      await user.tab();
      expect(slider).toHaveFocus();
      tooltip = screen.getByRole("tooltip");
      await user.tab();
      expect(tooltip).not.toBeInTheDocument();
    });

    it("should support rendering the tooltip always", async () => {
      const { rerender } = rmdRender(
        <SingleThumbTest discrete tooltipVisibility="always" />
      );

      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveTextContent("50");

      rerender(
        <SingleThumbTest discrete tooltipVisibility="always" disabled />
      );
      expect(tooltip).toBeInTheDocument();
    });

    it("should support rendering a tooltip while focused or dragging by enabling the discrete prop for range sliders", async () => {
      const user = userEvent.setup();
      rmdRender(<RangeSliderTest discrete />);
      const { minSlider, maxSlider } = getRangeSliderTestElements();
      expect(() => screen.getByRole("tooltip")).toThrow();
      await user.tab();
      expect(minSlider).toHaveFocus();

      const minTooltip = screen.getByRole("tooltip");
      expect(minTooltip).toHaveTextContent("0");
      expect(minTooltip).toMatchSnapshot();

      await user.keyboard("[PageUp]");
      expect(minTooltip).toHaveTextContent("10");
      expect(minTooltip).toMatchSnapshot();

      await user.tab();
      expect(minTooltip).not.toBeInTheDocument();
      expect(maxSlider).toHaveFocus();

      const maxTooltip = screen.getByRole("tooltip");
      expect(maxTooltip).toHaveTextContent("100");
      expect(maxTooltip).toMatchSnapshot();
    });

    it("should support rendering a tooltip while hovered by enabling the discrete prop for range sliders", async () => {
      const user = userEvent.setup();
      rmdRender(<RangeSliderTest discrete tooltipVisibility="hover" />);
      const { minSlider, maxSlider } = getRangeSliderTestElements();
      expect(() => screen.getByRole("tooltip")).toThrow();
      await user.hover(minSlider);

      let minTooltip = screen.getByRole("tooltip");
      expect(minTooltip).toHaveTextContent("0");

      await user.unhover(minSlider);
      expect(minTooltip).not.toBeInTheDocument();

      await user.tab();
      expect(minSlider).toHaveFocus();
      minTooltip = screen.getByRole("tooltip");

      await user.hover(maxSlider);
      expect(minTooltip).toBeInTheDocument();
      let [, maxTooltip] = screen.getAllByRole("tooltip");
      expect(maxTooltip).toBeInTheDocument();
      expect(maxTooltip).toHaveTextContent("100");

      await user.unhover(maxSlider);
      expect(maxTooltip).not.toBeInTheDocument();

      await user.tab();
      expect(minTooltip).not.toBeInTheDocument();
      expect(maxSlider).toHaveFocus();
      maxTooltip = screen.getByRole("tooltip");

      await user.hover(minTooltip);
      [minTooltip] = screen.getAllByRole("tooltip");
      expect(minTooltip).toBeInTheDocument();
      expect(maxTooltip).toBeInTheDocument();
      expect(minTooltip).toHaveTextContent("0");
      expect(maxTooltip).toHaveTextContent("100");
    });

    it("should support rendering marks at each step on the slider", () => {
      rmdRender(
        <SingleThumbTest
          discrete
          options={{ step: 10 }}
          marks
          getMarkProps={({ value }) => ({
            "data-testid": `mark-${value}`,
          })}
        />
      );
      const { sliderContainer } = getSliderTestElements({ name: "Slider" });
      const marks = screen.getAllByTestId(/^mark-/);
      expect(marks).toHaveLength(11);
      expect(sliderContainer).toMatchSnapshot();
    });

    it("should support manually defining the marks using a list", () => {
      rmdRender(
        <SingleThumbTest
          marks={[{ value: 0 }, { value: 20 }, { value: 50 }, { value: 100 }]}
          options={{ step: 10 }}
          getMarkProps={({ value }) => ({
            "data-testid": `mark-${value}`,
          })}
        />
      );
      const { sliderContainer } = getSliderTestElements({ name: "Slider" });
      const marks = screen.getAllByTestId(/^mark-/);
      expect(marks).toHaveLength(4);
      expect(sliderContainer).toMatchSnapshot();
    });

    it("should allow for marks to have custom labels", () => {
      rmdRender(
        <SingleThumbTest
          marks={[
            { value: 0, label: "First" },
            { value: 20, label: "Second" },
            { value: 50, label: "Third" },
            { value: 100, label: "Fourth" },
          ]}
          options={{ step: 10 }}
          getMarkProps={({ value }) => ({
            "data-testid": `mark-${value}`,
          })}
        />
      );
      const { sliderContainer } = getSliderTestElements({ name: "Slider" });
      const marks = screen.getAllByTestId(/^mark-/);
      expect(marks).toHaveLength(4);
      expect(() => screen.getByText("First")).not.toThrow();
      expect(() => screen.getByText("Second")).not.toThrow();
      expect(() => screen.getByText("Third")).not.toThrow();
      expect(() => screen.getByText("Fourth")).not.toThrow();
      expect(sliderContainer).toMatchSnapshot();
    });
  });
});
