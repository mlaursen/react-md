import {
  HTMLAttributes,
  MutableRefObject,
  useState,
  useMemo,
  useRef,
  useCallback,
  CSSProperties,
  useEffect,
} from "react";
import { useFixedPositioning, TransitionHooks } from "@react-md/transition";
import {
  applyRef,
  WithForwardedRef,
  useActiveDescendantMovement,
  MovementPresets,
  PositionWidth,
  PositionAnchor,
  useToggle,
  useCloseOnOutsideClick,
} from "@react-md/utils";

import {
  AutoCompletion,
  AutoCompleteData,
  AutoCompleteFilterFunction,
  FilterFunctionOptions,
  getFilterFunction,
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
  AutoCompleteHandler,
} from "./utils";

type EventHandlers = Pick<
  HTMLAttributes<HTMLInputElement>,
  "onBlur" | "onFocus" | "onChange" | "onKeyDown"
>;

interface AutoCompleteOptions
  extends EventHandlers,
    WithForwardedRef<HTMLInputElement> {
  autoComplete: AutoCompletion;
  data: AutoCompleteData[];
  suggestionsId: string;
  valueKey: string;
  getResultId: typeof DEFAULT_GET_RESULT_ID;
  getResultValue: typeof DEFAULT_GET_RESULT_VALUE;
  filter: AutoCompleteFilterFunction;
  filterOptions: FilterFunctionOptions;
  onAutoComplete?: AutoCompleteHandler;
  anchor: PositionAnchor;
  listboxWidth: PositionWidth;
  listboxStyle?: CSSProperties;
  disableHideOnResize: boolean;
  disableHideOnScroll: boolean;
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
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  handleAutoComplete: (index: number) => void;
  fixedStyle: CSSProperties | undefined;
  transitionHooks: Required<TransitionHooks>;
}

export default function useAutoComplete({
  autoComplete,
  suggestionsId,
  data,
  filter: filterFn,
  filterOptions,
  valueKey,
  getResultId,
  getResultValue,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  forwardedRef,
  onAutoComplete,
  anchor,
  listboxWidth,
  listboxStyle,
  disableHideOnResize,
  disableHideOnScroll,
}: AutoCompleteOptions): ReturnValue {
  const isListAutocomplete = autoComplete === "list" || autoComplete === "both";
  // const isInlineAutocomplete =
  //   autoComplete === "inline" || autoComplete === "both";

  const [value, setValue] = useState("");
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
      return data;
    }

    return filter(value, data, {
      ...filterOptions,
      valueKey,
      getItemValue: getResultValue,
    });
  }, [value, filterOptions, valueKey, getResultValue, data, filter]);

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
      if (isListAutocomplete) {
        show();
      }
    },
    [isListAutocomplete, onFocus, show]
  );

  const handleAutoComplete = useCallback(
    (index: number) => {
      const result = filteredData[index];
      const resultValue = getResultValue(result, valueKey);
      if (onAutoComplete) {
        onAutoComplete(resultValue, result, setValue);
      }

      setValue(resultValue);
      autocompleted.current = true;
    },
    [filteredData, getResultValue, onAutoComplete, valueKey]
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
        case "Enter":
          if (visible) {
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
    onScroll: disableHideOnScroll ? undefined : hide,
    onResize: disableHideOnResize ? undefined : hide,
    transformOrigin: true,
    width: listboxWidth,
    preventOverlap: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, value]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    updateStyle();
    setFocusedIndex(-1);

    // only want to trigger on data changes and setFocusedIndex shouldn't change anyways
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  useEffect(() => {
    if (!visible) {
      setFocusedIndex(-1);
    }

    // only want to trigger on visible changes -- and setFocusedIndex shouldn't really
    // change anyways
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return {
    ref,
    value,
    visible,
    activeId,
    itemRefs,
    filteredData,
    fixedStyle: { ...listboxStyle, ...style },
    transitionHooks: {
      onEnter,
      onEntering,
      onEntered,
      onExited,
    },
    handleBlur,
    handleFocus,
    handleChange,
    handleKeyDown,
    handleAutoComplete,
  };
}
