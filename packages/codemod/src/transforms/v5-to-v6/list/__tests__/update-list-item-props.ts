import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-list-item-props", null, fixture, {
    parser: "tsx",
  });
};

test("DeprecatedListItemProps");
test("ListItemTextChildrenProp");
test("ListItemLink");
test("DeprecatedListItemLinkProps");
test("SimpleListItem");
