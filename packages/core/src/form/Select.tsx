"use client";
import { cnb } from "cnbuilder";
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { IconRotator } from "../icon/IconRotator.js";
import { getIcon } from "../icon/iconConfig.js";
import { Menu, type MenuProps } from "../menu/Menu.js";
import {
  KeyboardMovementProvider,
  useKeyboardMovementProvider,
} from "../movement/useKeyboardMovementProvider.js";
import { BELOW_CENTER_ANCHOR } from "../positioning/constants.js";
import { TRANSITION_CONFIG } from "../transition/config.js";
import {
  type TransitionEnterHandler,
  type TransitionExitHandler,
} from "../transition/types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useToggle } from "../useToggle.js";
import { SelectedOption } from "./SelectedOption.js";
import { TextField, type TextFieldProps } from "./TextField.js";
import { getFormConfig } from "./formConfig.js";
import { select } from "./selectStyles.js";
import { extractOptionsFromChildren } from "./selectUtils.js";
import {
  type FormFieldOptions,
  type UserAgentAutoCompleteProps,
} from "./types.js";
import { useFormReset } from "./useFormReset.js";
import { type ListboxContext, ListboxProvider } from "./useListboxProvider.js";
import { tryToSubmitRelatedForm } from "./utils.js";

const EMPTY_STRING = "" as const;
const noop = (): void => {
  // do nothing
};

const getNonDisabledOptions = (
  container: HTMLElement
): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLLIElement>(
    '[role="option"]:not([aria-disabled])'
  ),
];

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
export interface SelectProps<Value extends string = string>
  extends Omit<TextFieldProps, "placeholder" | "type" | "onChange">,
    UserAgentAutoCompleteProps,
    FormFieldOptions {
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
  props: SelectProps<Value>
): ReactElement {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    id: propId,
    className,
    active = false,
    inputRef: propInputRef,
    inputClassName,
    menuProps = {},
    labelProps = {},
    containerProps: propContainerProps = {},
    selectedOptionProps,
    icon: propIcon,
    value,
    defaultValue,
    theme: propTheme,
    onChange = noop,
    leftAddon,
    rightAddon: propRightAddon,
    selectedIconAfter = false,
    disableOptionAddon = false,
    disableSelectedIcon = false,
    children,
    ...remaining
  } = props;
  const { form, label, disabled = false } = props;

  const id = useEnsuredId(propId, "select");
  const labelId = useEnsuredId(labelProps.id, "select-label");
  const containerId = useEnsuredId(propContainerProps.id, "select-container");
  const icon = getIcon("dropdown", propIcon);
  const theme = getFormConfig("theme", propTheme);

  const { toggled: visible, enable: show, disable: hide } = useToggle();
  const focusLast = useRef(false);
  const [inputRef, inputRefCallback] = useEnsuredRef(propInputRef);
  const [containerRef, containerRefCallback] = useEnsuredRef(
    propContainerProps.ref
  );
  const [menuRef, menuRefCallback] = useEnsuredRef(menuProps.nodeRef);
  const [currentValue, setCurrentValue] = useState(() => {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }

    return typeof value !== "undefined" ? value : EMPTY_STRING;
  });
  const initialValue = useRef(currentValue);
  useFormReset({
    form,
    elementRef: inputRef,
    defaultValue: initialValue.current,
  });

  const { options, currentOption } = extractOptionsFromChildren(
    children,
    typeof value === "undefined" ? currentValue : value
  );

  let rightAddon = propRightAddon;
  if (typeof rightAddon === "undefined" && icon) {
    rightAddon = <IconRotator rotated={visible}>{icon}</IconRotator>;
  }

  const listboxContext = useMemo<ListboxContext>(
    () => ({
      inputRef,
      currentValue: typeof value === "undefined" ? currentValue : value,
      selectedIconAfter,
      disableSelectedIcon,
    }),
    [currentValue, disableSelectedIcon, inputRef, selectedIconAfter, value]
  );

  // TODO: Need to update this to support editable listboxes where these props
  // would go to the input element instead of the container
  const a11yProps = {
    "aria-disabled": disabled || undefined,
    "aria-haspopup": "listbox",
    "aria-expanded": visible,
    role: "combobox",
    tabIndex: disabled ? -1 : 0,
  } as const;
  const {
    movementProps,
    movementContext,
    currentFocusIndex,
    setActiveDescendantId,
  } = useKeyboardMovementProvider<HTMLDivElement>({
    onFocus: propContainerProps.onFocus,
    onClick(event) {
      propContainerProps.onClick?.(event);
      if (disabled) {
        return;
      }

      show();
    },
    onKeyDown(event) {
      propContainerProps.onKeyDown?.(event);
      if (disabled) {
        return;
      }

      if (visible) {
        if (event.key === "Escape" || event.key === "Tab") {
          event.stopPropagation();
          hide();
        }

        return;
      }

      switch (event.key) {
        case " ":
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          event.stopPropagation();
          focusLast.current = event.key === "ArrowUp";
          show();
          break;
        case "Enter":
          tryToSubmitRelatedForm(event, form);
          break;
      }
    },
    loopable: false,
    searchable: true,
    programmatic: true,
    includeDisabled: false,
    tabIndexBehavior: "virtual",
    getFocusableElements() {
      const menu = menuRef.current;
      if (!menu) {
        return [];
      }

      return getNonDisabledOptions(menu);
    },
  });

  const containerProps: Required<SelectProps<Value>>["containerProps"] = {
    "aria-labelledby":
      ariaLabelledBy ?? (!ariaLabel && label ? labelId : undefined),
    "aria-label": ariaLabel,
    ...propContainerProps,
    ...movementProps,
    ...a11yProps,
    ref: containerRefCallback,
  };

  const { onEntering, onEntered, onExiting, onExited, disableTransition } =
    menuProps;
  const handleMounting =
    (callback: TransitionEnterHandler | undefined = noop, skipped: boolean) =>
    (appearing: boolean) => {
      callback(appearing);

      const menu = menuRef.current;
      if (!menu || (skipped && !TRANSITION_CONFIG.disabled)) {
        return;
      }

      // Since the keyboard movement behavior is tied to the
      // `TextFieldContainer` or `input` element instead of the menu for this
      // widget, the focus index and active descendant must manually be updated
      // whenever the menu becomes visible. Without this, no items will be
      // focused until the first keyboard event that would move focus
      const val = typeof value === "undefined" ? currentValue : value;
      const focusables = getNonDisabledOptions(menu);
      let index: number;
      if (focusLast.current && !val) {
        index = options.length - 1;
      } else {
        index = Math.max(
          0,
          options.findIndex((option) => option.value === val)
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
        <TextField
          {...remaining}
          aria-hidden
          id={id}
          ref={inputRefCallback}
          containerProps={containerProps}
          labelProps={{
            ...labelProps,
            id: labelId,
          }}
          type="text"
          tabIndex={-1}
          theme={theme}
          value={value}
          defaultValue={defaultValue}
          active={active || visible}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          className={cnb("rmd-select-container", className)}
          inputClassName={select({
            theme,
            className: inputClassName,
          })}
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
        >
          <SelectedOption
            option={currentOption}
            disableAddon={disableOptionAddon}
            {...selectedOptionProps}
          />
        </TextField>
        <Menu
          aria-labelledby={label ? labelId : containerId}
          anchor={BELOW_CENTER_ANCHOR}
          role="listbox"
          width="min"
          {...menuProps}
          ref={menuRefCallback}
          visible={visible}
          fixedTo={containerRef}
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
          }}
        >
          {children}
        </Menu>
      </KeyboardMovementProvider>
    </ListboxProvider>
  );
}
