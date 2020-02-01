import {
  CSSProperties,
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Ref,
} from "react";
import {
  OptionalFixedPositionOptions,
  TransitionHooks,
  useFixedPositioning,
} from "@react-md/transition";
import {
  applyRef,
  MovementPresets,
  PositionWidth,
  useActiveDescendantMovement,
  useCloseOnOutsideClick,
  useToggle,
} from "@react-md/utils";

import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  AutoCompleteHandler,
  AutoCompletion,
  FilterFunctionOptions,
} from "./types";
import {
  getFilterFunction,
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
} from "./utils";

export interface PositionOptions
  extends Omit<OptionalFixedPositionOptions, "width"> {
  /**
   * The sizing behavior for the listbox. It will default to have the same width
   * as the select button, but it is also possible to either have the
   * `min-width` be the width of the select button or just automatically
   * determine the width.
   *
   * The sizing behavior will always ensure that the left and right bounds of
   * the listbox appear within the viewport.
   */
  listboxWidth?: PositionWidth;

  /**
   * An optional style to also apply to the listbox element showing all the
   * matches.
   */
  listboxStyle?: CSSProperties;

  /**
   * Boolean if the select's listbox should not hide if the user resizes the
   * browser while it is visible.
   */
  disableHideOnResize?: boolean;

  /**
   * Boolean if the select's listbox should not hide if the user scrolls the
   * page while it is visible.
   */
  disableHideOnScroll?: boolean;
}

type EventHandlers = Pick<
  HTMLAttributes<HTMLInputElement>,
  "onBlur" | "onFocus" | "onChange" | "onClick" | "onKeyDown"
>;

interface AutoCompleteOptions extends EventHandlers, PositionOptions {
  autoComplete: AutoCompletion;
  forwardedRef?: Ref<HTMLInputElement>;
  data: AutoCompleteData[];
  suggestionsId: string;
  valueKey: string;
  getResultId: typeof DEFAULT_GET_RESULT_ID;
  getResultValue: typeof DEFAULT_GET_RESULT_VALUE;
  getEmptyValueData: (data: AutoCompleteData[]) => AutoCompleteData[];
  filter: AutoCompleteFilterFunction;
  filterOptions: FilterFunctionOptions;
  onAutoComplete?: AutoCompleteHandler;
  clearOnAutoComplete: boolean;
}

interface ReturnValue {
  ref: (instance: HTMLInputElement | null) => void;
  value: string;
  visible: boolean;
  activeId: string;
  itemRefs: MutableRefObject<HTMLLIElement | null>[];
  filteredData: AutoCompleteData[];
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  handleFocus: React.FocusEventHandler<HTMLInputElement>;
  handleClick: React.MouseEventHandler<HTMLInputElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  handleAutoComplete: (index: number) => void;
  fixedStyle: CSSProperties | undefined;
  transitionHooks: Required<TransitionHooks>;
}

/**
 * This hook handles all the autocomplete's "logic" and behavior.
 *
 * @private
 */
export default function useAutoComplete({
  autoComplete,
  suggestionsId,
  data,
  filter: filterFn,
  filterOptions,
  valueKey,
  getResultId,
  getResultValue,
  getEmptyValueData,
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
  disableHideOnResize,
  disableHideOnScroll,
}: AutoCompleteOptions): ReturnValue {
  const isListAutocomplete = autoComplete === "list" || autoComplete === "both";
  // const isInlineAutocomplete =
  //   autoComplete === "inline" || autoComplete === "both";

  const [value, setValue] = useState("");

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
    [onChange]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const ref = useCallback(
    (instance: HTMLInputElement | null) => {
      applyRef(instance, forwardedRef);
      inputRef.current = instance;
    },
    [forwardedRef]
  );

  const filter = useMemo(() => getFilterFunction(filterFn), [filterFn]);
  const filteredData = useMemo(() => {
    if (!value) {
      return getEmptyValueData(data);
    }

    return filter(value, data, {
      ...filterOptions,
      valueKey,
      getItemValue: getResultValue,
    });
  }, [
    value,
    filter,
    data,
    filterOptions,
    valueKey,
    getResultValue,
    getEmptyValueData,
  ]);

  const [visible, show, hide] = useToggle(false);

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

      focused.current = true;
      if (isListAutocomplete && filteredData.length) {
        show();
      }
    },
    [filteredData, isListAutocomplete, onFocus, show]
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick(event);
      }

      if (isListAutocomplete && filteredData.length) {
        show();
      }
    },
    [filteredData.length, isListAutocomplete, onClick, show]
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
            datum => getResultValue(datum, valueKey) === resultValue
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
    ]
  );

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
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      switch (event.key) {
        case "ArrowDown":
          if (isListAutocomplete && event.altKey && !visible) {
            show();
            setFocusedIndex(-1);
          }
          break;
        case "ArrowUp":
          if (isListAutocomplete && event.altKey && visible) {
            hide();
          }
          break;
        case "Tab":
          hide();
          break;
        case "Enter":
          if (visible && focusedIndex >= 0) {
            handleAutoComplete(focusedIndex);
            hide();
          }
          break;
        case "Escape":
          if (visible) {
            hide();
          } else {
            setValue("");
          }
          break;
        // no default
      }
    },
  });

  useCloseOnOutsideClick({
    enabled: visible,
    element: inputRef.current,
    onOutsideClick: hide,
  });

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    updateStyle,
  } = useFixedPositioning({
    fixedTo: () => inputRef.current,
    anchor,
    onScroll(_event, { visible }) {
      if (!disableHideOnScroll || !visible) {
        hide();
      }
    },
    onResize: disableHideOnResize ? undefined : hide,
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
      return;
    }

    updateStyle();
    setFocusedIndex(-1);

    // only want to trigger on data changes and setFocusedIndex shouldn't change
    // anyways
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  useEffect(() => {
    if (!visible) {
      setFocusedIndex(-1);
    }

    // only want to trigger on visible changes -- and setFocusedIndex shouldn't
    // really change anyways
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return {
    ref,
    value,
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
    handleBlur,
    handleFocus,
    handleClick,
    handleChange,
    handleKeyDown,
    handleAutoComplete,
  };
}
