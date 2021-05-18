import React, { forwardRef, HTMLAttributes, useCallback, useRef } from "react";
import cn from "classnames";
import { List, ListElement } from "@react-md/list";
import { RenderConditionalPortalProps } from "@react-md/portal";
import {
  OverridableCSSTransitionProps,
  ScaleTransition,
} from "@react-md/transition";
import {
  bem,
  DEFAULT_GET_ITEM_VALUE,
  MovementPresets,
  omit,
  scrollIntoView,
  useActiveDescendantMovement,
} from "@react-md/utils";

import { Option } from "./Option";
import {
  defaultIsOptionDisabled,
  getOptionId as DEFAULT_GET_OPTION_ID,
  getOptionLabel as DEFAULT_GET_OPTION_LABEL,
  isListboxOptionProps,
  ListboxOption,
  ListboxOptionProps,
} from "./utils";

export type ListboxChangeEventData = Pick<
  Required<ListboxProps>,
  "id" | "valueKey" | "value" | "options"
> &
  Pick<ListboxProps, "name">;

/**
 * A function to call when the value of the listbox changes. This will be called
 * whenever the user clicks a new option within the select field with either the
 * mouse, touch, or the enter/space key.
 *
 * Note: This will be called **each time the user keyboard selects** a new
 * option by either typing to find a match, using the home/end keys, or using
 * the arrow keys. If this is undesired behavior, enable the
 * `disableMovementChange` prop so that it'll only be called on "click" events.
 *
 * @param nextValue - The next value that should be set for the listbox.
 * @param option - The option that was selected.
 * @param listbox - Part of the listbox props to help identify which listbox has
 * been changed if reusing an event handler for multiple form parts.
 */
export type ListboxChangeEventHandler = (
  nextValue: string,
  option: ListboxOption,
  listbox: ListboxChangeEventData
) => void;

export interface ListboxOptions extends RenderConditionalPortalProps {
  /**
   * An optional name to provide for the listbox that will be provided with the
   * `onChange` callback.
   */
  name?: string;

  /**
   * The list of options to display within the listbox.
   */
  options: ListboxOption[];

  /**
   * A key to use that extracts the display label for an option from the options
   * list. This will only be used if the option is an object and is passed to
   * the `getOptionLabel` prop.
   */
  labelKey?: string;

  /**
   * A key to use that extracts the value for the option from the options list.
   * This will only be used if the option is an object and will be passed to the
   * `getOptionValue` prop.
   */
  valueKey?: string;

  /**
   * A function to call for each option that should return a unique id for the
   * specific option in the list. These ids are required for handling
   * `aria-activedescendant` movement within the listbox.
   */
  getOptionId?: typeof DEFAULT_GET_OPTION_ID;

  /**
   * A function that will get a display label for an option. The default
   * behavior is to render any number or string options as the label, otherwise
   * attempt to do `option[labelKey] || option.children`.
   */
  getOptionLabel?: typeof DEFAULT_GET_OPTION_LABEL;

  /**
   * A function that will get the value for an option. The default behavior is
   * to render any number or string options as the value, otherwise attempt to
   * do `option[valueKey]`.
   */
  getOptionValue?: typeof DEFAULT_GET_ITEM_VALUE;

  /**
   * A function to call for each option to check if it is currently disabled.
   * This is really just a convenience prop so that you don't need to modify the
   * `options` yourself.
   */
  isOptionDisabled?: (option: ListboxOption) => boolean;

  /**
   * The listbox is a controlled component, so you will need to provide the
   * current value and an `onChange` handler. The `value` must be a string and
   * _should_ be one of the option's values when something has been selected. If
   * you want to have an "empty" select box to require the user to manually
   * select something to be considered valid, you can set this to the empty
   * string and it'll be considered "unvalued".
   */
  value: string;

  /**
    @see ListboxChangeEventHandler
   */
  onChange: ListboxChangeEventHandler;

  /**
   * Boolean if using the keyboard should not immediately trigger the `onChange`
   * callback. When this is enabled, the `onChange` callback will only be called
   * if the user clicks an item or presses the enter or space key.
   */
  disableMovementChange?: boolean;
}

