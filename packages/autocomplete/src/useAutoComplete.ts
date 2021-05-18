import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ListElement } from "@react-md/list";
import { TransitionHooks, useFixedPositioning } from "@react-md/transition";
import {
  ItemRefList,
  MovementPresets,
  scrollIntoView,
  useActiveDescendantMovement,
  useCloseOnOutsideClick,
  useEnsuredRef,
  useIsUserInteractionMode,
  useToggle,
} from "@react-md/utils";

import {
  AutoCompleteData,
  AutoCompleteListboxPositionOptions,
  AutoCompleteProps,
} from "./types";
import { getFilterFunction } from "./utils";

type EventHandlers = Pick<
  HTMLAttributes<HTMLInputElement>,
  "onBlur" | "onFocus" | "onChange" | "onClick" | "onKeyDown"
>;

export type RequiredAutoCompleteProps = Required<
  Pick<
    AutoCompleteProps,
    | "data"
    | "filter"
    | "filterOptions"
    | "filterOnNoValue"
    | "valueKey"
    | "getResultId"
    | "getResultValue"
    | "clearOnAutoComplete"
  >
>;

export type OptionalAutoCompleteProps = Pick<
  AutoCompleteProps,
  "onAutoComplete" | "disableShowOnFocus"
>;

export interface AutoCompleteOptions
  extends EventHandlers,
    OptionalAutoCompleteProps,
    RequiredAutoCompleteProps,
    AutoCompleteListboxPositionOptions {
  isListAutocomplete: boolean;
  isInlineAutocomplete: boolean;
  forwardedRef?: Ref<HTMLInputElement>;
  suggestionsId: string;
  propValue?: string;
  defaultValue?: string;
}

export interface AutoCompleteReturnValue {
  ref: (instance: HTMLInputElement | null) => void;
  match: string;
  value: string;
  visible: boolean;
  activeId: string;
  itemRefs: ItemRefList<HTMLLIElement>;
  filteredData: readonly AutoCompleteData[];
  listboxRef: MutableRefObject<ListElement | null>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleFocus: FocusEventHandler<HTMLInputElement>;
  handleClick: MouseEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  handleAutoComplete: (index: number) => void;
  fixedStyle: CSSProperties | undefined;
  transitionHooks: Required<TransitionHooks>;
}

/**
 * This hook handles all the autocomplete's "logic" and behavior.
 *
 * @internal
 */
