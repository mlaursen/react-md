"use client";
import {
  startTransition,
  useState,
  type AriaAttributes,
  type FC,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { TextField, type TextFieldProps } from "../form/TextField.js";
import { type ConfigurableComboboxMenuProps } from "../form/useCombobox.js";
import { useEditableCombobox } from "../form/useEditableCombobox.js";
import { triggerManualChangeEvent } from "../form/utils.js";
import { ListSubheader } from "../list/ListSubheader.js";
import { Menu } from "../menu/Menu.js";
import { MenuItem, type MenuItemProps } from "../menu/MenuItem.js";
import { type KeyboardMovementFocusChangeEventHandler } from "../movement/types.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { type WhitespaceFilter } from "../searching/types.js";
import {
  type PropsWithRef,
  type RequireAtLeastOne,
  type TextExtractor,
} from "../types.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import {
  AutocompleteCircularProgress,
  type AutocompleteCircularProgressProps,
} from "./AutocompleteCircularProgress.js";
import {
  AutocompleteDropdownButton,
  type AutocompleteDropdownButtonProps,
  type ConfigurableAutocompleteDropdownButtonProps,
} from "./AutocompleteDropdownButton.js";
import {
  defaultAutocompleteExtractor,
  defaultAutocompleteFilter,
  defaultAutocompleteOptionProps,
  type AutocompleteFilterOptions,
} from "./defaults.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export interface AutocompleteGetOptionPropsOptions<T> {
  index: number;
  option: T;
}

/**
 * @since 6.0.0
 */
export type AutocompleteMenuLabel<
  T extends { menuLabel?: string; menuLabelledBy?: string },
> = RequireAtLeastOne<T, "menuLabel" | "menuLabelledBy">;

/**
 * @since 6.0.0
 */