export interface ListboxProps
  extends Omit<
      HTMLAttributes<ListElement>,
      "value" | "defaultValue" | "onChange"
    >,
    ListboxOptions,
    OverridableCSSTransitionProps {
  /**
   * The id for the listbox. This is required for a11y and is used to generate
   * unique ids for each option within the listbox for `aria-activedescendant`
   * movement.
   */
  id: string;

  /**
   * Boolean if the listbox is in a temporary element (like a dropdown). This
   * will update the behavior so that the default `tabIndex` is `-1` instead of
   * `0` since it shouldn't be tab focusable within a dropdown.
   */
  temporary?: boolean;

  /**
   * Boolean if the listbox is visible. This should stay defaulted as `true`
   * when the `temporary` prop is set to `false`.
   */
  visible?: boolean;

  /**
   * A function to call that should set the visible prop to `false`. This
   * **must** be provided when the `temporary` prop is enabled.
   */
  onRequestClose?: () => void;

  /**
   * Boolean if all the options should just be read only and prevent the
   * `onChange` handler to be called when an option is keyboard focused or
   * clicked.
   */
  readOnly?: boolean;
}

const block = bem("rmd-listbox");

let warned: Set<string> | undefined;

/**
 * This component is used to render the list part of a `<select>` element with
 * built-in accessibility and the ability to add custom styles. This should
 * probably not be used much outside of `react-md` itself and the `Select`
 * component, but I'm planning on adding support for an inline listbox at some
 * point.
 */
