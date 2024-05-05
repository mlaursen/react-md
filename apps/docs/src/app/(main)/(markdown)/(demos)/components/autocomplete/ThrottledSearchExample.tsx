"use client";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { useThrottledFunction } from "@react-md/core/useThrottledFunction";
import { useUnmounted } from "@react-md/core/useUnmounted";
import { wait } from "@react-md/core/utils/wait";
import { useState, type ReactElement } from "react";

export default function ThrottledSearchExample(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<readonly string[]>([]);
  const unmounted = useUnmounted();
  const search = useThrottledFunction(async function load(
    value: string
  ): Promise<void> {
    await wait(2000);
    if (!unmounted.current) {
      setLoading(false);
      setOptions(Array.from({ length: 10 }, (_, i) => `${value} ${i + 1}`));
    }
  }, 300);

  return (
    <Autocomplete
      label="Search"
      placeholder="Search..."
      menuLabel="Resultsk"
      options={options}
      loading={loading}
      disableFilter
      onChange={(event) => {
        const { value } = event.currentTarget;
        if (!value.trim()) {
          return;
        }

        setLoading(true);
        search(value);
      }}
      style={{ width: "18rem" }}
    />
  );
}
