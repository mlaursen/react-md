"use client";
import { useCallback, useRef } from "react";
import { createFuzzyRegExp } from "./fuzzy.js";

/**
 * @since 6.0.0
 */
export interface FuzzyMatchOptions {
  value: string;
  query: string;
}

/**
 * @since 6.0.0
 */
export type FuzzyMatch = (options: FuzzyMatchOptions) => boolean;

/**
 * This hook implements a few optimizations for fuzzy searching and filtering
 * together for large datasets (10,000 or more items) and was really created
 * for the autocomplete component.
 *
 * @since 6.0.0
 */
export function useFuzzyMatch(): FuzzyMatch {
  const prevQuery = useRef("");
  const fuzzyRegExp = useRef<RegExp | null>(null);

  return useCallback((options: FuzzyMatchOptions) => {
    const { query, value } = options;
    if (!query) {
      return true;
    }

    if (!fuzzyRegExp.current || prevQuery.current !== query) {
      prevQuery.current = query;
      fuzzyRegExp.current = createFuzzyRegExp(query);
    }

    return value.length > 0 && fuzzyRegExp.current.test(value);
  }, []);
}
