"use client";
import { states, type State } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { defaultAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { Box } from "@react-md/core/box/Box";
import { Chip } from "@react-md/core/chip/Chip";
import { type TextExtractor } from "@react-md/core/types";
import CancelOutlinedIcon from "@react-md/material-icons/CancelOutlinedIcon";
import { useState, type ReactElement } from "react";

const extractor: TextExtractor<State> = (state) => state.name;

interface FilterState {
  value: string;
  options: readonly State[];
  selected: State | null;
}

export default function DisableFilteringExample(): ReactElement {
  const [{ value, options, selected }, setState] = useState<FilterState>({
    value: "",
    selected: null,
    options: states,
  });
  const setValue = (value: string, selected?: State | null): void => {
    setState((prev) => ({
      selected: typeof selected === "undefined" ? prev.selected : selected,
      value,
      options: defaultAutocompleteFilter({
        list: states,
        query: value,
        extractor,
        whitespace: "trim",
      }),
    }));
  };

  return (
    <Box align="stretch" stacked>
      <Box disablePadding>
        {selected && (
          <Chip
            onClick={() => {
              setState((prev) => ({ ...prev, selected: null }));
            }}
            rightAddon={<CancelOutlinedIcon />}
          >
            {selected.name}
          </Chip>
        )}
      </Box>
      <Autocomplete
        label="State"
        menuLabel="States"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        options={options}
        extractor={extractor}
        disableFilter
        onAutocomplete={(option) => setValue("", option)}
      />
    </Box>
  );
}
