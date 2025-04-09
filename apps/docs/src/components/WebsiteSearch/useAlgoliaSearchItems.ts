import {
  type HighlightResult,
  type HighlightResultOption,
  type Hit,
} from "algoliasearch/lite";
import {
  type HeadingWithDescription,
  type IndexedItem,
} from "docs-generator/scripts/algolia/types";
import { useMemo } from "react";

import { getGroupName } from "@/app/(main)/(markdown)/(apidocs)/sassdoc/[group]/utils.js";

interface ResolvedHighlights {
  name: boolean;
  title: boolean;
  description: boolean;
  headings?: readonly { title: boolean; description: boolean }[];
}

const resolveHighlights = (
  result: HighlightResult | undefined
): ResolvedHighlights => {
  const highlight = result as {
    name?: HighlightResultOption;
    title?: HighlightResultOption;
    description?: HighlightResultOption;
    headings?: Record<"title" | "description", HighlightResultOption>[];
  };
  const isHighlighted = (option: HighlightResultOption | undefined): boolean =>
    !!option && option.matchLevel !== "none";

  return {
    name: isHighlighted(highlight?.name),
    title: isHighlighted(highlight?.title),
    description: isHighlighted(highlight?.description),
    headings: highlight?.headings?.map((option) => ({
      title: isHighlighted(option.title),
      description: isHighlighted(option.description),
    })),
  };
};

export interface HeadingWithHighlights extends HeadingWithDescription {
  highlightTitle?: boolean;
  highlightDescription?: boolean;
}

export interface AlgoliaSearchHit {
  objectID: string;
  url: string;
  name: string;
  pathname: string;
  docType: string;
  description: string;
  headings: readonly HeadingWithHighlights[];
  highlightName?: boolean;
  highlightTitle?: boolean;
  highlightDescription?: boolean;
}

export type AlgoliaSearchHitGroup = readonly [
  groupName: string,
  items: readonly AlgoliaSearchHit[],
];

export function useAlgoliaSearchOptions(
  hits: readonly Hit<IndexedItem>[]
): readonly AlgoliaSearchHitGroup[] {
  return useMemo(() => {
    if (!hits.length) {
      return [];
    }

    const groups = new Map<string, AlgoliaSearchHit[]>();
    hits.forEach((hit, hitIndex) => {
      const {
        objectID,
        pathname,
        type,
        url,
        description,
        group,
        _highlightResult,
      } = hit;
      const highlights = resolveHighlights(
        _highlightResult as HighlightResultOption | undefined
      );
      if (
        !highlights.title &&
        !highlights.description &&
        !highlights.name &&
        !highlights.headings?.some((item) => item.title || item.description)
      ) {
        return;
      }

      if (type === "sassdoc") {
        const { name } = hit;
        const groupName = "Sassdoc";
        const grouped = groups.get(groupName) ?? [];
        grouped.push({
          objectID,
          url,
          name,
          pathname,
          docType: "Sassdoc",
          headings: [],
          description: getGroupName(group),
          highlightName: highlights.name,
          highlightTitle: highlights.title,
          highlightDescription: highlights.description,
        });
        groups.set(groupName, grouped);
        return;
      }

      const { title, docType, docGroup, headings } = hit;

      const groupName = docGroup ?? group ?? docType ?? title;
      const grouped = groups.get(groupName) ?? [];
      grouped.push({
        objectID,
        url,
        name: title,
        description,
        pathname,
        docType: docType ?? "Page",
        headings: headings.reduce<HeadingWithHighlights[]>(
          (result, heading, i) => {
            const highlight = highlights?.headings?.[i];

            if (hitIndex === 0 || highlight?.title || highlight?.description) {
              result.push({
                ...heading,
                highlightTitle: highlight?.title,
                highlightDescription: highlight?.description,
              });
            }

            return result;
          },
          []
        ),
        highlightName: highlights.name,
        highlightDescription: highlights.description,
      });

      groups.set(groupName, grouped);
    });

    return [...groups.entries()];
  }, [hits]);
}
