import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-list-item-props", null, fixture, {
    parser: "tsx",
  });
};

test("DeprecatedListItemProps");
test("ListItemTextChildrenProp");
test("ListItemLink");
test("DeprecatedListItemLinkProps");
test("SimpleListItem");