export const Listbox = forwardRef<ListElement, ListboxProps>(function Listbox(
  {
    className,
    visible = true,
    temporary = false,
    labelKey = "label",
    valueKey = "value",
    getOptionId = DEFAULT_GET_OPTION_ID,
    getOptionLabel = DEFAULT_GET_OPTION_LABEL,
    getOptionValue = DEFAULT_GET_ITEM_VALUE,
    isOptionDisabled = defaultIsOptionDisabled,
    disableMovementChange = false,
    onFocus,
    onKeyDown: propOnKeyDown,
    name,
    options,
    value,
    onChange,
    tabIndex: propTabIndex,
    portal,
    portalInto,
    portalIntoId,
    onRequestClose,
    timeout,
    readOnly,
    classNames,
    mountOnEnter,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...props
  },
  ref
) {
  const { id } = props;
  let tabIndex = propTabIndex;
  if (temporary) {
    tabIndex = -1;
  } else if (typeof propTabIndex === "undefined") {
    tabIndex = 0;
  }

  /**
   * Gets the current index of the option that has the same value as the
   * provided prop value.
   */
  const getIndex = useCallback(
    () =>
      options.findIndex((option) => value === getOptionValue(option, valueKey)),
    [getOptionValue, options, value, valueKey]
  );

  /**
   * Conditionally calls the onChange callback with the new value and option if
   * the value has changed. This will be called when:
   * - the user presses the enter or space key while "focusing" an option
   * - the user keyboard navigates to a new option while the
   *   `disableMovementChange` prop is `false`
   * - the user clicks the option with a mouse or touch
   */
  const handleChange = useCallback(
    (index: number) => {
      if (readOnly) {
        return;
      }

      const option = options[index];
      if (!option || isOptionDisabled(option)) {
        return;
      }

      const optionValue = getOptionValue(option, valueKey);
      if (value !== optionValue) {
        onChange(optionValue, options[index], {
          id,
          name,
          value,
          valueKey,
          options,
        });
      }
    },
    [
      getOptionValue,
      id,
      isOptionDisabled,
      name,
      onChange,
      options,
      readOnly,
      value,
      valueKey,
    ]
  );

  const handleKeyboardClick = useCallback(
    (focusedIndex: number) => {
      handleChange(focusedIndex);
      if (temporary && onRequestClose) {
        onRequestClose();
      }
    },
    [handleChange, onRequestClose, temporary]
  );

  const { activeId, itemRefs, onKeyDown, focusedIndex, setFocusedIndex } =
    useActiveDescendantMovement<ListboxOption, ListElement, HTMLLIElement>({
      ...MovementPresets.VERTICAL_LISTBOX,
      defaultFocusedIndex: getIndex,
      items: options,
      baseId: id,
      valueKey: labelKey,
      getId: getOptionId,
      getItemValue(option, key) {
        if (!isListboxOptionProps(option)) {
          return `${option}`;
        }

        const search = option[key];
        if (typeof search === "number" || typeof search === "string") {
          return `${search}`;
        }

        if (process.env.NODE_ENV !== "production") {
          if (!warned) {
            warned = new Set();
          }

          if (!warned.has(id)) {
            /* eslint-disable no-console */
            console.warn(
              `A listbox with an id of "${id}" has an option that does not have a searchable label string. ` +
                "Users will be unable to use the typeahead feature in the Listbox component until this is fixed. " +
                "To fix this warning, you can use the `labelKey` prop on the `Listbox`/`Select` component to point " +
                "to a string on the following option:",
              option
            );

            warned.add(id);
          }
        }
        return "";
      },
      onChange(data) {
        if (disableMovementChange) {
          return;
        }

        handleChange(data.index);
      },
      onEnter: handleKeyboardClick,
      onSpace: handleKeyboardClick,
      onKeyDown(event) {
        if (propOnKeyDown) {
          propOnKeyDown(event);
        }

        switch (event.key) {
          case "Tab":
          case "Escape":
            if (event.key === "Escape") {
              event.stopPropagation();
            }

            if (temporary && onRequestClose) {
              onRequestClose();
            }
            break;
          // no default
        }
      },
    });

  const prevVisible = useRef(visible);
  if (visible !== prevVisible.current) {
    prevVisible.current = visible;
    // whenever it gains visibility, try to set the focused index to the
    // current active value
    if (visible) {
      setFocusedIndex(getIndex());
    }
  }

  const handleFocus = useCallback(
    (event: React.FocusEvent<ListElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      const item = itemRefs[focusedIndex] && itemRefs[focusedIndex].current;
      if (item) {
        scrollIntoView(event.currentTarget, item);
      }
    },
    [focusedIndex, itemRefs, onFocus]
  );

  return (
    <ScaleTransition
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
      visible={!temporary || visible}
      vertical
      timeout={timeout}
      classNames={classNames}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <List
        {...props}
        aria-activedescendant={activeId}
        ref={ref}
        role="listbox"
        tabIndex={tabIndex}
        className={cn(block({ temporary }), className)}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
      >
        {options.map((option, i) => {
          const optionId = getOptionId(id, i);
          const optionValue = getOptionValue(option, valueKey);
          const optionLabel = getOptionLabel(option, labelKey);
          let optionProps: ListboxOptionProps | undefined;
          if (isListboxOptionProps(option)) {
            optionProps = omit(option, [labelKey, valueKey]);
          }

          const disabled = isOptionDisabled(option);

          let onClick;
          if (!readOnly && !disabled) {
            onClick = () => {
              handleChange(i);
              setFocusedIndex(i);
            };
          }

          return (
            <Option
              key={optionValue}
              id={optionId}
              disabled={disabled}
              {...optionProps}
              ref={itemRefs[i]}
              focused={optionId === activeId}
              selected={value === optionValue}
              onClick={onClick}
            >
              {optionLabel}
            </Option>
          );
        })}
      </List>
    </ScaleTransition>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Listbox.propTypes = {
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      className: PropTypes.string,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      getOptionId: PropTypes.func,
      getOptionLabel: PropTypes.func,
      getOptionValue: PropTypes.func,
      isOptionDisabled: PropTypes.func,
      visible: PropTypes.bool,
      temporary: PropTypes.bool,
      onRequestClose: PropTypes.func,
      disableMovementChange: PropTypes.bool,
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      readOnly: PropTypes.bool,
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      portalIntoId: PropTypes.string,
      tabIndex: PropTypes.number,
      onFocus: PropTypes.func,
      onKeyDown: PropTypes.func,
      name: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.object,
        ])
      ).isRequired,
    };
  } catch (e) {}
}
