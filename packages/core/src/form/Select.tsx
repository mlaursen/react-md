"use client";

import { cnb } from "cnbuilder";
import {
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useRef,
  useState,
} from "react";

import { type BoxProps } from "../box/Box.js";
import { IconRotator } from "../icon/IconRotator.js";
import { getIcon } from "../icon/config.js";
import { type MenuProps } from "../menu/Menu.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import {
  type LabelA11y,
  type PropsWithRef,
  type RequireAtLeastOne,
} from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { Listbox } from "./Listbox.js";
import { SelectedOption } from "./SelectedOption.js";
import {
  TextFieldContainer,
  type TextFieldContainerProps,
} from "./TextFieldContainer.js";
import { getFormConfig } from "./formConfig.js";
import { label as labelStyles } from "./labelStyles.js";
import { select } from "./selectStyles.js";
import { extractOptionsFromChildren } from "./selectUtils.js";
import { textField } from "./textFieldStyles.js";
import { type UserAgentAutocompleteProps } from "./types.js";
import { useFormReset } from "./useFormReset.js";
import { useSelectCombobox } from "./useSelectCombobox.js";
import { triggerManualChangeEvent } from "./utils.js";

const EMPTY_STRING = "" as const;
const noop = (): void => {
  // do nothing
};

/**
 * This is a convenience type for casting the `event.currentTarget.value` of a
 * `Select`'s change event to be union of available values.
 *
 * Note: The change event does not provide any sort of validation on the value
 * so automation tools like Cypress, Playwright, or Selenium might set an
 * invalid value. This also does not work for numbers, so you will need to
 * implement that yourself.
 *
 * @example Simple Usage
 * ```tsx
 * import { Select, type SelectChangeEvent } from "@react-md/core/form/Select";
 * import { Option } from "@react-md/core/form/Option";
 * import type { ReactElement } from "react";
 *
 * type Value = "" | "a" | "b" | "c" | "d";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState<Value>("");
 *
 *   const handleChange = (event: SelectChangeEvent<Value>): void => {
 *     // No type error!
 *     // `event.currentTarget.value`'s type is `Value` instead of a generic `string`
 *     setValue(event.currentTarget.value);
 *   };
 *
 *   return (
 *     <Select
 *       label="Label"
 *       value={value}
 *       onChange={handleChange}
 *     >
 *       <Option value="a">First</Option>
 *       <Option value="b">Second</Option>
 *       <Option value="c">Third</Option>
 *       <Option value="d">Fourth</Option>
 *     </Select>
 *   );
 * }
 * ```
 * @since 6.0.0
 */
export type SelectChangeEvent<Value extends string> =
  ChangeEvent<HTMLInputElement> & { currentTarget: { value: Value } };

/**
 * @since 6.0.0 Rewritten with a new API.
 */
