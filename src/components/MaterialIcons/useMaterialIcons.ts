import type { SVGIcon } from "@react-md/icon";
import { camelCase } from "lodash";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import type { Dispatch, SetStateAction } from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { IconCategory, IconType } from "src/constants/materialIcons";
import { ICON_CATEGORIES, ICON_TYPES } from "src/constants/materialIcons";

const ICON_TYPE_REGEXP = new RegExp(
  `(${ICON_TYPES.map((s) => camelCase(s)).join("|")})?Icon`,
  "i"
);

export interface IconReference {
  name: string;
  icon: typeof SVGIcon;
}

export type IconReferences = readonly Readonly<IconReference>[];

export type IconTypeState = IconType | "all";
export type IconCategoryState = IconCategory | "all";

export interface LoadIconsOptions {
  iconType: IconTypeState;
  iconCategory: IconCategoryState;
}

const isIconType = (iconType: unknown): iconType is IconTypeState =>
  typeof iconType === "string" &&
  (iconType === "all" || ICON_TYPES.includes(iconType as IconType));

export const getIconType = (query: ParsedUrlQuery): IconTypeState => {
  const { iconType } = query;

  return isIconType(iconType) ? iconType : "filled";
};

const isIconCategory = (
  iconCategory: unknown
): iconCategory is IconCategoryState =>
  typeof iconCategory === "string" &&
  (iconCategory === "all" ||
    ICON_CATEGORIES.includes(iconCategory as IconCategory));

export const getIconCategory = (query: ParsedUrlQuery): IconCategoryState => {
  const { iconCategory } = query;

  return isIconCategory(iconCategory) ? iconCategory : "action";
};

export const getSearchQuery = (query: ParsedUrlQuery): string =>
  typeof query.q === "string" ? query.q : "";

export async function loadIcons(
  options: LoadIconsOptions
): Promise<IconReferences> {
  const { iconType, iconCategory } = options;
  const components: IconReference[] = [];

  const iconTypes = iconType === "all" ? ICON_TYPES : [iconType];
  const iconCategories =
    iconCategory === "all" ? ICON_CATEGORIES : [iconCategory];

  const errors = await Promise.allSettled(
    iconTypes.map((iconType) =>
      Promise.allSettled(
        iconCategories.map(async (category) => {
          const indexExports: Record<string, typeof SVGIcon> = await import(
            `packages/material-icons/src/${iconType}/${category}`
          );

          components.push(
            ...Object.entries(indexExports).map<IconReference>(
              ([name, icon]) => ({
                name,
                icon,
              })
            )
          );
        })
      )
    )
  );

  if (process.env.NODE_ENV !== "production") {
    errors.forEach((error) => {
      if (error?.status === "rejected" && error.reason instanceof Error) {
        throw error.reason;
      }
    });
  }

  const compare = new Intl.Collator("en-US").compare;
  components.sort(({ name: aName }, { name: bName }) => {
    const name1 = aName.replace(ICON_TYPE_REGEXP, "");
    const name2 = bName.replace(ICON_TYPE_REGEXP, "");

    // they are in the same category, just different icon types
    if (name1 === name2) {
      return compare(aName, bName);
    }

    return compare(name1, name2);
  });

  return components;
}

interface State {
  loading: boolean;
  components: IconReferences;
}

type SetStateObject<Name extends string, Value> = {
  [key in Name]: Value;
} & {
  [key in `set${Capitalize<Name>}`]: Dispatch<SetStateAction<Value>>;
};

type ReturnValue = SetStateObject<"search", string> &
  SetStateObject<"iconType", IconTypeState> &
  SetStateObject<"iconCategory", IconCategoryState> & {
    loading: boolean;
    matches: IconReferences;
  };

export function useMaterialIcons(): ReturnValue {
  const { query } = useRouter();
  const [search, setSearch] = useState(() => getSearchQuery(query));
  const [iconType, setIconType] = useState<IconTypeState>(() =>
    getIconType(query)
  );
  const [iconCategory, setIconCategory] = useState<IconCategoryState>(() =>
    getIconCategory(query)
  );
  const [state, setState] = useState<State>({
    loading: false,
    components: [],
  });

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setState((prev) => ({ ...prev, loading: true }));
      const components = await loadIcons({ iconType, iconCategory });
      if (cancelled) {
        return;
      }

      setState({ loading: false, components });
    };
    load();

    return () => {
      cancelled = true;
    };
  }, [iconCategory, iconType]);
  const { loading, components } = state;
  const searchTerm = useDeferredValue(search.toLowerCase());
  const matches = useMemo(() => {
    if (!searchTerm) {
      return components;
    }

    return components.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm)
    );
  }, [components, searchTerm]);

  return {
    loading,
    matches,
    search,
    setSearch,
    iconType,
    setIconType,
    iconCategory,
    setIconCategory,
  };
}
