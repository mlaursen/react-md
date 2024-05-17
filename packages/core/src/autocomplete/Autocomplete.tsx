"use client";
import {
  useEffect,
  type AriaAttributes,
  type ReactElement,
  type Ref,
} from "react";
import { TextField, type TextFieldProps } from "../form/TextField.js";
import { type ConfigurableComboboxMenuProps } from "../form/useCombobox.js";
import { useEditableCombobox } from "../form/useEditableCombobox.js";
import { Menu } from "../menu/Menu.js";
import { type KeyboardMovementFocusChangeEventHandler } from "../movement/types.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import {
  type PropsWithRef,
  type TextExtractor,
  type UseStateSetter,
} from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  AutocompleteCircularProgress,
  type AutocompleteCircularProgressProps,
} from "./AutocompleteCircularProgress.js";
import {
  AutocompleteDropdownButton,
  type ConfigurableAutocompleteDropdownButtonProps,
} from "./AutocompleteDropdownButton.js";
import { FilterAutocompleteOptions } from "./FilterAutocompleteOptions.js";
import { autocomplete, autocompleteRightAddon } from "./autocompleteStyles.js";
import {
  type AutocompleteMenuLabel,
  type AutocompleteOptionsProps,
} from "./types.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export interface AutocompleteProps<T>
  extends Omit<TextFieldProps, "value" | "defaultValue">,
    AutocompleteOptionsProps<T> {
  /** @defaultValue `"list"` */
  "aria-autocomplete"?: AriaAttributes["aria-autocomplete"];
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string;

  /**
   * An `aria-label` to pass to the `Menu` component that describes the list of
   * {@link options}. Either this or the {@link menuLabelledBy} are required for
   * accessibility.
   */
  menuLabel?: string;

  /**
   * An `aria-labelledby` to pass to the `Menu` component that describes the
   * list of {@link options}. Either this or the {@link menuLabel} are required
   * for accessibility.
   */
  menuLabelledBy?: string;

  /**
   * Any additional props that should be passed to the `Menu` component.
   */
  menuProps?: PropsWithRef<
    ConfigurableComboboxMenuProps & { id?: string },
    HTMLDivElement
  >;

  /**
   * This prop should only be used when `aria-autocomplete` is set to
   * `"inline"` or `"both"`.
   */
  onFocusChange?: KeyboardMovementFocusChangeEventHandler;

  /**
   * This can be used to add any custom styling, change the icon, change the
   * label, etc for the dropdown button.
   *
   * @example Simple Example
   * ```tsx
   * dropdownButtonProps={{
   *   "aria-label": "Open",
   *   className: styles.dropdownButton,
   *   icon: <MyCustomDropdownIcon />,
   * }}
   * ```
   */
  dropdownButtonProps?: ConfigurableAutocompleteDropdownButtonProps;

  /**
   * Set this to `true` to remove the {@link DropdownButton} from being rendered
   * after the input element.
   *
   * @defaultValue `false`
   */
  disableDropdownButton?: boolean;

  /**
   * Set this to `true` to disable a `<CircularProgress />` after the input and
   * before the `<DropdownButton />`.
   *
   * @defaultValue `false`
   */
  loading?: boolean;

  /**
   * @defaultValue `{ "aria-label": "Loading", ...loadingProps }`
   */
  loadingProps?: AutocompleteCircularProgressProps;
}

/**
 * @since 6.0.0
 */
export function Autocomplete<T extends string | { label: string }>(
  props: AutocompleteMenuLabel<Omit<AutocompleteProps<T>, "extractor">>
): ReactElement;
/**
 * @since 6.0.0
 */
