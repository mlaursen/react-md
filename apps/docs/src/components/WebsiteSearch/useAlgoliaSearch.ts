import {
  type AutocompleteOption,
  type AutocompleteProps,
} from "@react-md/core/autocomplete/types";
import { type Hit, liteClient } from "algoliasearch/lite";
import { type IndexedItem } from "docs-generator/scripts/algolia/types";
import { useCallback, useRef, useState } from "react";

import {
  ALGOLIA_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
} from "@/constants/env.js";

import {
  type AlgoliaSearchHitGroup,
  useAlgoliaSearchOptions,
} from "./useAlgoliaSearchItems.js";

const searchClient = liteClient(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const noop = (): void => {
  // do nothing
};

interface AlgoliaSearchOptions {
  hide: () => void;
}

export type AlgoliaSearchImplementation = Pick<
  Required<AutocompleteProps<AutocompleteOption>>,
  "visible" | "setVisible" | "query" | "setQuery" | "loading" | "onChange"
> & {
  options: readonly AlgoliaSearchHitGroup[];
  isNoResults: boolean;
  resetOrHide: () => void;
};

export function useAlgoliaSearch(
  options: AlgoliaSearchOptions
): AlgoliaSearchImplementation {
  const { hide } = options;

  const [hits, setHits] = useState<readonly Hit<IndexedItem>[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const prevQuery = useRef("");
  const latestHitsQuery = useRef("");
  const reset = useCallback(() => {
    prevQuery.current = "";
    latestHitsQuery.current = "";
    setHits([]);
    setQuery("");
    setLoading(false);
  }, []);
  const resetOrHide = useCallback(() => {
    if (query) {
      reset();
    } else {
      hide();
    }
  }, [hide, query, reset]);
  const search = useCallback(
    async (rawQuery: string) => {
      if (!rawQuery) {
        reset();
        return;
      }

      setQuery(rawQuery);
      const query = rawQuery.trim();
      if (query === prevQuery.current) {
        return;
      }

      prevQuery.current = query;

      setLoading(true);
      const response = await searchClient.searchForHits<IndexedItem>({
        requests: [
          {
            query,
            indexName: ALGOLIA_INDEX_NAME,
            attributesToHighlight: [
              "name",
              "title",
              "description",
              "headings.heading",
              "headings.description",
            ],
          },
        ],
      });
      const [result] = response.results;
      setHits(result.hits);
      setLoading(false);
    },
    [reset]
  );

  const hitOptions = useAlgoliaSearchOptions(hits);
  const isNoResults = !!(query && hitOptions.length === 0 && !loading);

  return {
    options: hitOptions,
    query,
    setQuery,
    onChange: (event) => {
      search(event.currentTarget.value);
    },
    loading,
    isNoResults,
    resetOrHide,
    visible: true,
    setVisible: noop,
  };
}
