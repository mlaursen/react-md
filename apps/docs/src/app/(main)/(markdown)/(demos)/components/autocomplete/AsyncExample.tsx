"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type TextExtractor } from "@react-md/core/types";
import { useUnmounted } from "@react-md/core/useUnmounted";
import { wait } from "@react-md/core/utils/wait";
import { type ReactElement, useState } from "react";

import { type State, states } from "@/constants/states.js";

interface AsyncState {
  loading: boolean;
  options: readonly State[];
}

const extractor: TextExtractor<State> = (state) => state.name;

export default function AsyncExample(): ReactElement {
  const [{ loading, options }, setState] = useState<AsyncState>({
    loading: false,
    options: [],
  });
  const unmounted = useUnmounted();

  return (
    <Autocomplete
      label="State"
      options={options}
      listboxLabel="States"
      getOptionLabel={extractor}
      loading={loading}
      onOpen={async () => {
        setState({ loading: true, options: [] });
        await wait(800);
        if (!unmounted.current) {
          setState({
            loading: false,
            options: states,
          });
        }
      }}
      style={{ width: "18rem" }}
    />
  );
}
