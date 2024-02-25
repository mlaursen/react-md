"use client";
import { cnb } from "cnbuilder";
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { IconRotator } from "../icon/IconRotator.js";
import { getIcon } from "../icon/iconConfig.js";
import { Menu, type MenuProps } from "../menu/Menu.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { BELOW_CENTER_ANCHOR } from "../positioning/constants.js";
import { TRANSITION_CONFIG } from "../transition/config.js";
import {
  type TransitionEnterHandler,
  type TransitionExitHandler,
} from "../transition/types.js";
import {
  type LabelA11y,
  type PropsWithRef,
  type RequireAtLeastOne,
} from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { label as labelStyles } from "./Label.js";
import { SelectedOption } from "./SelectedOption.js";
import {
  TextFieldContainer,
  type TextFieldContainerProps,
} from "./TextFieldContainer.js";
import { getFormConfig } from "./formConfig.js";
import { select } from "./selectStyles.js";
import { extractOptionsFromChildren } from "./selectUtils.js";
import { textField } from "./textFieldStyles.js";
import { getNonDisabledOptions, useCombobox } from "./useCombobox.js";
import { useFormReset } from "./useFormReset.js";
import { ListboxProvider, type ListboxContext } from "./useListboxProvider.js";

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
 * import type { SelectedChangeEvent } from "@react-md/core";
 * import { Select, Option } from "@react-md/core";
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
 * @remarks \@since 6.0.0 Rewritten with a new API.
 */
