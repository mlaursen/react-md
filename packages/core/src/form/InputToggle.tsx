"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { InputToggleIcon } from "./InputToggleIcon.js";
import { Label } from "./Label.js";
import { type InputToggleSize } from "./inputToggleStyles.js";
import {
  type FormComponentStates,
  type FormMessageContainerExtension,
} from "./types.js";

/**
 * @since 6.0.0
 */
export interface InputToggleIconProps {
  /**
   * @see {@link InputToggleSize}
   * @defaultValue `"normal"`
   */
  size?: InputToggleSize;

  /**
   * The icon to use while unchecked. This defaults to the unchecked
   * checkbox/radio icon from the `ICON_CONFIG`.
   *
   * @defaultValue `getIcon(props.type)`
   */
  icon?: ReactNode;

  /**
   * The icon to use while unchecked. This defaults to the unchecked
   * checkbox/radio icon from the `ICON_CONFIG`.
   *
   * @defaultValue `getIcon(``${props.type}Checked``)`
   */
  checkedIcon?: ReactNode;

  /**
   * Any props that should be passed to the `<span>` that surrounds the current
   * icon element.
   */
  iconProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * Optional style to set on the `<span>` that surrounds the current icon
   * element.
   */
  iconStyle?: CSSProperties;

  /**
   * Optional className to set on the `<span>` that surrounds the current icon
   * element.
   */
  iconClassName?: string;
}

/**
 * @since 6.0.0
 */
export interface InputToggleLabelProps {
  /**
   * An optional label to display with the checkbox. If this is omitted, it is
   * recommended to provide an `aria-label` for accessibility.
   */
  label?: ReactNode;

  /**
   * Any props that should be passed to the `<Label>` component.
   *
   * Note: If `style` or `className` are provided in this object, they will be
   * ignored. Use the top-level `style` and `className` props instead.
   *
   * @example
   * ```
   *  // bad
   * labelProps={{
   *   "aria-label": "checkbox",
   *   style: { color: "red" },
   *   className: "custom"
   * }}
   *
   * // good
   * style={{ color: "red" }}
   * className="custom"
   * labelProps={{
   *   "aria-label": "checkbox",
   * }}
   * ```
   */
  labelProps?: PropsWithRef<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;

  /**
   * @see {@link LabelClassNameOptions.gap}
   * @defaultValue `false`
   */
  disableLabelGap?: boolean;

  /**
   * Set this to `true` to swap the position of the {@link label} and the current
   * icon. This prop can be used with the {@link stacked} prop to change the
   * position if the icon and label:
   *
   * ____________________________________
   * | stacked | iconAfter | position   |
   * ____________________________________
   * |         |           | icon label |
   * ____________________________________
   * |         | X         | label icon |
   * ____________________________________
   * | X       |           | icon       |
   * |         |           | label      |
   * ____________________________________
   * | X       | X         | label      |
   * |         |           | icon       |
   * ____________________________________
   *
   *
   * @defaultValue `false`
   */
  iconAfter?: boolean;

  /**
   * Set this to `true` if the label should be stacked instead of inline with
   * the current icon.
   *
   * @see {@link iconAfter}
   * @defaultValue `false`
   */
  stacked?: boolean;
}

/**
 * @since 6.0.0
 */
export interface BaseInputToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    FormMessageContainerExtension,
    FormComponentStates,
    InputToggleIconProps,
    InputToggleLabelProps {
  /**
   * @see https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing
   * @defaultValue `type === "checkbox" ? "off" : undefined`
   */
  autoComplete?: string;
}

/**
 * @since 2.8.5
 * @since 6.0.0 Removed the `aria-controls` prop and added the
 * `indeterminateIcon` prop.
 */
export interface IndeterminateCheckboxProps {
  /**
   * Set this value to `true` if the checkbox is in an "indeterminate" state:
   *
   * - this checkbox controls the select all/select none behavior of other
   *   checkboxes in a group
   * - at least one of the checkboxes have been checked
   *   - the `checked` prop for this Checkbox should also be `true`
   *
   * You should normally use the `useCheckboxGroup` hook to handle this
   * behavior.
   *
   * @defaultValue `false`
   */
  indeterminate?: boolean;

  /**
   * The icon to display when the checkbox is checked and the
   * {@link indeterminate} prop is `true`.
   *
   * @defaultValue `getIcon("checkboxIndeterminate")`
   * @since 6.0.0
   */
  indeterminateIcon?: ReactNode;
}

export interface CheckboxProps
  extends BaseInputToggleProps,
    IndeterminateCheckboxProps {}

/** @since 6.0.0 */
export interface CheckboxInputToggleProps extends CheckboxProps {
  type: "checkbox";
}

export interface RadioProps extends BaseInputToggleProps {
  /**
   * The value for the radio button.
   *
   * @since 6.0.0 This is now optional and no longer supports
   * `string[]` since there isn't much of a use case for array values.
   */
  value?: string | number;
}

/** @since 6.0.0 */
export interface RadioInputToggleProps extends RadioProps {
  type: "radio";
}

/**
 * @since 6.0.0 Updated to be a union between
 * `CheckboxInputToggleProps` and `RadioInputToggleProps`
 */
export type InputToggleProps = CheckboxInputToggleProps | RadioInputToggleProps;

/**
 * **Client Component**
 *
 * @since 6.0.0 Now supports the `FormMessage` behavior and requires
 * different icons for each checked state.
 */
export const InputToggle = forwardRef<HTMLInputElement, InputToggleProps>(
  function InputToggle(props, ref) {
    const {
      id: propId,
      type,
      label,
      labelProps,
      style,
      className,
      autoComplete = type === "checkbox" ? "off" : undefined,
      disableLabelGap = false,
      stacked = false,
      iconAfter = false,
      size = "normal",
      error = false,
      active = false,
      indeterminate = false,
      messageProps,
      messageContainerProps,
      icon,
      checkedIcon,
      indeterminateIcon,
      iconProps,
      iconStyle,
      iconClassName,
      onBlur,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onDragStart,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      ...remaining
    } = props as CheckboxInputToggleProps;
    const { disabled = false, checked } = props;

    const id = useEnsuredId(propId, type);
    const { pressedClassName, ripples, handlers } = useElementInteraction({
      disabled,
      onBlur,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onDragStart,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
    });

    // set on the `remaining` object to bypass the eslint rule about
    // aria-checked not being valid for textbox role
    remaining["aria-checked"] =
      remaining["aria-checked"] ?? indeterminate ? "mixed" : undefined;

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <Label
          {...labelProps}
          gap={!disableLabelGap}
          style={style}
          stacked={stacked}
          reversed={!iconAfter}
          active={active}
          error={error}
          disabled={disabled}
          className={className}
        >
          {label}
          <InputToggleIcon
            style={iconStyle}
            {...iconProps}
            className={cnb(
              pressedClassName,
              iconClassName,
              iconProps?.className
            )}
            error={error}
            checked={checked}
            disabled={disabled}
            size={size}
            type={type}
            icon={icon}
            checkedIcon={checkedIcon}
            indeterminate={indeterminate}
            indeterminateIcon={indeterminateIcon}
          >
            <input
              {...remaining}
              {...handlers}
              autoComplete={autoComplete}
              id={id}
              ref={ref}
              type={type}
              className="rmd-hidden-input"
            />
            {ripples}
          </InputToggleIcon>
        </Label>
      </FormMessageContainer>
    );
  }
);
