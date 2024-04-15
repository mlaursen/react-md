"use client";
import { useCallback, useEffect, useState } from "react";
import type { UseStateSetter } from "../types.js";
import { useToggle } from "../useToggle.js";
import { loop } from "../utils/loop.js";
import type { SlideDirection } from "./SlideContainer.js";

/** @since 6.0.0 */
export interface CarouselSlideState {
  direction: SlideDirection;
  activeIndex: number;
}

/** @since 6.0.0 */
export interface CarouselState extends CarouselSlideState {
  paused: boolean;
}

/** @since 6.0.0 */
export interface CarouselImplementation extends CarouselState {
  /**
   * Increments the carousel slide active index by 1 ensuring it does not
   * advance past the {@link CarouselOptions.totalSlides} index.
   */
  increment(): void;

  /**
   * Decrements the carousel slide active index by 1 and prevents decrementing
   * past 0.
   */
  decrement(): void;

  /**
   * This can be used to manually control the {@link paused} state.
   */
  setPaused: UseStateSetter<boolean>;

  /**
   * Toggles the {@link paused} state.
   */
  togglePaused(): void;

  /**
   * A convenience wrapper for the {@link setCarouselSlideState} that will
   * ensure the {@link CarouselSlideState.direction} is correct based on the
   * current active index and next active index.
   */
  setActiveIndex: UseStateSetter<number>;

  /**
   * This can be used if the provided carousel actions do not solve your use
   * case.
   */
  setCarouselSlideState: UseStateSetter<CarouselSlideState>;
}

/**
 * @since 6.0.0
 */
export interface CarouselOptions {
  /**
   * The amount of time in milliseconds each slide should be visible before
   * advancing to the next slide.
   *
   * @defaultValue `8000`
   */
  duration?: number;

  /**
   * The total number of slides within your carousel so that you can safely loop
   * through all slides.
   */
  totalSlides: number;
}

/**
 * @example Accessible Carousel Example
 * ```tsx
 * import { Button, SlideContainer, Slide, useCarousel } from "@react-md/core";
 * import ChevronLeftIcon from "@react-md/material-icons/ChevronLeftIcon";
 * import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
 * import PauseIcon from "@react-md/material-icons/PauseIcon";
 * import PlayArrowIcon from "@react-md/material-icons/PlayArrowIcon";
 * import type { ReactElement } from "react";
 *
 * const slides = [
 *   { title: "Slide 1" },
 *   { title: "Slide 2" },
 *   { title: "Slide 3" },
 * ] as const;
 *
 * function Example(): ReactElement {
 *   const {
 *     paused,
 *     direction,
 *     activeIndex,
 *     togglePaused,
 *     setActiveIndex,
 *     increment,
 *     decrement,
 *   } = useCarousel({
 *     duration: 5000,
 *     totalSlides: slides.length,
 *   });
 *
 *   const slideId = useId();
 *
 *   return (
 *     <div
 *       aria-roledescription="carousel"
 *       aria-label="Carousel"
 *       id={useId()}
 *       role="region"
 *     >
 *       <SlideContainer aria-live="off" direction={direction}>
 *         {slides.map(({ title }, index) => (
 *           <Slide
 *             key={title}
 *             aria-label={`Slide ${index + 1} of ${slides.length - 1}`}
 *             aria-roledescription="slide"
 *             id={`${slideId}-${index}`}
 *             role="group"
 *             active={activeIndex === index}
 *           >
 *             {title}
 *           </Slide>
 *         ))}
 *       </SlideContainer>
 *       <Button
 *         aria-label="Pause"
 *         aria-pressed={paused}
 *         button="icon"
 *         onClick={togglePaused}
 *       >
 *         {paused ? <PlayArrowIcon /> : <PauseIcon />}
 *       </Button>
 *       {slides.map(({ title }, index) => (
 *         <Button
 *           key={title}
 *           aria-label={`Slide ${index + 1}`}
 *           aria-selected={activeIndex === index}
 *           aria-controls={`${slideId}-${index}`}
 *           role="tab"
 *           onClick={() => setActiveIndex(index))}
 *         />
 *       ))}
 *       <Button
 *         aria-label="Previous Slide"
 *         onClick={decrement}
 *         disabled={activeIndex === 0}
 *         buttonType="icon"
 *       >
 *         <ChevronLeftIcon />
 *       </Button>
 *       <Button
 *         aria-label="Next Slide"
 *         onClick={increment}
 *         disabled={activeIndex === slides.length - 1}
 *         buttonType="icon"
 *       >
 *         <ChevronRightIcon />
 *       </Button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/carousel/}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/example-index/carousel/carousel-2-tablist.html}
 */
export function useCarousel(options: CarouselOptions): CarouselImplementation {
  const { duration = 8000, totalSlides } = options;
  const total = totalSlides - 1;

  const [state, setCarouselSlideState] = useState<CarouselSlideState>({
    direction: "left",
    activeIndex: 0,
  });
  const {
    toggled: paused,
    toggle: togglePaused,
    setToggled: setPaused,
  } = useToggle(false);
  const setActiveIndex = useCallback<UseStateSetter<number>>(
    (activeIndexOrGetter) => {
      setCarouselSlideState((prevState) => {
        const prevActiveIndex = prevState.activeIndex;
        const nextActiveIndex =
          typeof activeIndexOrGetter === "function"
            ? activeIndexOrGetter(prevActiveIndex)
            : activeIndexOrGetter;

        return {
          direction: prevActiveIndex < nextActiveIndex ? "left" : "right",
          activeIndex: nextActiveIndex,
        };
      });
    },
    []
  );
  const increment = useCallback(() => {
    setCarouselSlideState((prevState) => ({
      direction: "left",
      activeIndex: Math.min(total, prevState.activeIndex + 1),
    }));
  }, [total]);
  const decrement = useCallback(() => {
    setCarouselSlideState((prevState) => ({
      direction: "right",
      activeIndex: Math.max(0, prevState.activeIndex - 1),
    }));
  }, []);

  const { activeIndex } = state;
  useEffect(() => {
    if (paused) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const nextActiveIndex = loop({
        min: 0,
        max: total,
        value: activeIndex,
        increment: true,
      });
      setCarouselSlideState({
        direction: activeIndex < nextActiveIndex ? "left" : "right",
        activeIndex: nextActiveIndex,
      });
    }, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [paused, duration, activeIndex, total]);

  return {
    ...state,
    increment,
    decrement,
    paused,
    setPaused,
    togglePaused,
    setActiveIndex,
    setCarouselSlideState,
  };
}