export interface SelectProps<Value extends string>
  extends Omit<TextFieldContainerProps, "label">,
    Pick<InputHTMLAttributes<HTMLInputElement>, "form" | "required" | "name"> {
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
  onChange?(event: SelectChangeEvent<Value>): void;

  /**
   * An optional floating label to display like other form fields.
   */
  label?: ReactNode;

  /**
   * Optional props to pass to the `<span>` that surrounds the {@link label}
   */
  labelProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

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
  menuProps?: Omit<MenuProps, "visible" | "onRequestClose" | "fixedTo">;

  /**
   * Any additional props to pass to the div that contains the current visible
   * option.
   */
  selectedOptionProps?: HTMLAttributes<HTMLDivElement>;

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
 * !Warning! This component does not allow most password managers/autofill
 * utilities to pre-populate this field correctly. A `NativeSelect` should be
 * used instead.
 *
 * @example
 * Testing
 * ```tsx
 * rmdRender(
 *   <Select label="Select" selectedOptionProps={{ "data-testid": "selected" }}>
 *     <Option value="a">Option 1</Option>
 *     <Option value="b">Option 2</Option>
 *     <Option value="c">Option 3</Option>
 *     <Option value="d">Option 4</Option>
 *   </Select>
 * );
 *
 * const user = userEvent.setup();
 * const select = screen.getByRole("combobox", { name: "Select" });
 * const selected = screen.getByTestId("selected")
 * const selectInput = screen.getByRole("textbox", { hidden: true });
 * expect(selected).toHaveTextContent("");
 * expect(selectInput).toHaveValue("");
 *
 * await user.click(select);
 * await user.click(screen.getByRole("option"), { name: "Option 2" });
 *
 * expect(selected).toHaveTextContent("Option 2");
 * expect(selectInput).toHaveValue("b");
 * ```
 *
 * @remarks \@since 6.0.0 Rewritten with a new API.
 */
export function Select<Value extends string>(
  props: RequireAtLeastOne<SelectProps<Value>, "label" | keyof LabelA11y>
): ReactElement {
  const {
    id,
    form,
    name,
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
  const {
    movementContext,
    popupRef,
    popupProps,
    comboboxRef,
    comboboxProps,
    currentFocusIndex,
    focusLast,
    hide,
    setActiveDescendantId,
    visible,
  } = useCombobox({
    form,
    onClick,
    onFocus,
    onKeyDown,
    disabled,
    popupId: menuProps.id,
    popupRef: menuProps.nodeRef,
    comboboxId,
    comboboxRef: containerRef,
    autocomplete: "select",
  });

  const [inputRef, inputRefCallback] = useEnsuredRef(propInputRef);
  const [localValue, setLocalValue] = useState(() => {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }

    return typeof value !== "undefined" ? value : EMPTY_STRING;
  });
  const currentValue = typeof value === "undefined" ? localValue : value;
  const initialValue = useRef(currentValue);
  useFormReset({
    form,
    elementRef: inputRef,
    defaultValue: initialValue.current,
  });
  const listboxContext = useMemo<ListboxContext>(
    () => ({
      inputRef,
      currentValue,
      selectedIconAfter,
      disableSelectedIcon,
    }),
    [currentValue, disableSelectedIcon, inputRef, selectedIconAfter]
  );

  const icon = getIcon("dropdown", propIcon);
  const theme = getFormConfig("theme", propTheme);
  let rightAddon = propRightAddon;
  if (typeof rightAddon === "undefined" && icon) {
    rightAddon = <IconRotator rotated={visible}>{icon}</IconRotator>;
  }

  let listboxLabelledBy = menuProps["aria-labelledby"];
  const listboxLabel = menuProps["aria-label"];
  if (!listboxLabel && !listboxLabelledBy) {
    listboxLabelledBy = labelId || comboboxId;
  }

  const { options, currentOption } = extractOptionsFromChildren(
    children,
    currentValue
  );

  const { onEntering, onEntered, onExiting, onExited, disableTransition } =
    menuProps;
  const handleMounting =
    (callback: TransitionEnterHandler | undefined = noop, skipped: boolean) =>
    (appearing: boolean) => {
      callback(appearing);

      const menu = popupRef.current;
      if (!menu || (skipped && !TRANSITION_CONFIG.disabled)) {
        return;
      }

      // Since the keyboard movement behavior is tied to the
      // `TextFieldContainer` or `input` element instead of the menu for this
      // widget, the focus index and active descendant must manually be updated
      // whenever the menu becomes visible. Without this, no items will be
      // focused until the first keyboard event that would move focus
      const focusables = getNonDisabledOptions(menu);
      let index: number;
      if (focusLast.current && !currentValue) {
        index = options.length - 1;
      } else {
        index = Math.max(
          0,
          options.findIndex((option) => option.value === currentValue)
        );
      }
      focusLast.current = false;
      currentFocusIndex.current = index;

      const option = focusables[index];
      // this should only be possible if no valid children were provided
      if (!option) {
        return;
      }
      option.scrollIntoView({ block: "nearest" });
      setActiveDescendantId(option.id || "");
    };

  const handleUnmounting =
    (callback: TransitionExitHandler | undefined = noop, skipped = false) =>
    (): void => {
      callback();

      if (!skipped || TRANSITION_CONFIG.disabled) {
        // since the menu is unmounted or set to hidden while not visible, need
        // to clear the aria-activedescendant and current focus index when
        // hiding
        currentFocusIndex.current = -1;
        setActiveDescendantId("");
      }
    };

  return (
    <ListboxProvider value={listboxContext}>
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
            {...inputProps}
            aria-hidden
            id={inputId}
            ref={inputRefCallback}
            name={name}
            type="text"
            value={value}
            tabIndex={-1}
            disabled={disabled}
            required={required}
            placeholder=" "
            defaultValue={defaultValue}
            className={cnb(select({ theme }), textField())}
            onChange={(event) => {
              onChange(event as SelectChangeEvent<Value>);
              if (typeof value !== "undefined") {
                return;
              }

              const nextValue = event.currentTarget.value;
              const nextOption = options.find(
                (option) => option.value === nextValue
              );

              setLocalValue(
                nextOption ? nextOption.value : initialValue.current
              );
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
        <Menu
          anchor={BELOW_CENTER_ANCHOR}
          width="min"
          {...menuProps}
          aria-label={listboxLabel}
          aria-labelledby={listboxLabelledBy as string}
          {...popupProps}
          visible={visible}
          fixedTo={comboboxRef}
          onRequestClose={hide}
          onEntering={handleMounting(onEntering, false)}
          onEntered={handleMounting(onEntered, !disableTransition)}
          onExiting={handleUnmounting(onExiting, false)}
          onExited={handleUnmounting(onExited, !disableTransition)}
          sheetProps={{
            ...menuProps.sheetProps,
            onEntering: handleMounting(menuProps.sheetProps?.onEntering, false),
            onEntered: handleMounting(
              menuProps.sheetProps?.onEntered,
              !disableTransition
            ),
            onExited: handleUnmounting(
              menuProps.sheetProps?.onExited,
              !disableTransition
            ),
          }}
        >
          {children}
        </Menu>
      </KeyboardMovementProvider>
    </ListboxProvider>
  );
}