export interface SelectProps<Value extends string>
  extends Omit<TextFieldContainerProps, "label">,
    Pick<InputHTMLAttributes<HTMLInputElement>, "form" | "required">,
    UserAgentAutocompleteProps {
  /**
   * @defaultValue `"select-" + useId()`
   */
  id?: string;

  /**
   * Optional placeholder text or element to render while no options have been
   * selected.
   */
  placeholder?: ReactNode;

  /**
   * Set this to a custom dropdown icon or `null` to not render a dropdown icon.
   *
   * @defaultValue `getIcon("dropdown")`
   */
  icon?: ReactNode;

  /**
   * Set this value to fully control the value of the select component. The
   * {@link onChange} handler **must** also be provided if this prop exists.
   */
  value?: Value;

  /**
   * An optional default value when the value of the select component is
   * uncontrolled.
   *
   * @defaultValue `""`
   */
  defaultValue?: Value;

  /** @see {@link SelectChangeEvent} */
  onChange?: (event: SelectChangeEvent<Value>) => void;

  /**
   * An optional floating label to display like other form fields.
   */
  label?: ReactNode;

  /**
   * Optional props to pass to the `<span>` that surrounds the {@link label}
   */
  labelProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

  /**
   * An optional ref to pass to the hidden `<input type="text" />` element that
   * stores the current value. This is really only useful if you'd like to keep
   * this component uncontrolled and access the value through
   * `inputRef.current.value`.
   */
  inputRef?: Ref<HTMLInputElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;

  /**
   * A ref for the container `<div>` element.
   */
  containerRef?: Ref<HTMLDivElement>;

  /**
   * Any additional props to provide to the `Menu` component that renders all
   * the `Option`s.
   *
   * The menu will always have these default values unless explicity
   * overwritten by this prop:
   *
   * - `aria-labelledby={label ? labelId : id}` -- this will be undefined if
   *   `aria-label` is provided
   * - `anchor={BELOW_CENTER_ANCHOR}`
   * - `width="min"`
   */
  menuProps?: PropsWithRef<
    Omit<MenuProps, "visible" | "onRequestClose" | "fixedTo">
  >;

  /**
   * Any additional props to pass to the div that contains the current visible
   * option.
   */
  selectedOptionProps?: BoxProps;

  /**
   * Set this to `true` if all the `Option` components should display the
   * selected icon after the children instead of before.
   *
   * @see {@link disableSelectedIcon} to remove the selected icon instead.
   *
   * @defaultValue `false`
   */
  selectedIconAfter?: boolean;

  /**
   * Set this to `true` to prevent the current option from rendering the
   * `leftAddon` in the `TextFieldContainer`.
   *
   * @defaultValue `false`
   */
  disableOptionAddon?: boolean;

  /**
   * Set this to `true` to update all the `Option` components to no longer
   * render an icon while selected.
   *
   * @defaultValue `false`
   */
  disableSelectedIcon?: boolean;

  /**
   * This should be the available `Option`s for the select to choose from. It
   * can also contain `OptGroup` or any other elements but only clicking on an
   * `Option` component will update the value.
   */
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import { Option } from "@react-md/core/form/Option";
 * import { Select } from "@react-md/core/form/Select";
 * import { useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("");
 *
 *   return (
 *     <Select
 *       label="Select"
 *       value={value}
 *       onChange={(event) => setValue(event.currentTarget.value)}
 *       placeholder="Select a value"
 *     >
 *       <Option value="a">Option 1</Option>
 *       <Option value="b">Option 2</Option>
 *       <Option value="c">Option 3</Option>
 *       <Option value="d">Option 4</Option>
 *     </Select>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/select | Select Demos}
 * @since 6.0.0 Rewritten with a new API.
 */
export function Select<Value extends string>(
  props: RequireAtLeastOne<SelectProps<Value>, "label" | keyof LabelA11y>
): ReactElement {
  const {
    id,
    form,
    autoCompleteValue,
    autoComplete = autoCompleteValue,
    name = autoCompleteValue,
    className,
    onClick,
    onFocus,
    onKeyDown,
    inputRef: propInputRef,
    inputProps,
    containerRef,
    placeholder,
    menuProps = {},
    label,
    labelProps = {},
    selectedOptionProps,
    icon: propIcon,
    value,
    defaultValue,
    theme: propTheme,
    onChange = noop,
    rightAddon: propRightAddon,
    active = false,
    required,
    selectedIconAfter = false,
    disableOptionAddon = false,
    disableSelectedIcon = false,
    children,
    ...remaining
  } = props;
  const { dense, error, disabled } = props;

  const comboboxId = useEnsuredId(id, "select");
  const inputId = useEnsuredId(inputProps?.id, "select-value");
  const selectLabelId = useEnsuredId(labelProps.id, "select-label");
  const labelId = label ? selectLabelId : undefined;

  const [localValue, setLocalValue] = useState(() => {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }

    return typeof value !== "undefined" ? value : EMPTY_STRING;
  });
  const currentValue = typeof value === "undefined" ? localValue : value;
  const initialValue = useRef(currentValue);
  const { options, currentOption } = extractOptionsFromChildren(
    children,
    currentValue
  );

  const { visible, comboboxProps, movementContext, getMenuProps } =
    useSelectCombobox({
      form,
      value: currentValue,
      values: options,
      onClick,
      onFocus,
      onKeyDown,
      disabled,
      popupId: menuProps.id,
      popupRef: menuProps.ref,
      comboboxId,
      comboboxRef: containerRef,
    });

  const [inputRef, inputRefCallback] = useEnsuredRef(propInputRef);
  useFormReset({
    form,
    elementRef: inputRef,
    defaultValue: initialValue.current,
  });

  const icon = getIcon("dropdown", propIcon);
  const theme = getFormConfig("theme", propTheme);
  let rightAddon = propRightAddon;
  if (typeof rightAddon === "undefined" && icon) {
    rightAddon = <IconRotator rotated={visible}>{icon}</IconRotator>;
  }

  const { ref: listboxRef, ...listboxProps } = getMenuProps(menuProps);
  let listboxLabelledBy = menuProps["aria-labelledby"];
  const listboxLabel = menuProps["aria-label"];
  if (!listboxLabel && !listboxLabelledBy) {
    listboxLabelledBy = labelId || comboboxId;
  }

  return (
    <KeyboardMovementProvider value={movementContext}>
      <TextFieldContainer
        aria-labelledby={labelId}
        {...remaining}
        {...comboboxProps}
        label={!!label}
        theme={theme}
        active={active || visible}
        className={cnb("rmd-select-container", className)}
        rightAddon={rightAddon}
      >
        <SelectedOption
          option={currentOption}
          placeholder={placeholder}
          disableAddon={disableOptionAddon}
          {...selectedOptionProps}
        />
        <input
          aria-hidden
          id={inputId}
          ref={inputRefCallback}
          type="text"
          autoComplete={autoComplete}
          name={name}
          tabIndex={-1}
          disabled={disabled}
          required={required}
          placeholder=" "
          {...inputProps}
          value={value}
          defaultValue={defaultValue}
          className={cnb(select({ theme }), textField())}
          onChange={(event) => {
            onChange(event as SelectChangeEvent<Value>);
            if (typeof value !== "undefined") {
              return;
            }

            const nextValue = event.currentTarget.value;
            const nextOption = options.find((option) => option === nextValue);

            setLocalValue(nextOption ?? initialValue.current);
          }}
        />
        {label && (
          <span
            {...labelProps}
            id={labelId}
            className={labelStyles({
              dense,
              error,
              disabled,
              active: active || visible,
              floating: true,
              floatingActive: !!placeholder || !!currentOption,
              className: labelProps.className,
            })}
          >
            {label}
          </span>
        )}
      </TextFieldContainer>
      <Listbox
        {...listboxProps}
        aria-label={listboxLabel}
        aria-labelledby={listboxLabelledBy as string}
        nodeRef={listboxRef}
        value={currentValue}
        setValue={useCallback(
          (option: "" | Value) => {
            triggerManualChangeEvent(inputRef.current, option);
          },
          [inputRef]
        )}
        selectedIconAfter={selectedIconAfter}
        disableSelectedIcon={disableSelectedIcon}
      >
        {children}
      </Listbox>
    </KeyboardMovementProvider>
  );
}
