import React, {
  createRef,
  CSSProperties,
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import { loop } from "../../loop";
import { LabelRequiredForA11y } from "../../types";
import { tryToSubmitRelatedForm } from "../tryToSubmitRelatedForm";
import { RadioWidget } from "./RadioWidget";
import {
  RadioWidgetAttributes,
  RadioItemStyleObject,
  RadioItem,
} from "./types";
import {
  defaultGetRadioClassName,
  defaultGetRadioStyle,
  getRadioItemValue,
} from "./utils";

/**
 * This is a controlled component to render a group of radio buttons when the
 * `<input type="radio">` does not work.
 *
 * @remarks \@since 2.7.0
 */
export interface BaseRadioGroupProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "onChange"> {
  /**
   */
  id: string;

  /**
   * The current value for the radio group. This should be the empty string
   * (`""`) if no values are selected. Otherwise it should match one of the
   * `values`' value.
   */
  value: string;

  /**
   * A list of values/radio props that should be used to render the radio items.
   */
  items: readonly RadioItem[];

  /**
   * A function that changes the current selection within the radio group.
   */
  onChange(nextValue: string): void;

  /**
   * An optional function to get a `style` object for each rendered radio.
   */
  getRadioStyle?(item: RadioItemStyleObject): CSSProperties | undefined;

  /**
   * An optional function to get a `className` for each rendered radio.
   */
  getRadioClassName?(item: RadioItemStyleObject): string | undefined;
}

/**
 * @remarks \@since 2.7.0
 */
export type RadioGroupProps = LabelRequiredForA11y<BaseRadioGroupProps>;

/**
 * The `RadioGroup` is a low-level component that does not provide any styles
 * and instead only provides the accessibility required for a
 * `role="radiogroup"` and rendering each `role="radio"` item.
 *
 * @remarks \@since 2.7.0
 */
export const RadioGroup = forwardRef<HTMLSpanElement, RadioGroupProps>(
  function RadioGroup(
    {
      id,
      getRadioStyle = defaultGetRadioStyle,
      getRadioClassName = defaultGetRadioClassName,
      items,
      value: currentValue,
      onBlur,
      onFocus,
      onClick,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const refs = items.map(() => createRef<HTMLSpanElement>());
    const [focused, setFocused] = useState(false);
    const handleBlur = useCallback(
      (event: FocusEvent<HTMLSpanElement>) => {
        onBlur?.(event);
        setFocused(false);
      },
      [onBlur]
    );
    const handleFocus = useCallback(
      (event: FocusEvent<HTMLSpanElement>) => {
        onFocus?.(event);
        setFocused(true);
      },
      [onFocus]
    );
    const handleClick = useCallback(
      (event: MouseEvent<HTMLSpanElement>) => {
        onClick?.(event);

        /* istanbul ignore next: can't really happen */
        const radio = (event.target as HTMLElement)?.closest<HTMLSpanElement>(
          '[role="radio"]'
        );
        const index = radio
          ? refs.findIndex(({ current }) => radio === current)
          : -1;
        if (index !== -1) {
          onChange(getRadioItemValue(items[index]));
          /* istanbul ignore next: can't really happen */
          refs[index].current?.focus();
        }
      },
      [onChange, onClick, refs, items]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLSpanElement>) => {
        onKeyDown?.(event);

        if (tryToSubmitRelatedForm(event)) {
          return;
        }

        if (
          ![" ", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(
            event.key
          )
        ) {
          return;
        }

        /* istanbul ignore next: can't really happen */
        const radio = (event.target as HTMLElement)?.closest<HTMLSpanElement>(
          '[role="radio"]'
        );
        if (!radio) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        if (event.key === " ") {
          radio.click();
          return;
        }

        const increment =
          event.key === "ArrowRight" || event.key === "ArrowDown";
        const index = refs.findIndex(({ current }) => current === radio);
        /* istanbul ignore next: can't really happen */
        if (index !== -1) {
          const nextIndex = loop({
            value: index,
            max: items.length - 1,
            increment,
          });
          refs[nextIndex].current?.focus();
          onChange(getRadioItemValue(items[nextIndex]));
        }
      },
      [onChange, onKeyDown, refs, items]
    );

    const focusable = useMemo(
      () => items.some((value) => getRadioItemValue(value) === currentValue),
      [currentValue, items]
    );

    return (
      <span
        {...props}
        id={id}
        ref={ref}
        role="radiogroup"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {items.map((item, i) => {
          let props: RadioWidgetAttributes | undefined;
          let value: string;
          let checked = false;
          let children: ReactNode;
          let itemStyle: CSSProperties | undefined;
          let itemClassName: string | undefined;
          if (typeof item === "string") {
            value = item;
            checked = currentValue === value;
            children = value;
            itemStyle = getRadioStyle({ index: i, checked, value: item });
            itemClassName = getRadioClassName({
              index: i,
              checked,
              value: item,
            });
          } else {
            ({ value, children, ...props } = item);
            checked = currentValue === value;
            itemStyle = getRadioStyle({ index: i, checked, ...item });
            itemClassName =
              getRadioClassName({
                index: i,
                checked,
                ...item,
              }) || undefined;

            if (typeof children === "undefined") {
              children = value;
            }
          }

          return (
            <RadioWidget
              {...props}
              key={value}
              id={`${id}-${i + 1}`}
              ref={refs[i]}
              style={itemStyle}
              className={itemClassName}
              checked={checked}
              tabIndex={checked || (!focused && !focusable) ? 0 : -1}
            >
              {children}
            </RadioWidget>
          );
        })}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    RadioGroup.propTypes = {
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            children: PropTypes.node,
          }),
        ])
      ).isRequired,
      onChange: PropTypes.func.isRequired,
      getRadioStyle: PropTypes.func,
      getRadioClassName: PropTypes.func,
    };
  } catch (e) {}
}
