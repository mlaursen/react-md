import {
  type BoundFunctions,
  type ByRoleOptions,
  type queries,
  screen,
} from "@testing-library/dom";

import { type GetPartsByRoleOptions } from "./types.js";

type Elements = Omit<SliderTestElements, "slider">;

function getElements(slider: HTMLSpanElement): Elements {
  const sliderInput = slider.nextElementSibling;
  const sliderTrack = slider.parentElement;
  const sliderContainer = sliderTrack?.parentElement;
  if (!(sliderInput instanceof HTMLInputElement)) {
    throw new Error("Unable to find the `Slider` input element");
  }
  if (
    !(sliderTrack instanceof HTMLSpanElement) ||
    !sliderTrack.classList.contains("rmd-slider-track")
  ) {
    throw new Error("Unable to find the `Slider` track element");
  }
  if (
    !(sliderContainer instanceof HTMLDivElement) ||
    !sliderContainer.classList.contains("rmd-slider-container")
  ) {
    throw new Error("Unable to find the `Slider` container element");
  }

  return { sliderInput, sliderTrack, sliderContainer };
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

  /**
   * This is only useful when needing to verify that clicking somewhere on the
   * track updates the value. Most test cases can be solved through the
   * {@link slider} or {@link sliderInput} instead.
   */
  sliderTrack: HTMLSpanElement;

  /**
   * Returns the slider container element if it is needed for testing. It's
   * useful for simple snapshot tests.
   */
  sliderContainer: HTMLDivElement;
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

  return {
    slider,
    ...getElements(slider),
  };
}

/**
 * @see {@link getSliderTestElements}
 * @since 6.0.0
 */
export async function findSliderTestElements(
  options: GetPartsByRoleOptions
): Promise<SliderTestElements> {
  const { container = screen, ...byRoleOptions } = options;
  const slider = await container.findByRole<HTMLSpanElement>(
    "slider",
    byRoleOptions
  );

  return {
    slider,
    ...getElements(slider),
  };
}

/**
 * @since 6.0.0
 */
export interface GetRangeSliderTestElementsOptions {
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
  /** @see {@link SliderTestElements.sliderTrack} */
  sliderTrack: HTMLSpanElement;
  /** @see {@link SliderTestElements.sliderContainer} */
  sliderContainer: HTMLDivElement;
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
  options: GetRangeSliderTestElementsOptions = {}
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

  const {
    sliderInput: minSliderInput,
    sliderTrack,
    sliderContainer,
  } = getElements(minSlider);
  const { sliderInput: maxSliderInput } = getElements(maxSlider);

  return {
    minSlider,
    minSliderInput,
    maxSlider,
    maxSliderInput,
    sliderTrack,
    sliderContainer,
  };
}

/**
 * @see {@link getRangeSliderTestElements}
 * @since 6.0.0
 */
export async function findRangeSliderTestElements(
  options: GetRangeSliderTestElementsOptions = {}
): Promise<RangeSliderTestElements> {
  const { container = screen, min, max } = options;
  const minSlider = await container.findByRole<HTMLSpanElement>(
    "slider",
    min ?? { name: "Min" }
  );
  const maxSlider = await container.findByRole<HTMLSpanElement>(
    "slider",
    max ?? { name: "Max" }
  );
  const {
    sliderInput: minSliderInput,
    sliderTrack,
    sliderContainer,
  } = getElements(minSlider);
  const { sliderInput: maxSliderInput } = getElements(maxSlider);

  return {
    minSlider,
    minSliderInput,
    maxSlider,
    maxSliderInput,
    sliderTrack,
    sliderContainer,
  };
}