export function Autocomplete<T>(
  props: AutocompleteMenuLabel<
    AutocompleteProps<T> & { extractor: TextExtractor<T> }
  >
): ReactElement;
export function Autocomplete<T>(
  props: AutocompleteMenuLabel<AutocompleteProps<T>>
): ReactElement {
  const {
    id: propId,
    value: propValue,
    defaultValue = "",
    onClick,
    onFocus,
    onKeyDown,
    onChange = noop,
    onFocusChange,
    className,
    options,
    children,
    inputRef,
    extractor,
    onAutocomplete = noop,
    getOptionProps,
    clearOnAutocomplete,
    menuProps,
    menuLabel,
    menuLabelledBy,
    containerProps,
    filter,
    whitespace,
    disableFilter,
    noOptionsChildren,
    dropdownButtonProps,
    disableDropdownButton,
    loading,
    loadingProps,
    rightAddon,
    rightAddonProps,
    ...remaining
  } = props;

  const { form } = props;
  const id = useEnsuredId(propId, "autocomplete");
  const menuId = useEnsuredId(menuProps?.id, "autocomplete-listbox");

  const [query, setQuery] = useEnsuredState<string, UseStateSetter<string>>({
    value: propValue,
    setValue: typeof propValue === "string" ? noop : undefined,
    defaultValue,
  });

  const {
    visible,
    setVisible,
    getMenuProps,
    comboboxRef,
    comboboxProps,
    movementContext,
  } = useEditableCombobox({
    form,
    onClick,
    onFocus,
    onKeyDown,
    onFocusChange,
    popupId: menuId,
    popupRef: menuProps?.ref,
    comboboxId: id,
    comboboxRef: inputRef,
  });
  const [containerNodeRef, containerRef] = useEnsuredRef(containerProps?.ref);
  useEffect(() => {
    const input = comboboxRef.current;
    if (!input || document.activeElement !== input) {
      return;
    }

    const target = input.value.length;
    input.setSelectionRange(target, target);
  }, [comboboxRef, loading]);

  return (
    <KeyboardMovementProvider value={movementContext}>
      <TextField
        aria-autocomplete="list"
        {...remaining}
        value={query}
        {...comboboxProps}
        containerProps={{
          ...containerProps,
          ref: containerRef,
        }}
        className={autocomplete({
          className,
          loading,
          disableDropdownButton,
        })}
        onChange={(event) => {
          onChange(event);
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          comboboxProps.onKeyDown(event);
          if (!visible && event.key === "Escape") {
            onAutocomplete(null);
          }
        }}
        onFocus={(event) => {
          comboboxProps.onFocus(event);
          event.currentTarget.setSelectionRange(
            0,
            event.currentTarget.value.length
          );
        }}
        rightAddon={
          <>
            {rightAddon}
            {loading && <AutocompleteCircularProgress {...loadingProps} />}
            {!disableDropdownButton && (
              <AutocompleteDropdownButton
                aria-label={menuLabel}
                aria-labelledby={menuLabelledBy}
                aria-controls={comboboxProps.id}
                {...dropdownButtonProps}
                visible={visible}
                onClick={() => {
                  comboboxRef.current?.focus();
                  setVisible((prev) => !prev);
                }}
              />
            )}
          </>
        }
        rightAddonProps={{
          ...rightAddonProps,
          pointerEvents: true,
          className: autocompleteRightAddon({
            className: rightAddonProps?.className,
          }),
        }}
      />
      <Menu
        aria-label={menuLabel as string}
        aria-labelledby={menuLabelledBy}
        {...getMenuProps(menuProps)}
        // since the `afterInputChildren` is not included in the `comboboxRef`'s
        // width, the menu will no longer be equal width without changing the
        // fixedTo node to the container
        fixedTo={containerNodeRef}
      >
        {children}
        <FilterAutocompleteOptions
          query={query}
          filter={filter}
          options={options}
          noOptionsChildren={noOptionsChildren}
          extractor={extractor}
          whitespace={whitespace}
          comboboxRef={comboboxRef}
          disableFilter={disableFilter || props["aria-autocomplete"] === "none"}
          getOptionProps={getOptionProps}
          onAutocomplete={onAutocomplete}
          clearOnAutocomplete={clearOnAutocomplete}
        />
      </Menu>
    </KeyboardMovementProvider>
  );
}
