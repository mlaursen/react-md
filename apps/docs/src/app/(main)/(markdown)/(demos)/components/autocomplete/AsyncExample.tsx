"use client";
import { states, type State } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { defaultAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { type TextExtractor } from "@react-md/core/types";
import { useUnmounted } from "@react-md/core/useUnmounted";
import { wait } from "@react-md/core/utils/wait";
import { useState, type ReactElement } from "react";

interface AsyncState {
  loading: boolean;
  options: readonly State[];
}

const extractor: TextExtractor<State> = (state) => state.name;

export default function AsyncExample(): ReactElement {
  const [value, setValue] = useState("");
  const [{ loading, options }, setState] = useState<AsyncState>({
    loading: false,
    options: [],
  });
  const unmounted = useUnmounted();

  return (
    <Autocomplete
      label="State"
      options={defaultAutocompleteFilter({
        list: options,
        query: value,
        extractor,
        whitespace: "trim",
      })}
      menuLabel="States"
      extractor={extractor}
      loading={loading}
      onChange={(event) => setValue(event.currentTarget.value)}
      disableFilter
      menuProps={{
        onEnter: async () => {
          setState({ loading: true, options: [] });
          await wait(3000);
          if (!unmounted.current) {
            setState({
              loading: false,
              options: states,
            });
          }
        },
      }}
      style={{ width: "18rem" }}
    />
  );
}
