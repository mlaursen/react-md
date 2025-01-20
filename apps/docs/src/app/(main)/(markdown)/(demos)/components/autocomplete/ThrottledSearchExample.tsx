"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { useThrottledFunction } from "@react-md/core/useThrottledFunction";
import { useUnmounted } from "@react-md/core/useUnmounted";
import { wait } from "@react-md/core/utils/wait";
import { type ReactElement, useRef, useState } from "react";

export default function ThrottledSearchExample(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<readonly string[]>([]);
  const query = useRef("");
  const unmounted = useUnmounted();
  const search = useThrottledFunction(async function load(
    value: string
  ): Promise<void> {
    query.current = value;
    await wait(1000);
    if (!unmounted.current) {
      setLoading(query.current !== value);
      setOptions(
        value.trim()
          ? Array.from({ length: 10 }, (_, i) => `${value} ${i + 1}`)
          : []
      );
    }
  }, 300);

  return (
    <Autocomplete
      type="search"
      label="Search"
      placeholder="Search..."
      listboxLabel="Resultsk"
      options={options}
      loading={loading}
      onChange={(event) => {
        setLoading(true);
        void search(event.currentTarget.value);
      }}
      style={{ width: "18rem" }}
    />
  );
}
