import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  forwardRef,
} from "react";

import { getIcon } from "../icon/config.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { Label } from "./Label.js";
import { TextFieldContainer } from "./TextFieldContainer.js";
import { getFormConfig } from "./formConfig.js";
import { nativeSelect, nativeSelectContainer } from "./nativeSelectStyles.js";
import {
  type FormFieldOptions,
  type UserAgentAutocompleteProps,
} from "./types.js";

/**
 * @since 6.0.0 Added support for {@link UserAgentAutocompleteProps}
 */
export interface NativeSelectProps
  extends
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "autoComplete">,
    UserAgentAutocompleteProps,
    FormFieldOptions {
  /**
   * A custom dropdown icon to use instead of the browser's default select
   * dropdown icon.
   *
   * Set this to `null` if the browser's default icon should be used instead.
   *
   * @defaultValue `getIcon("dropdown")`
   */
  icon?: ReactNode;

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

  /**
   * Optional props to provide to the {@link TextFieldContainer} component.
   * There probably isn't any real use for this prop other than if you need to
   * add a `ref` for some DOM behavior.
   */
  containerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>>;
}

/**
 * This component is a wrapper for the native `<select>` field that applies the
 * same theming as `TextField` and `TextArea` components. This component might
 * not be used much since the `Select` offers more styling options.
 *
 * @example Simple Example
 * ```tsx
 * <NativeSelect label="Label">
 *   <option value="a">Value 1</option>
 *   <option value="b">Value 2</option>
 *   <option value="c">Value 3</option>
 *   <option value="d">Value 4</option>
 * </NativeSelect>
 * ```
 *
 * @example Required Value Example
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
 *
 * @see {@link https://react-md.dev/components/native-select | NativeSelect Demos}
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const {
      id: propId,
      style,
      className,
      icon: propIcon,
      label,
      labelProps,
      labelStyle,
      labelClassName,
      selectStyle,
      selectClassName,
      autoCompleteValue,
      autoComplete = autoCompleteValue,
      name = autoCompleteValue,
      dense,
      error,
      active,
      inline,
      leftAddon,
      rightAddon: propRightAddon,
      leftAddonProps,
      rightAddonProps,
      disableLeftAddonStyles,
      disableRightAddonStyles,
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
      messageProps,
      messageContainerProps,
      containerProps,
      children,
      ...remaining
    } = props;
    const { disabled, readOnly, multiple } = props;
    const id = useEnsuredId(propId, "select");
    const theme = getFormConfig("theme", propTheme);
    const underlineDirection = getFormConfig(
      "underlineDirection",
      propUnderlineDirection
    );
    const icon = getIcon("dropdown", propIcon);
    const underlined = theme === "underline" || theme === "filled";

    let rightAddon = propRightAddon;
    if (typeof propRightAddon === "undefined" && !multiple) {
      rightAddon = icon;
    }

    return (
      <FormMessageContainer
        inline={inline}
        {...messageContainerProps}
        messageProps={
          messageProps && {
            error,
            theme,
            ...messageProps,
          }
        }
      >
        <TextFieldContainer
          {...containerProps}
          style={style}
          className={nativeSelectContainer({
            label: !!label,
            multiple,
            underlined,
            className,
          })}
          theme={theme}
          label={!!label}
          error={error}
          dense={dense}
          inline={inline}
          active={active}
          readOnly={readOnly}
          disabled={disabled}
          leftAddon={leftAddon}
          leftAddonProps={leftAddonProps}
          rightAddon={rightAddon}
          rightAddonProps={rightAddonProps}
          underlineDirection={underlineDirection}
          disableLeftAddonStyles={disableLeftAddonStyles}
          disableRightAddonStyles={disableRightAddonStyles}
        >
          <select
            {...remaining}
            id={id}
            ref={ref}
            autoComplete={autoComplete}
            name={name}
            disabled={disabled}
            style={selectStyle}
            className={nativeSelect({
              icon: !!icon,
              className: selectClassName,
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
            >
              {label}
            </Label>
          )}
        </TextFieldContainer>
      </FormMessageContainer>
    );
  }
);
