import { MutableRefObject, useCallback, useEffect } from "react";
import {
  MovementPresets,
  useActiveDescendantMovement,
  useCloseOnOutsideClick,
  useToggle,
} from "@react-md/utils";
import {
  AutoCompleteData,
  AutoCompletion,
  getResultId as DEFAULT_GET_RESULT_ID,
  getResultValue as DEFAULT_GET_RESULT_VALUE,
} from "./utils";

interface ComboboxOptions {
  autoComplete: AutoCompletion;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  suggestionsId: string;
  data: AutoCompleteData[];
  getResultId: typeof DEFAULT_GET_RESULT_ID;
  valueKey: string;
  getResultValue: typeof DEFAULT_GET_RESULT_VALUE;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  setValue(value: string): void;
  onAutocomplete: (value: string, result: AutoCompleteData) => void;
}

interface ReturnValue {
  activeId: string;
  itemRefs: MutableRefObject<HTMLLIElement | null>[];
  hide: () => void;
  visible: boolean;
  handleFocus?: React.FocusEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function useCombobox({
  data,
  autoComplete,
  suggestionsId,
  onFocus,
  onKeyDown,
  inputRef,
  valueKey,
  getResultId,
  getResultValue,
  setValue,
  onAutocomplete,
}: ComboboxOptions): ReturnValue {
  const [visible, show, hide] = useToggle(false);

  useCloseOnOutsideClick({
    enabled: visible,
    element: inputRef.current,
    onOutsideClick: hide,
  });

  const isListAutocomplete = autoComplete === "list" || autoComplete === "both";

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(event);
      }

      if (isListAutocomplete) {
        show();
      }
    },
    [onFocus, show, isListAutocomplete]
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
    items: data,
    baseId: suggestionsId,
    onKeyDown(event) {
      if (onKeyDown) {
        onKeyDown(event);
      }

      switch (event.key) {
        case "ArrowDown":
          if (isListAutocomplete && event.altKey && !visible) {
            show();
          }
          break;
        case "ArrowUp":
          if (isListAutocomplete && event.altKey && visible) {
            hide();
          }
          break;
        case "Enter":
          if (visible) {
            const result = data[focusedIndex];
            onAutocomplete(getResultValue(result, valueKey), result);
            hide();
          }
          break;
        case "Tab":
          hide();
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

  useEffect(() => {
    if (!visible) {
      return;
    }

    // need to "disable"/reset the active id whenever the list becomes hidden because
    // it's invalid to have `aria-activedescendant` pointing to an id that isn't in the
    // DOM
    setFocusedIndex(-1);

    // only want to trigger on visible and data changes, can ignore the setFocusedIndex
    // changes (if ever)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, data]);

  return {
    activeId,
    itemRefs,
    hide,
    visible,
    handleFocus,
    handleKeyDown,
  };
}
