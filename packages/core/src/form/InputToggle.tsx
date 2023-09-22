"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import { RippleContainer } from "../interaction/RippleContainer.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { InputToggleIcon } from "./InputToggleIcon.js";
import { Label } from "./Label.js";
import {
  type FormComponentStates,
  type FormMessageContainerExtension,
} from "./types.js";

const noop = (): void => {
  // do nothing
};
const styles = bem("rmd-input-toggle");

/**
 * The size to use for the `Checkbox` or `Radio` component. Each of these values
 * except for `"auto"` map to Sass variables:
 * - `"small"` - `$input-toggle-small-size`
 * - `"dense"` - `$input-toggle-dense-size`
 * - `"normal"` - `$input-toggle-large-size`
 * - `"large"` - `$input-toggle-large-size`
 *
 * When this is set to `"auto"`, the size will be determined by the current
 * `font-size` of the `Label` element.
 *
 * @remarks \@since 6.0.0
 */
export type InputToggleSize = "auto" | "small" | "dense" | "normal" | "large";

/** @remarks \@since 6.0.0 */
export interface InputToggleClassNameOptions {
  className?: string;
  type: "checkbox" | "radio";

  /**
   * Set the icon size to `1em` to allow easy sizing through font size.
   *
   * @defaultValue `true`
   */
  em?: boolean;

  /**
   * Set this to `true` when the input toggle should gain the active colors.
   * This should normally be when the input toggle is checked.
   *
   * @defaultValue `false`
   */
  active?: boolean;

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  readOnly?: boolean;

  /**
   * @see {@link InputToggleSize}
   * @defaultValue `"auto"`
   */
  size?: InputToggleSize;
}

/**
 * @remarks \@since 6.0.0
 */
export function inputToggle(options: InputToggleClassNameOptions): string {
  const {
    className,
    em = true,
    type,
    size = "auto",
    active = false,
    disabled = false,
    readOnly = false,
  } = options;

  return cnb(
    `rmd-${type}`,
    styles({
      em,
      active,
      disabled,
      readonly: readOnly,
      small: size === "small",
      dense: size === "dense",
      normal: size === "normal",
      large: size === "large",
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface InputToggleIconProps {
  /**
   * @see {@link InputToggleSize}
   * @defaultValue `"normal"`
   */
  size?: InputToggleSize;

  /**
   * The icon to use while unchecked. This defaults to the unchecked
   * checkbox/radio icon from the `IconProvider`.
   *
   * @defaultValue `useIcon(props.type)`
   */
  icon?: ReactNode;

  /**
   * The icon to use while unchecked. This defaults to the unchecked
   * checkbox/radio icon from the `IconProvider`.
   *
   * @defaultValue `useIcon(``${props.type}Checked``)`
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
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
 * @remarks
 * \@since 2.8.5
 * \@since 6.0.0 Removed the `aria-controls` prop and added the
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
   * @defaultValue `useIcon("checkboxIndeterminate")`
   * @remarks \@since 6.0.0
   */
  indeterminateIcon?: ReactNode;
}

export interface CheckboxProps
  extends BaseInputToggleProps,
    IndeterminateCheckboxProps {}

/** @remarks \@since 6.0.0 */
export interface CheckboxInputToggleProps extends CheckboxProps {
  type: "checkbox";
}

export interface RadioProps extends BaseInputToggleProps {
  /**
   * The value for the radio button.
   *
   * @remarks \@since 6.0.0 This is now optional and no longer supports
   * `string[]` since there isn't much of a use case for array values.
   */
  value?: string | number;
}

/** @remarks \@since 6.0.0 */
export interface RadioInputToggleProps extends RadioProps {
  type: "radio";
}

/**
 * @remarks \@since 6.0.0 Updated to be a union between
 * `CheckboxInputToggleProps` and `RadioInputToggleProps`
 */
export type InputToggleProps = CheckboxInputToggleProps | RadioInputToggleProps;

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0 Now supports the `FormMessage` behavior and requires
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
      onChange = noop,
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
    const { disabled = false, readOnly = false } = props;
    const themeDisabled = disabled || readOnly;

    const id = useEnsuredId(propId, type);
    const { pressedClassName, rippleContainerProps, handlers } =
      useElementInteraction({
        disabled: themeDisabled,
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

    const [isChecked, setChecked] = useState(props.defaultChecked ?? false);
    const checked = props.checked ?? isChecked;

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
            checked={checked}
            disabled={disabled}
            readOnly={readOnly}
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
              onChange={(event) => {
                // checkboxes do not natively support the readOnly attribute, so
                // polyfill it in. can't use `disabled` since the checkbox's
                // checked/unchecked state would then not be submitted in forms.
                if (type === "checkbox" && readOnly) {
                  event.preventDefault();
                  event.stopPropagation();
                  return;
                }

                onChange(event);
                if (typeof props.checked === "undefined") {
                  setChecked(event.currentTarget.checked);
                }
              }}
              className={cnb(
                "rmd-hidden-input",
                themeDisabled && "rmd-hidden-input--disabled"
              )}
            />
            {rippleContainerProps && (
              <RippleContainer {...rippleContainerProps} />
            )}
          </InputToggleIcon>
        </Label>
      </FormMessageContainer>
    );
  }
);
