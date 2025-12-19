import { DEFAULT_COLLATOR } from "@react-md/core/utils/alphaNumericSort";
import { Fragment, type ReactElement } from "react";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { MarkdownLink } from "@/components/MarkdownLink.jsx";
import { SASSDOC_GROUP } from "@/constants/sassdocGroups.js";
import { isFormattedVariableItem } from "@/utils/sassdoc.js";
import { titleCase } from "@/utils/strings.js";

const PREFERRED_ORDER = ["theme", "transition", "typography", "interaction"];

const DEBUG = process.env.NODE_ENV !== "production";

const getPrefix = (item: FormattedSassDocItem): string =>
  isFormattedVariableItem(item) ? "$" : "";

export function AvailableSassAPI(): ReactElement {
  const sorted = [...SASSDOC_GROUP.entries()];
  sorted.sort(([aName], [bName]) => {
    const indexA = PREFERRED_ORDER.indexOf(aName);
    const indexB = PREFERRED_ORDER.indexOf(bName);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }

    return DEFAULT_COLLATOR.compare(aName, bName);
  });

  return (
    <ul>
      {sorted.map(([group, sassdoc]) => {
        const title = titleCase(group, "-");
        const vars = sassdoc.variables.get(`${group}-variables`);
        const getVar = sassdoc.functions.get(`${group}-get-var`);
        const setVar = sassdoc.mixins.get(`${group}-set-var`);
        const useVar = sassdoc.mixins.get(`${group}-use-var`);
        if (!vars || !getVar || !setVar || !useVar) {
          return (
            <Fragment key={group}>
              {DEBUG && <li>{title} cannot be customized.</li>}
            </Fragment>
          );
        }
        const items = [vars, useVar, setVar, getVar];
        if (items.length === 0) {
          return null;
        }

        return (
          <li key={group}>
            {title}
            <ul>
              {items.map((item) => (
                <li key={item.name}>
                  <MarkdownLink href={`${getPrefix(item)}${item.name}`}>
                    $SASSDOC
                  </MarkdownLink>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
