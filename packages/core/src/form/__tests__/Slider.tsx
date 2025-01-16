import { describe, expect, it } from "@jest/globals";
import { createRef, type ReactElement } from "react";
import {
  fireEvent,
  getRangeSliderTestElements,
  getSliderTestElements,
  rmdRender,
  screen,
  userEvent,
} from "test-utils";
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
  });
});
