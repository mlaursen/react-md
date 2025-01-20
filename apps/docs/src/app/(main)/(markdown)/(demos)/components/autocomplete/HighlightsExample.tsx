"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { cssUtils } from "@react-md/core/cssUtils";
import { caseInsensitiveSearch } from "@react-md/core/searching/caseInsensitive";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { type ReactElement } from "react";

import { desserts } from "@/constants/desserts.js";

export default function HighlightsExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={desserts}
      getOptionLabel={(dessert) => dessert.name}
      filter={(options) => caseInsensitiveSearch(options)}
      getOptionProps={(options) => {
        const { option, query } = options;
        const matches = match(option.name, query, { insideWords: true });
        const parts = parse(option.name, matches);

        return {
          children: (
            <>
              {parts.map((part, index) => (
                <span
                  key={index}
                  className={cssUtils({
                    fontWeight: part.highlight ? "bold" : undefined,
                  })}
                >
                  {part.text}
                </span>
              ))}
            </>
          ),
        };
      }}
    />
  );
}
