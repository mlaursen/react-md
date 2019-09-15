import {
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  Ref,
  MutableRefObject,
} from "react";
import { applyRef } from "@react-md/utils";
import {
  AutoCompleteData,
  AutoCompleteFilterFunction,
  FilterFunctionOptions,
  getFilterFunction,
  AutoCompletion,
} from "./utils";

interface FilteredDataOptions<O extends {} = {}> {
  autoComplete: AutoCompletion;
  data: AutoCompleteData[];
  filter: AutoCompleteFilterFunction;
  options: FilterFunctionOptions<O>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  forwardedRef?: Ref<HTMLInputElement>;
}

interface ReturnValue {
  ref: Ref<HTMLInputElement>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  filteredData: AutoCompleteData[];
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function useFilteredData<O extends {} = {}>({
  data,
  filter: autocompleteFilter,
  options,
  onChange,
  autoComplete,
  forwardedRef,
}: FilteredDataOptions): ReturnValue {
  const [value, setValue] = useState("");
  const filter = useMemo(() => getFilterFunction<O>(autocompleteFilter), [
    autocompleteFilter,
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const ref = useCallback(
    (instance: HTMLInputElement | null) => {
      applyRef(instance, forwardedRef);
      inputRef.current = instance;
    },
    [forwardedRef]
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      setValue(event.currentTarget.value);
    },
    [onChange]
  );

  const filteredData = useMemo(
    () => filter(value, data, options as FilterFunctionOptions<O>),
    [filter, value, data, options]
  );
  useEffect(() => {
    if (
      (autoComplete !== "inline" && autoComplete !== "both") ||
      inputRef.current
    ) {
      return;
    }
  }, [autoComplete, filteredData]);

  return {
    ref,
    inputRef,
    value,
    setValue,
    handleChange,
    filteredData,
  };
}
