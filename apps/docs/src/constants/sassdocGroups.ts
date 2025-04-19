import { type GeneratedSassDoc } from "sassdoc-generator";
import {
  type FormattedFunctionItem,
  type FormattedMixinItem,
  type FormattedVariableItem,
} from "sassdoc-generator/types";

import {
  SASSDOC_FUNCTIONS,
  SASSDOC_MIXINS,
  SASSDOC_VARIABLES,
} from "@/generated/sassdoc.js";
import { getGroupName } from "@/utils/sassdoc.js";

interface SassDocGroup {
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
}

const grouped = new Map<string, SassDocGroup>();

function getByGroupName(groupName: string): SassDocGroup {
  return (
    grouped.get(groupName) || {
      mixins: new Map(),
      functions: new Map(),
      variables: new Map(),
    }
  );
}
Object.values(SASSDOC_MIXINS).forEach((item) => {
  if (!item || item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.mixins.set(item.name, item);
  grouped.set(groupName, group);
});
Object.values(SASSDOC_FUNCTIONS).forEach((item) => {
  if (!item || item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.functions.set(item.name, item);
  grouped.set(groupName, group);
});
Object.values(SASSDOC_VARIABLES).forEach((item) => {
  if (!item || item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.variables.set(item.name, item);
  grouped.set(groupName, group);
});

export const SASSDOC_GROUP_NAMES = [...grouped.keys()];
export const SASSDOC_GROUP: ReadonlyMap<string, GeneratedSassDoc> = grouped;
