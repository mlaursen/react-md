import type { PropsWithRef } from "@react-md/core";
import { bem, useEnsuredId } from "@react-md/core";
import { useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import { Label } from "./Label";
import { TextFieldContainer } from "./TextFieldContainer";
import type { FormFieldOptions } from "./types";

const styles = bem("rmd-native-select");
const containerStyles = bem("rmd-native-select-container");

/** @remarks \@since 6.0.0 */
export interface NativeSelectClassNameOptions {
  className?: string;

  /**
   * Set to `true` if using a custom icon instead of the default `<select>`
   * appearance.
   *
   * @defaultValue `false`
   */
  icon?: boolean;
}

/** @remarks \@since 6.0.0 */
export function nativeSelect(
  options: NativeSelectClassNameOptions = {}
): string {
  const { className, icon = false } = options;

  return cnb(styles({ icon }), className);
}

export interface NativeSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    FormFieldOptions {
  /**
   * A custom dropdown icon to use instead of the browser's default select
   * dropdown icon.
   *
   * Set this to `null` if the browser's default icon should be used instead.
   *
   * @defaultValue `useIcon("dropdown")`
   */
  icon?: ReactNode;

  /**
   * The {@link icon} is wrapped in a `<span>` element to apply some styles, so
   * this prop can be used to add additional styles or attributes to that
   * element if needed.
   *
   * @example
   * ```tsx
   * <NativeSelect
   *   {...selectProps}
   *   iconProps={{
   *     ref: spanRef,
   *     style: {{
   *       backgroundColor: 'red',
   *     }},
   *     className: "some-custom-class-name",
   *   }}
   * />
   * ```
   */
  iconProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * This applies custom inline styles to the `<select>` element since the
   * `style` prop is applied to the container element instead.
   */
  selectStyle?: CSSProperties;

  /**
   * This applies custom className to the `<select>` element since the
   * `className` prop is applied to the container element instead.
   */
  selectClassName?: string;

  /**
   * This should be a list of `<option>` elements for specific values within the
   * `<select>`.
   *
   * Check out the {@link NativeSelect} for examples around using "placeholder"
   * text and requiring a value to be selected.
   */
  children: ReactNode;
}

/**
 * This component is a wrapper for the native `<select>` field that applies the
 * same theming as `TextField` and `TextArea` components. This component might
 * not be used much since the `Select` offers more styling options.
 *
 * @example
 * Simple Example
 * ```tsx
 * <NativeSelect label="Label">
 *   <option value="a">Value 1</option>
 *   <option value="b">Value 2</option>
 *   <option value="c">Value 3</option>
 *   <option value="d">Value 4</option>
 * </NativeSelect>
 * ```
 *
 * @example
 * Required Value Example
 * ```tsx
 * function Example(): ReactElement {
 *   // using `defaultValue=""` makes it so the first option selected by default
 *   // and considered an "invalid" value since it is `disabled`
 *   //
 *   // a `name` must be set with `required` so that the form validation will
 *   // fire if the value is still the empty string when the form is submitted
 *   //
 *   // the first `<option>` is kind of like placeholder text since it doesn't
 *   // have a value and is disabled by default
 *
 *   return (
 *     <NativeSelect
 *       label="State"
 *       name="state"
 *       required
 *       defaultValue=""
 *     >
 *       <option value="" disabled>Choose a state</option>
 *       {states.map(({ name, code }) => (
 *         <option key={code} value={code}>{name}</option>
 *       ))}
 *     </NativeSelect>
 *   );
 * }
 * ```
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const {
      id: propId,
      style,
      className,
      icon: propIcon,
      iconProps,
      label,
      labelProps,
      labelStyle,
      labelClassName,
      selectStyle,
      selectClassName,
      dense = false,
      error = false,
      active = false,
      inline = false,
      stretch = false,
      leftAddon,
      rightAddon,
      disableLeftAddonStyles = false,
      disableRightAddonStyles = false,
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
      messageProps,
      messageContainerProps,
      children,
      ...remaining
    } = props;
    const { disabled = false, readOnly = false, multiple = false } = props;
    const id = useEnsuredId(propId, "select");
    const { theme, underlineDirection } = useFormTheme({
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
    });
    const icon = useIcon("dropdown", propIcon);
    const underlined = theme === "underline" || theme === "filled";

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          style={style}
          className={cnb(
            containerStyles({
              multi: multiple,
              padded: multiple && label && !underlined,
            }),
            className
          )}
          theme={theme}
          label={!!label}
          error={error}
          dense={dense}
          inline={inline}
          active={active}
          stretch={stretch}
          readOnly={readOnly}
          disabled={disabled}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          underlineDirection={underlineDirection}
          disableLeftAddonStyles={disableLeftAddonStyles}
          disableRightAddonStyles={disableRightAddonStyles}
        >
          <select
            {...remaining}
            id={id}
            ref={ref}
            disabled={disabled}
            style={selectStyle}
            className={nativeSelect({
              className: selectClassName,
              icon: !!icon,
            })}
          >
            {children}
          </select>
          {label && (
            <Label
              {...labelProps}
              htmlFor={id}
              style={labelProps?.style ?? labelStyle}
              className={labelProps?.className ?? labelClassName}
              floating
              dense={dense}
              error={error}
              active={active}
              disabled={disabled}
              readOnly={readOnly}
            >
              {label}
            </Label>
          )}
          {!multiple && icon && (
            <span
              {...iconProps}
              className={cnb(styles("icon"), iconProps?.className)}
            >
              {icon}
            </span>
          )}
        </TextFieldContainer>
      </FormMessageContainer>
    );
  }
);
