"use client";
import { cnb } from "cnbuilder";
import type { ChangeEvent, ReactElement, ReactNode, Ref } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconRotator, useIcon } from "../icon";
import type { MenuProps } from "../menu";
import { Menu } from "../menu";
import {
  findMatchIndex,
  isSearchableEvent,
  KeyboardMovementProvider,
  useKeyboardMovementProvider,
} from "../movement";
import { BELOW_CENTER_ANCHOR } from "../positioning";
import type {
  TransitionEnterHandler,
  TransitionExitHandler,
} from "../transition";
import { useEnsuredId } from "../useEnsuredId";
import { useEnsuredRef } from "../useEnsuredRef";
import { useToggle } from "../useToggle";
import { bem, loop } from "../utils";
import { useFormTheme } from "./FormThemeProvider";
import { extractOptionsFromChildren } from "./selectUtils";
import { SelectValue } from "./SelectValue";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";
import type { FormFieldOptions, UserAgentAutoCompleteProps } from "./types";
import { ListboxProvider } from "./useListboxProvider";
import { triggerManualChangeEvent, tryToSubmitRelatedForm } from "./utils";

const styles = bem("rmd-select");
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
export interface SelectProps<Value extends string>
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
 * **Client Component**
 *
 * @remarks \@since 6.0.0 Rewritten with a new API.
 */
export function Select<Value extends string>(
  props: SelectProps<Value>
): ReactElement {
  const {
    id: propId,
    className,
    active = false,
    inputRef: propInputRef,
    inputClassName,
    menuProps = {},
    containerProps: propContainerProps = {},
    icon: propIcon,
    value,
    defaultValue,
    onChange = noop,
    leftAddon,
    rightAddon: propRightAddon,
    disableValueAddon = false,
    disableSelectedIcon = false,
    children,
    ...remaining
  } = props;
  const { disabled = false, form } = props;

  const id = useEnsuredId(propId, "select");
  const containerId = useEnsuredId(propContainerProps.id, "select-container");
  const icon = useIcon("dropdown", propIcon);
  const { theme } = useFormTheme(props);

  const { toggled: visible, enable: show, disable: hide } = useToggle();
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

  // TODO: Need to update this to support editable listboxes where these props
  // would go to the input element instead of the container
  const a11yProps = {
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

      if (isSearchableEvent(event)) {
        event.stopPropagation();

        const nextIndex = findMatchIndex({
          value: event.key,
          values: searchValues,
          startIndex: event.shiftKey ? -1 : currentIndex,
        });

        if (nextIndex !== -1) {
          triggerManualChangeEvent(inputRef.current, options[nextIndex].value);
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

          triggerManualChangeEvent(inputRef.current, options[nextIndex].value);
          break;
        }
      }
    },
    loopable: false,
    searchable: true,
    programmatic: true,
    includeDisabled: false,
    tabIndexBehavior: "virtual",
    getDefaultFocusedIndex(focusOptions) {
      if (typeof menuProps.getDefaultFocusedIndex === "function") {
        return menuProps.getDefaultFocusedIndex(focusOptions);
      }

      const val = typeof value === "undefined" ? currentValue : value;
      return options.findIndex((option) => option.value === val);
    },
    getFocusableElements() {
      const menu = menuRef.current;
      if (!menu) {
        return [];
      }

      return [
        ...menu.querySelectorAll<HTMLLIElement>(
          '[role="option"]:not([aria-disabled])'
        ),
      ];
    },
  });

  const containerProps: Required<SelectProps<Value>>["containerProps"] = {
    ...propContainerProps,
    ...movementProps,
    ...a11yProps,
    ref: containerRefCallback,
  };

  const { onEntering, onEntered, onExiting, onExited, disableTransition } =
    menuProps;
  const handleMounting =
    (callback: TransitionEnterHandler | undefined = noop, skipped = false) =>
    (appearing: boolean) => {
      callback(appearing);

      const menu = menuRef.current;
      if (!menu || skipped) {
        return;
      }

      // Since the keyboard movement behavior is tied to the
      // `TextFieldContainer` or `input` element instead of the menu for this
      // widget, the focus index and active descendant must manually be updated
      // whenever the menu becomes visible. Without this, no items will be
      // focused until the first keyboard event that would move focus
      const val = typeof value === "undefined" ? currentValue : value;
      const focusables = getNonDisabledOptions(menu);
      const index = Math.max(
        0,
        options.findIndex((option) => option.value === val)
      );
      focusables[index].scrollIntoView({ block: "nearest" });
      currentFocusIndex.current = index;
      setActiveDescendantId(focusables[index]?.id || "");
    };

  const handleUnmounting =
    (callback: TransitionExitHandler | undefined = noop, skipped = false) =>
    (): void => {
      callback();

      if (!skipped) {
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
          type="text"
          tabIndex={-1}
          theme={theme}
          value={value}
          defaultValue={defaultValue}
          active={active || visible}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          className={cnb("rmd-select-container", className)}
          inputClassName={cnb(
            styles({
              filled: theme === "filled",
              outline: theme === "outline",
              underline: theme === "underline",
            }),
            inputClassName
          )}
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
          <SelectValue disableAddon={disableValueAddon} {...currentOption} />
        </TextField>
        <Menu
          aria-labelledby={containerId}
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
        >
          {children}
        </Menu>
      </KeyboardMovementProvider>
    </ListboxProvider>
  );
}