export interface AutocompleteProps<T>
  extends Omit<TextFieldProps, "value" | "defaultValue"> {
  /** @defaultValue `"list"` */
  "aria-autocomplete"?: AriaAttributes["aria-autocomplete"];
  inputRef?: Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string;

  /**
   * This list of options to display and will be filtered based on the current
   * value in the text box unless {@link disableFilter} is `true`.
   *
   * When this is not a list of strings or a list of objects with a
   * `{ label: string }`, the {@link extractor} is required to pull a searchable
   * string from each option.
   */
  options: readonly T[];

  /**
   * The children to display when there are no {@link options} due to the
   * current text box value.
   *
   * @defaultValue `<ListSubheader>No options</ListSubheader`
   */
  noOptionsChildren?: ReactNode;

  /**
   * This controls how the {@link options} are filtered based on the current
   * value in the text box.
   *
   * @example Fuzzy Search
   * ```tsx
   * import { fuzzySearch } from "@react-md/core/searching/fuzzy";
   *
   * <Autocomplete
   *   {...props}
   *   filter={fuzzySearch}
   * />
   * ```
   *
   * @defaultValue `caseInsensitiveSearch`
   */
  filter?(options: AutocompleteFilterOptions<T>): readonly T[];

  /**
   * @example
   * ```tsx
   * <Autocomplete
   *   options={[{ children: "Apple" }, { children = "Banana" }]}
   *   extractor={(option) => option.children}
   *   {...props}
   * />
   * ```
   */
  extractor?: TextExtractor<T>;

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
   * This can be used to add additional props to each option.
   *
   * @example Simple Example
   * ```tsx
   * getOptionProps={({ option }) => {
   *   return {
   *     disabled: option === "",
   *     className: cnb(option === "a" && styles.blue),
   *     leftAddon: option === value && <CheckIcon />,
   *   };
   * }}
   * ```
   */
  getOptionProps?(
    options: AutocompleteGetOptionPropsOptions<T>
  ): Partial<MenuItemProps> | undefined;

  /**
   * This will be called whenever one of the options are selected or reset.
   */
  onAutocomplete?(option: T | null): void;

  /**
   * Set this to `true` to disable the built-in filtering of the
   * {@link options}. This will always be `true` if `aria-autocomplete="none"`.
   *
   * @defaultValue `false`
   */
  disableFilter?: boolean;

  /** @defaultValue `"trim"` */
  whitespace?: WhitespaceFilter;

  /**
   * This prop should only be used when `aria-autocomplete` is set to
   * `"inline"` or `"both"`.
   */
  onFocusChange?: KeyboardMovementFocusChangeEventHandler;

  /**
   * This can be used to create a custom dropdown button when the
   * {@link dropdownButtonProps} aren't configurable enough for your use case.
   * This component will always be provided:
   *
   * ```tsx
   * <DropdownButton
   *   aria-label={menuLabel}
   *   aria-labelledby={menuLabelledBy}
   *   {...dropdownButtonProps}
   *   visible={visible}
   *   onClick={() => setVisible((prev) => !prev)}
   * />
   * ```
   *
   * @defaultValue `AutocompleteDropdownButton`
   */
  DropdownButton?: FC<AutocompleteDropdownButtonProps>;

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
    id,
    onClick,
    onFocus,
    onKeyDown,
    onChange = noop,
    onFocusChange,
    options,
    children,
    inputRef,
    extractor = defaultAutocompleteExtractor("Autocomplete"),
    onAutocomplete = noop,
    getOptionProps = defaultAutocompleteOptionProps,
    menuProps,
    menuLabel,
    menuLabelledBy,
    containerProps,
    filter = defaultAutocompleteFilter,
    whitespace = "keep",
    disableFilter: propDisableFilter,
    noOptionsChildren = <ListSubheader>No options</ListSubheader>,
    afterInputChildren,
    DropdownButton = AutocompleteDropdownButton,
    dropdownButtonProps,
    disableDropdownButton,
    loading,
    loadingProps,
    ...remaining
  } = props;

  const { form, value, defaultValue = "" } = props;
  const disableFilter =
    props["aria-autocomplete"] === "none" || propDisableFilter;
  const [filtered, setFiltered] = useState(() => {
    if (disableFilter || (!defaultValue && !value)) {
      return options;
    }

    return filter({
      list: options,
      query: value || defaultValue,
      extractor,
      whitespace,
    });
  });

  const renderedOptions = disableFilter ? options : filtered;

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
    popupId: menuProps?.id,
    popupRef: menuProps?.ref,
    comboboxId: id,
    comboboxRef: inputRef,
  });
  const [containerNodeRef, containerRef] = useEnsuredRef(containerProps?.ref);

  return (
    <KeyboardMovementProvider value={movementContext}>
      <TextField
        aria-autocomplete="list"
        {...remaining}
        {...comboboxProps}
        containerProps={{
          ...containerProps,
          ref: containerRef,
        }}
        onChange={(event) => {
          onChange(event);
          if (disableFilter || !visible) {
            return;
          }

          // use a transition to prevent the UI from being blocked while
          // filtering large lists
          const { value } = event.currentTarget;
          startTransition(() => {
            setFiltered(
              filter({
                list: options,
                query: value,
                extractor,
                whitespace,
              })
            );
          });
        }}
        onKeyDown={(event) => {
          comboboxProps.onKeyDown(event);
          if (!visible && event.key === "Escape") {
            onAutocomplete(null);
          }
        }}
        afterInputChildren={
          <>
            {afterInputChildren}
            {loading && <AutocompleteCircularProgress {...loadingProps} />}
            {!disableDropdownButton && (
              <DropdownButton
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
        {renderedOptions.length === 0 && noOptionsChildren}
        {renderedOptions.map((option, index) => {
          const label = extractor(option);
          const optionProps = getOptionProps({
            index,
            option,
          });

          return (
            <MenuItem
              key={label}
              role="option"
              {...optionProps}
              onClick={(event) => {
                optionProps?.onClick?.(event);

                triggerManualChangeEvent(comboboxRef.current, label);
                onAutocomplete(option);
              }}
            >
              {optionProps?.children ?? label}
            </MenuItem>
          );
        })}
      </Menu>
    </KeyboardMovementProvider>
  );
}
