import { describe, expect, it, jest } from "@jest/globals";
import { nanoid } from "nanoid";
import { useState } from "react";
import { fireEvent, render, screen } from "../../test-utils/index.js";
import { type NonNullMutableRef } from "../../types.js";
import { createFuzzyRegExp } from "../fuzzy.js";
import { toSearchQuery } from "../toSearchQuery.js";
import { useFuzzyMatch } from "../useFuzzyMatch.js";

const NON_DEPRECATED_STRING_PROPERTY_NAMES = [
  "at",
  "charAt",
  "charCodeAt",
  "codePointAt",
  "concat",
  "constructor",
  "endsWith",
  "includes",
  "indexOf",
  "lastIndexOf",
  "length",
  "localeCompare",
  "match",
  "matchAll",
  "normalize",
  "padEnd",
  "padStart",
  "repeat",
  "replace",
  "replaceAll",
  "search",
  "slice",
  "split",
  "startsWith",
  "substring",
  "toLocaleLowerCase",
  "toLocaleUpperCase",
  "toLowerCase",
  "toString",
  "toUpperCase",
  "trim",
  "trimEnd",
  "trimStart",
  "valueOf",
];

describe("useFuzzyMatch", () => {
  it("should only re-create the fuzzy regexp when the query changes", () => {
    const regexp = jest.spyOn(window, "RegExp");

    function Test() {
      const [value, setValue] = useState("");
      const fuzzyMatch = useFuzzyMatch();
      let match = "";
      const filtered: string[] = [];
      const query = toSearchQuery(value);
      for (const name of NON_DEPRECATED_STRING_PROPERTY_NAMES) {
        if (fuzzyMatch({ query, value: toSearchQuery(name) })) {
          if (query) {
            match ||= name;
          }
          filtered.push(name);
        }
      }

      return (
        <>
          <output data-testid="match">{match}</output>
          <output data-testid="filtered">{filtered.join(",")}</output>
          <label>
            Search
            <input
              type="text"
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </label>
        </>
      );
    }

    render(<Test />);

    const match = screen.getByTestId("match");
    const filtered = screen.getByTestId("filtered");
    const search = screen.getByRole("textbox", { name: "Search" });

    expect(regexp).not.toHaveBeenCalled();
    expect(match).toHaveTextContent("");
    expect(filtered).toHaveTextContent(
      NON_DEPRECATED_STRING_PROPERTY_NAMES.join(",")
    );

    fireEvent.change(search, { target: { value: "la" } });
    expect(regexp).toHaveBeenCalledTimes(1);
    expect(match).toHaveTextContent("lastIndexOf");
    expect(filtered).toHaveTextContent(
      [
        "lastIndexOf",
        "localeCompare",
        "replace",
        "replaceAll",
        "toLocaleLowerCase",
        "toLocaleUpperCase",
        "toLowerCase",
      ].join(",")
    );

    fireEvent.change(search, { target: { value: "la" } });
    expect(regexp).toHaveBeenCalledTimes(1);
    expect(match).toHaveTextContent("lastIndexOf");
    expect(filtered).toHaveTextContent(
      [
        "lastIndexOf",
        "localeCompare",
        "replace",
        "replaceAll",
        "toLocaleLowerCase",
        "toLocaleUpperCase",
        "toLowerCase",
      ].join(",")
    );

    fireEvent.change(search, { target: { value: "lar" } });
    expect(regexp).toHaveBeenCalledTimes(2);
    expect(match).toHaveTextContent("localeCompare");
    expect(filtered).toHaveTextContent(
      ["localeCompare", "toLocaleLowerCase", "toLocaleUpperCase"].join(",")
    );
  });

  it("should ideally be more performant that re-creating the regexp for each item", () => {
    // I should really do benchmarks instead of tests for this, but whatever.
    // The average duration for 10,000 items:
    // - Test1 -> 27
    // - Test2 -> 6
    //
    // For 1,000,000
    // - Test1 -> 1680
    // - Test2 -> 92
    //
    // Since this was really added for the useAutocomplete usage.... the
    // difference doesn't really matter since you won't be combining searching
    // and filtering 1,000,000 on the front end. Well.. you _shouldn't_.
    //
    // If you are only filtering or searching (not both), you should use the
    // `fuzzySearch` since it does this already behind the scenes.
    //
    // `for (let i = 0, l = items.length; i < l; i++)` and `.filter` are
    // _technically_ quicker than `for const .. of`, but it's the same results
    // so who cares? I wasted too much time for this hook that probably won't
    // even be used anyways
    const items = Array.from({ length: 1e4 }, () => nanoid());
    interface TestProps {
      query: string;
      filtered: NonNullMutableRef<string[]>;
    }

    function Test1({ query, filtered }: TestProps) {
      filtered.current = [];
      for (const item of items) {
        if (
          item.length > 0 &&
          createFuzzyRegExp(query).test(toSearchQuery(item))
        ) {
          filtered.current.push(item);
        }
      }

      return null;
    }

    function Test2({ query, filtered }: TestProps) {
      filtered.current = [];
      const fuzzyMatch = useFuzzyMatch();
      for (const item of items) {
        if (fuzzyMatch({ query, value: toSearchQuery(item) })) {
          filtered.current.push(item);
        }
      }

      return null;
    }

    const query = "aed";
    const filtered1: NonNullMutableRef<string[]> = { current: [] };
    const filtered2: NonNullMutableRef<string[]> = { current: [] };
    const start1 = performance.now();
    render(<Test1 query={query} filtered={filtered1} />);
    const end1 = performance.now();
    const duration1 = end1 - start1;

    const start2 = performance.now();
    render(<Test2 query={query} filtered={filtered2} />);
    const end2 = performance.now();
    const duration2 = end2 - start2;

    expect(filtered1.current.length).toBe(filtered2.current.length);
    expect(duration1).toBeGreaterThan(duration2);
  });
});
