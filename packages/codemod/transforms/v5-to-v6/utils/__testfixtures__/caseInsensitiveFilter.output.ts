// TODO: Check if `caseInsensitiveSearch` is using a list of objects and requires an `extractor` option
import { caseInsensitiveSearch } from "react-md";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

expect(caseInsensitiveSearch({
  query: "",
  list: list1
})).toBe(list1);
expect(caseInsensitiveSearch({
  query: "ap",
  list: FRUITS,
  whitespace: "trim",
  startsWith: true
})).toEqual([
  "Apple",
]);
expect(caseInsensitiveSearch({
  query: "an",
  list: FRUITS,
  whitespace: "ignore"
})).toEqual([]);

const list = ["Item 1", "This is Item 1"];
expect(caseInsensitiveSearch({
  query: "item",
  list
})).toEqual([
  "Item 1",
]);