export function useAutoComplete({
  suggestionsId,
  data,
  propValue,
  defaultValue = "",
  filter: filterFn,
  filterOptions,
  filterOnNoValue,
  valueKey,
  getResultId,
  getResultValue,
  onBlur,
  onFocus,
  onClick,
  onChange,
  onKeyDown,
  forwardedRef,
  onAutoComplete,
  clearOnAutoComplete,
  anchor,
  xMargin,
  yMargin,
  vwMargin,
  vhMargin,
  transformOrigin,
  listboxWidth,
  listboxStyle,
  preventOverlap,
  disableSwapping,
  disableVHBounds,
  closeOnResize,
  closeOnScroll,
  disableShowOnFocus: propDisableShowOnFocus,
  isListAutocomplete,
  isInlineAutocomplete,
}: AutoCompleteOptions): AutoCompleteReturnValue {
  const [ref, refHandler] = useEnsuredRef(forwardedRef);

  const filter = getFilterFunction(filterFn);
  const [
    { value: stateValue, match, filteredData: stateFilteredData },
    setState,
  ] = useState(() => {
    const options = {
      ...filterOptions,
      valueKey,
      getItemValue: getResultValue,
      startsWith: filterOptions?.startsWith ?? isInlineAutocomplete,
    };
    const value = propValue ?? defaultValue;
    const filteredData =
      filterOnNoValue || value ? filter(value, data, options) : data;

    let match = value;
    if (isInlineAutocomplete && filteredData.length) {
      match = getResultValue(filteredData[0], valueKey);
    }

    return {
      value,
      match,
      filteredData,
    };
  });
  const filteredData = filterFn === "none" ? data : stateFilteredData;
  const startsWith = filterOptions?.startsWith ?? isInlineAutocomplete;
  const value = propValue ?? stateValue;

  const setValue = useCallback(
    (nextValue: string) => {
      const isBackspace =
        value.length > nextValue.length ||
        (!!match && value.length === nextValue.length);

      let filtered = data;
      if (nextValue || filterOnNoValue) {
        const options = {
          ...filterOptions,
          valueKey,
          getItemValue: getResultValue,
          startsWith,
        };

        filtered = filter(nextValue, data, options);
      }

      let nextMatch = nextValue;
      if (isInlineAutocomplete && filtered.length && !isBackspace) {
        nextMatch = getResultValue(filtered[0], valueKey);

        const input = ref.current;
        if (input && !isBackspace) {
          input.value = nextMatch;
          input.setSelectionRange(nextValue.length, nextMatch.length);
        }
      }

      setState({ value: nextValue, match: nextMatch, filteredData: filtered });
    },
    [
      ref,
      data,
      filter,
      filterOnNoValue,
      filterOptions,
      isInlineAutocomplete,
      getResultValue,
      value,
      match,
      startsWith,
      valueKey,
    ]
  );

  // this is really just a hacky way to make sure that once a value has been
  // autocompleted, the menu doesn't immediately re-appear due to the hook below
  // for showing when the value/ filtered data list change
  const autocompleted = useRef(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      autocompleted.current = false;
      setValue(event.currentTarget.value);
    },
    [setValue, onChange]
  );

  const [visible, show, hide] = useToggle(false);
  const isTouch = useIsUserInteractionMode("touch");
  const disableShowOnFocus = propDisableShowOnFocus ?? isTouch;

  const focused = useRef(false);
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      focused.current = false;
    },
    [onBlur]
  );
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      if (disableShowOnFocus) {
        return;
      }

      focused.current = true;
      if (isListAutocomplete && filteredData.length) {
        show();
      }
    },
    [filteredData, isListAutocomplete, onFocus, show, disableShowOnFocus]
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick(event);
      }

      // since click events also trigger focus events right beforehand, want to
      // skip the first click handler and require a second click to show it.
      // this is why the focused.current isn't set onFocus for
      // disableShowOnFocus
      if (disableShowOnFocus && !focused.current) {
        focused.current = true;
        return;
      }

      if (isListAutocomplete && filteredData.length) {
        show();
      }
    },
    [disableShowOnFocus, filteredData.length, isListAutocomplete, onClick, show]
  );

  const handleAutoComplete = useCallback(
    (index: number) => {
      const result = filteredData[index];
      const resultValue = getResultValue(result, valueKey);
      if (onAutoComplete) {
        onAutoComplete({
          value: resultValue,
          index,
          result,
          dataIndex: data.findIndex(
            (datum) => getResultValue(datum, valueKey) === resultValue
          ),
          filteredData,
        });
      }

      setValue(clearOnAutoComplete ? "" : resultValue);
      autocompleted.current = true;
    },
    [
      clearOnAutoComplete,
      data,
      filteredData,
      getResultValue,
      onAutoComplete,
      valueKey,
      setValue,
    ]
  );

  const listboxRef = useRef<ListElement | null>(null);
  const {
    activeId,
    itemRefs,
    onKeyDown: handleKeyDown,
    focusedIndex,
    setFocusedIndex,
  } = useActiveDescendantMovement<
    AutoCompleteData,
    HTMLInputElement,
    HTMLLIElement
  >({
    ...MovementPresets.VERTICAL_COMBOBOX,
    getId: getResultId,
    items: filteredData,
    baseId: suggestionsId,
    onChange({ index, items, target }, itemRefs) {
      // the default scroll into view behavior for aria-activedescendant
      // movement won't work here since the "target" element will actually be
      // the input element instead of the listbox. So need to implement the
      // scroll into view behavior manually from the listbox instead.
      const item = itemRefs[index] && itemRefs[index].current;
      const { current: listbox } = listboxRef;
      if (item && listbox && listbox.scrollHeight > listbox.offsetHeight) {
        scrollIntoView(listbox, item);
      }

      if (!isInlineAutocomplete) {
        return;
      }

      const nextMatch = getResultValue(items[index], valueKey);
      target.value = nextMatch;
      target.setSelectionRange(0, nextMatch.length);
      setState((prevState) => ({
        ...prevState,
        value: nextMatch,
        match: nextMatch,
      }));
    },
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const input = event.currentTarget;
      switch (event.key) {
        case "ArrowDown":
          if (
            isListAutocomplete &&
            event.altKey &&
            !visible &&
            filteredData.length
          ) {
            // don't want the cursor to move if there is text
            event.preventDefault();
            event.stopPropagation();
            show();
            setFocusedIndex(-1);
          }
          break;
        case "ArrowUp":
          if (isListAutocomplete && event.altKey && visible) {
            // don't want the cursor to move if there is text
            event.preventDefault();
            event.stopPropagation();
            hide();
          }
          break;
        case "Tab":
          event.stopPropagation();
          hide();
          break;
        case "ArrowRight":
          if (
            isInlineAutocomplete &&
            input.selectionStart !== input.selectionEnd
          ) {
            const index = focusedIndex !== -1 ? focusedIndex : 0;
            hide();
            handleAutoComplete(index);
          }
          break;
        case "Enter":
          if (visible && focusedIndex >= 0) {
            event.stopPropagation();
            handleAutoComplete(focusedIndex);
            hide();
          }
          break;
        case "Escape":
          if (visible) {
            event.stopPropagation();
            hide();
          } else if (value) {
            event.stopPropagation();
            setValue("");
          }
          break;
        // no default
      }
    },
  });

  useCloseOnOutsideClick({
    enabled: visible,
    element: ref.current,
    onOutsideClick: hide,
  });

  const { style, onEnter, onEntering, onEntered, onExited, updateStyle } =
    useFixedPositioning({
      fixedTo: () => ref.current,
      anchor,
      onScroll(_event, { visible }) {
        if (closeOnScroll || !visible) {
          hide();
        }
      },
      onResize: closeOnResize ? hide : undefined,
      width: listboxWidth,
      xMargin,
      yMargin,
      vwMargin,
      vhMargin,
      transformOrigin,
      preventOverlap,
      disableSwapping,
      disableVHBounds,
    });

  useEffect(() => {
    if (!focused.current || autocompleted.current) {
      return;
    }

    if (filteredData.length && !visible && value.length && isListAutocomplete) {
      show();
    } else if (!filteredData.length && visible) {
      hide();
    }

    // this effect is just for toggling the visibility states as needed if the
    // value or filter data list changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, value]);

  useEffect(() => {
    if (!visible) {
      setFocusedIndex(-1);
      return;
    }

    updateStyle();

    // only want to trigger on data changes and setFocusedIndex shouldn't change
    // anyways
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, filteredData]);

  return {
    ref: refHandler,
    value,
    match,
    visible,
    activeId,
    itemRefs,
    filteredData,
    fixedStyle: { ...style, ...listboxStyle },
    transitionHooks: {
      onEnter,
      onEntering,
      onEntered,
      onExited,
    },
    listboxRef,
    handleBlur,
    handleFocus,
    handleClick,
    handleChange,
    handleKeyDown,
    handleAutoComplete,
  };
}
