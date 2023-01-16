import {
  BELOW_CENTER_ANCHOR,
  bem,
  findMatchIndex,
  isSearchableEvent,
  loop,
  useEnsuredId,
  useEnsuredRef,
  useToggle,
} from "@react-md/core";
import { IconRotator, useIcon } from "@react-md/icon";
import type { MenuProps } from "@react-md/menu";
import { Menu } from "@react-md/menu";
import { cnb } from "cnbuilder";
import type {
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import { Label } from "./Label";
import { extractOptionsFromChildren } from "./selectUtils";
import { SelectValue } from "./SelectValue";
import type { TextFieldProps } from "./TextField";
import { textField } from "./TextField";
import { TextFieldContainer } from "./TextFieldContainer";
import type { FormFieldOptions, UserAgentAutoCompleteProps } from "./types";
import { ListboxProvider } from "./useListboxProvider";
import { triggerManualChangeEvent, tryToSubmitRelatedForm } from "./utils";

const styles = bem("rmd-select");
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
 * @example
 * Simple Usage
 * ```tsx
 * import type { SelectedChangeEvent } from "@react-md/form";
 * import { Select, Option } from "@react-md/form";
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
 * @remarks \@since 6.0.0
 */
export type SelectChangeEvent<Value extends string> =
  ChangeEvent<HTMLInputElement> & { currentTarget: { value: Value } };

/**
 * @remarks \@since 6.0.0
 */
export type SelectInputAttributes = Pick<
  TextFieldProps,
  | "form"
  | "size"
  | "pattern"
  | "minLength"
  | "maxLength"
  | "required"
  | "readOnly"
>;

/**
 * @remarks \@since 6.0.0 Rewritten with a new API.
 */
export interface SelectProps<Value extends string>
  extends Omit<HTMLAttributes<HTMLDivElement>, "placeholder">,
    UserAgentAutoCompleteProps,
    SelectInputAttributes,
    FormFieldOptions {
  /**
   * An optional id to provide to the `TextFieldContainer` component.
   *
   * @defaultValue `"select-container-" + useId()`
   */
  containerId?: string;

  /**
   * An optional ref to provide to the `TextFieldContainer` component. This is
   * useful for implementing drag and drop or other DOM interactions.
   */
  containerRef?: Ref<HTMLDivElement>;

  /**
   * An optional ref to pass to the hidden `<input type="text" />` element that
   * stores the current value. This is really only useful if you'd like to keep
   * this component uncontrolled and access the value through
   * `inputRef.current.value`.
   */
  inputRef?: Ref<HTMLInputElement>;

  /**
   * Set this to a custom dropdown icon or `null` to not render a dropdown icon.
   *
   * @defaultValue `useIcon("dropdown")`
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
  onChange?(event: SelectChangeEvent<Value>): void;

  /**
   * Any additional props to provide to the `Menu` component that renders all
   * the `Option`s.
   *
   * The menu will always have these default values unless explicity
   * overwritten by this prop:
   *
   * - `aria-labelledby={containerId}`
   * - `anchor={BELOW_CENTER_ANCHOR}`
   * - `width="min"`
   */
  menuProps?: Omit<MenuProps, "visible" | "onRequestClose" | "fixedTo">;

  /**
   * Set this to `true` to update all the `Option` components to no longer
   * render an icon while selected.
   *
   * @defaultValue `false`
   */
  disableSelectedIcon?: boolean;

  /**
   * Set this to `true` to prevent the current option from rendering the
   * `leftAddon` in the `TextFieldContainer`.
   *
   * @defaultValue `false`
   */
  disableValueAddon?: boolean;

  /**
   * This should be the available `Option`s for the select to choose from. It
   * can also contain `OptGroup` or any other elements but only clicking on an
   * `Option` component will update the value.
   */
  children: ReactNode;
}

/**
 * @remarks \@since 6.0.0 Rewritten with a new API.
 */
export function Select<Value extends string>(
  props: SelectProps<Value>
): ReactElement {
  const {
    id: propId,
    containerId: propContainerId,
    containerRef,
    style,
    className,
    label,
    labelProps,
    labelStyle,
    labelClassName,
    autoCompleteValue,
    autoComplete = autoCompleteValue,
    name = autoCompleteValue,
    form,
    size,
    pattern,
    minLength,
    maxLength,
    dense = false,
    error = false,
    active: propActive = false,
    inline = false,
    stretch = false,
    readOnly = false,
    disabled = false,
    required = false,
    inputRef: propInputRef,
    icon: propIcon,
    value,
    defaultValue,
    onChange = noop,
    onInvalid,
    onClick = noop,
    onKeyDown = noop,
    leftAddon,
    rightAddon: propRightAddon,
    disableLeftAddonStyles = false,
    disableRightAddonStyles = false,
    disableValueAddon = false,
    disableSelectedIcon = false,
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
    messageProps,
    messageContainerProps,
    tabIndex = disabled ? -1 : 0,
    children,
    menuProps,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "select");
  const containerId = useEnsuredId(propContainerId, "select-container");
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  });
  const icon = useIcon("dropdown", propIcon);

  const { toggled: visible, enable: show, disable: hide } = useToggle();
  const [inputRef, inputRefCallback] = useEnsuredRef(propInputRef);
  const [currentValue, setCurrentValue] = useState(() => {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }

    return typeof value !== "undefined" ? value : EMPTY_STRING;
  });
  const initialValue = useRef(currentValue);

  useEffect(() => {
    const select = inputRef.current;
    if (!select) {
      return;
    }

    const formElement =
      select.closest<HTMLFormElement>("form") ||
      (form && document.getElementById(form)) ||
      null;

    if (!formElement) {
      return;
    }

    const handleReset = (): void => {
      triggerManualChangeEvent(select, initialValue.current);
    };

    formElement.addEventListener("reset", handleReset);
    return () => {
      formElement.removeEventListener("reset", handleReset);
    };
  }, [form, inputRef]);

  const active = propActive || visible;
  const { options, searchValues, currentOption, currentIndex } =
    extractOptionsFromChildren(
      children,
      typeof value === "undefined" ? currentValue : value
    );
  const totalOptions = options.length - 1;

  let rightAddon = propRightAddon;
  if (typeof rightAddon === "undefined" && icon) {
    rightAddon = <IconRotator rotated={visible}>{icon}</IconRotator>;
  }

  const listboxContext = useMemo(
    () => ({
      inputRef,
      currentValue: typeof value === "undefined" ? currentValue : value,
      disableSelectedIcon,
    }),
    [currentValue, disableSelectedIcon, inputRef, value]
  );

  return (
    <ListboxProvider value={listboxContext}>
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          {...remaining}
          aria-haspopup="listbox"
          id={containerId}
          ref={containerRef}
          role="button"
          style={style}
          className={cnb("rmd-select-container", className)}
          tabIndex={tabIndex}
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
          onKeyDown={(event) => {
            onKeyDown(event);
            if (disabled) {
              return;
            }

            if (isSearchableEvent(event)) {
              const nextIndex = findMatchIndex({
                value: event.key,
                values: searchValues,
                startIndex: event.shiftKey ? -1 : currentIndex,
              });
              if (nextIndex !== -1) {
                triggerManualChangeEvent(
                  inputRef.current,
                  options[nextIndex].value
                );
              }
              return;
            }

            switch (event.key) {
              case " ":
                event.preventDefault();
                event.stopPropagation();
                show();
                break;
              case "Enter":
                tryToSubmitRelatedForm(event, form);
                break;
              case "Home":
                event.preventDefault();
                event.stopPropagation();
                if (currentIndex !== 0) {
                  triggerManualChangeEvent(inputRef.current, options[0].value);
                }
                break;
              case "End":
                event.preventDefault();
                event.stopPropagation();
                if (currentIndex !== totalOptions) {
                  triggerManualChangeEvent(
                    inputRef.current,
                    options[totalOptions].value
                  );
                }
                break;
              case "ArrowDown":
              case "ArrowUp": {
                event.preventDefault();
                event.stopPropagation();

                const increment = event.key === "ArrowDown";
                if (currentIndex === -1 && !increment) {
                  // this matches the native select behavior where it will do
                  // nothing if there is no current value
                  return;
                }

                const nextIndex = loop({
                  max: totalOptions,
                  value: currentIndex,
                  minmax: true,
                  increment,
                });

                triggerManualChangeEvent(
                  inputRef.current,
                  options[nextIndex].value
                );
                break;
              }
            }
          }}
          onClick={(event) => {
            onClick(event);
            if (disabled) {
              return;
            }

            show();
          }}
        >
          <SelectValue disableAddon={disableValueAddon} {...currentOption} />
          <input
            aria-hidden
            autoComplete={autoComplete}
            id={id}
            ref={inputRefCallback}
            type="text"
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder=" "
            onChange={(event) => {
              onChange(event as SelectChangeEvent<Value>);
              if (typeof value !== "undefined") {
                return;
              }

              const nextValue = event.currentTarget.value;
              const valueAsNumber = parseFloat(nextValue);
              const nextOption = options.find(
                (option) =>
                  // need to compare both here since
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  option.value === nextValue || option.value === valueAsNumber
              );

              setCurrentValue(
                nextOption ? nextOption.value : initialValue.current
              );
            }}
            onInvalid={onInvalid}
            form={form}
            size={size}
            pattern={pattern}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            readOnly={readOnly}
            className={cnb(
              styles({
                filled: theme === "filled",
                outline: theme === "outline",
                underline: theme === "underline",
              }),
              textField()
            )}
            tabIndex={-1}
          />
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
      <Menu
        aria-labelledby={containerId}
        anchor={BELOW_CENTER_ANCHOR}
        role="listbox"
        width="min"
        {...menuProps}
        visible={visible}
        fixedTo={inputRef}
        onRequestClose={hide}
        getDefaultFocusedIndex={(focusOptions) => {
          if (typeof menuProps?.getDefaultFocusedIndex === "function") {
            return menuProps.getDefaultFocusedIndex(focusOptions);
          }

          return options.findIndex((option) => option.value === currentValue);
        }}
      >
        {children}
      </Menu>
    </ListboxProvider>
  );
}
