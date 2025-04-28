// TODO: Check if `fuzzySearch` is using a list of objects and requires an `extractor` option
import { fuzzySearch } from "react-md";

const item1 = "Lorem ipsum";
const item2 = "another item";
const item3 = "in this string";
const item4 = "not interested, mate";
const item5 = "not in my house";
const list2 = [item1, item2, item3, item4, item5];

expect(fuzzySearch({
  query: "ti",
  list: list2
})).toEqual([item3]);
expect(fuzzySearch({
  query: "ti",
  list: list2,
  whitespace: "ignore"
})).toEqual([
  item2,
  item3,
  item4,
  item5,
]);
expect(fuzzySearch({
  query: "t i",
  list: list2,
  whitespace: "ignore"
})).toEqual([
  item2,
  item3,
  item4,
  item5,
]);
expect(fuzzySearch({
  query: "rem",
  list: list2,
  whitespace: "ignore"
})).toEqual([
  item1,
  item2,
]);
expect(fuzzySearch({
  query: "tem",
  list: list2,
  whitespace: "ignore"
})).toEqual([item2]);
