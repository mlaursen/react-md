import {
  type BoundFunctions,
  type ByRoleOptions,
  type queries,
  screen,
  within,
} from "@testing-library/dom";

/**
 * @since 6.0.0
 */
export interface GetPartsByRoleOptions extends ByRoleOptions {
  /** @defaultValue `screen` */
  container?: BoundFunctions<typeof queries>;
}

/**
 * @since 6.0.0
 */
export interface SelectTestElements {
  /**
   * The element that should be interacted with for showing and hiding the
   * listbox of available options in the `Select`.
   */
  select: HTMLDivElement;

  /**
   * The input element storing the current value for the `Select`. This should
   * be used to verify a specific option has been selected and will be the
   * `Option`'s `value` prop.
   *
   * i.e. Selecting `<Option value="a">Option 1</Option>` -> `selectInput`
   * would have value `"a"`.
   */
  selectInput: HTMLInputElement;

  /**
   * The current selected option that is shown in the `Select` underneath the
   * floating label. This should be used if the selected option label needs to
   * be verified instead of the value.
   *
   * i.e. Selecting `<Option value="a">Option 1</Option>` -> `selectedOption`
   * would have text content `"Option 1"`.
   */
  selectedOption: HTMLDivElement;
}

/**
 * @example Simple Example
 * ```tsx
 * import {
 *   getSelectTestElements,
 *   screen,
 *   rmdRender,
 *   userEvent,
 * } from "@react-md/core/test-utils";
 *
 * it("should be able to verify the display value", async () => {
 *   const user = userEvent.setup();
 *   rmdRender(<SimpleSelect />);
 *
 *   const { select, selectInput, selectedOption } = getSelectTestElements({
 *     name: "Label",
 *   });
 *   // this isn't required, but added to show what element this is
 *   expect(selectedOption).toHaveClass("rmd-selected-option");
 *
 *   // there is currently no selected value
 *   expect(selectedOption).toHaveTextContent("");
 *
 *   await user.click(select);
 *   await user.click(screen.getByRole("option", { name: "Option 1" }));
 *   expect(selectInput).toHaveValue("a");
 *   expect(selectedOption).toHaveTextContent("Option 1");
 * });
 * ```
 *
 * @since 6.0.0
 */
export function getSelectTestElements(
  options: GetPartsByRoleOptions
): SelectTestElements {
  const { container = screen, ...byRoleOptions } = options;
  const select = container.getByRole<HTMLDivElement>("combobox", byRoleOptions);
  const selectInput = within(select).getByRole<HTMLInputElement>("textbox", {
    hidden: true,
  });
  const selectedOption = select.firstElementChild;
  if (!(selectedOption instanceof HTMLDivElement)) {
    throw new Error("Unable to find the `Select` selected option element");
  }

  return {
    select,
    selectInput,
    selectedOption,
  };
}

/**
 * @since 6.0.0
 */
export interface SliderTestElements {
  /**
   * The element that is visible to screen readers and can be updated using
   * drag, touch, or keyboard events. Since this is usually annoying for tests,
   * the `sliderInput` should normally be used instead.
   */
  slider: HTMLSpanElement;

  /**
   * The element that is hidden to screen readers but stores the current value
   * and can be updated using
   * `fireEvent.change(sliderInput, { target: { value: "100" }})`.
   */
  sliderInput: HTMLInputElement;
}

/**
 * @example Simple Example
 * ```tsx
 * function Test(): ReactElement {
 *   const slider = useSlider({ defaultValue: 30 });
 *   return <Slider {...slider} aria-label="Example" />;
 * }
 *
 * rmdRender(<Test />);
 *
 * const { slider, sliderInput } = getSliderTestElements({ name: "Example" });
 *
 * expect(slider).toHaveValue(30);
 * expect(sliderInput).toHaveValue("30");
 *
 * fireEvent.change(sliderInput, { target: { value: "55" }});
 * expect(slider).toHaveValue(55);
 * expect(sliderInput).toHaveValue("55");
 * ```
 *
 * @since 6.0.0
 */
export function getSliderTestElements(
  options: GetPartsByRoleOptions
): SliderTestElements {
  const { container = screen, ...byRoleOptions } = options;
  const slider = container.getByRole<HTMLSpanElement>("slider", byRoleOptions);
  const sliderInput = slider.nextElementSibling;
  if (!(sliderInput instanceof HTMLInputElement)) {
    throw new Error("Unable to find the `Slider` input element");
  }

  return {
    slider,
    sliderInput,
  };
}

/**
 * @since 6.0.0
 */
export interface GetRangetSliderTestElementsOptions {
  /** @defaultValue `screen` */
  container?: BoundFunctions<typeof queries>;

  /** @defaultValue `{ name: "Min" }` */
  min?: ByRoleOptions;

  /** @defaultValue `{ name: "Max" }` */
  max?: ByRoleOptions;
}

/**
 * @since 6.0.0
 */
export interface RangeSliderTestElements {
  /** @see {@link SliderTestElements.slider} */
  minSlider: HTMLSpanElement;
  /** @see {@link SliderTestElements.sliderInput} */
  minSliderInput: HTMLInputElement;
  /** @see {@link SliderTestElements.slider} */
  maxSlider: HTMLSpanElement;
  /** @see {@link SliderTestElements.sliderInput} */
  maxSliderInput: HTMLInputElement;
}

/**
 * @example Simple Example
 * ```tsx
 * function Test(): ReactElement {
 *   const slider = useRangeSlider({ defaultValue: [30, 60] });
 *   return <Slider {...slider} aria-label="Example" />;
 * }
 *
 * rmdRender(<Test />);
 *
 * const { slider, sliderInput } = getSliderTestElements();
 *
 * const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
 *   getRangeSliderTestElements();
 * expect(minSlider).toHaveValue(30);
 * expect(minSliderInput).toHaveValue("30");
 * expect(maxSlider).toHaveAttribute(60);
 * expect(maxSliderInput).toHaveValue("60");
 *
 * fireEvent.change(minSliderInput, { target: { value: "55" }});
 * expect(minSlider).toHaveValue(55);
 * expect(minSliderInput).toHaveValue("55");
 * expect(maxSlider).toHaveAttribute(60);
 * expect(maxSliderInput).toHaveValue("60");
 *
 * fireEvent.change(maxSliderInput, { target: { value: "88" }});
 * expect(minSlider).toHaveValue(55);
 * expect(minSliderInput).toHaveValue("55");
 * expect(maxSlider).toHaveAttribute(88);
 * expect(maxSliderInput).toHaveValue("88");
 * ```
 *
 * @since 6.0.0
 */
export function getRangeSliderTestElements(
  options: GetRangetSliderTestElementsOptions = {}
): RangeSliderTestElements {
  const { container = screen, min, max } = options;
  const minSlider = container.getByRole<HTMLSpanElement>(
    "slider",
    min ?? { name: "Min" }
  );
  const maxSlider = container.getByRole<HTMLSpanElement>(
    "slider",
    max ?? { name: "Max" }
  );
  const minSliderInput = minSlider.nextElementSibling;
  const maxSliderInput = maxSlider.nextElementSibling;
  if (!(minSliderInput instanceof HTMLInputElement)) {
    throw new Error("Unable to find the `Slider` min input element");
  }
  if (!(maxSliderInput instanceof HTMLInputElement)) {
    throw new Error("Unable to find the `Slider` max input element");
  }

  return {
    minSlider,
    minSliderInput,
    maxSlider,
    maxSliderInput,
  };
}
