// TODO: Check if `caseInsensitiveSearch` is using a list of objects and requires an `extractor` option
import { caseInsensitiveSearch } from "react-md";

expect(caseInsensitiveSearch({
  query: "",
  list,
  type: "search"
})).toBe(null);
expect(caseInsensitiveSearch({
  query: "f",
  list,
  type: "search"
})).toBe(item1);
expect(caseInsensitiveSearch({
  query: "s",
  list,
  type: "search"
})).toBe(item2);
expect(caseInsensitiveSearch({
  query: "thi",
  list,
  type: "search"
})).toBe(item3);
const getItemValue1 = (item: string) => `thing-${item}`;
expect(caseInsensitiveSearch({
  query: "thing-a",
  list: FRUITS,
  type: "search",
  extractor: getItemValue1
})).toBe(
  "Apple"
);

