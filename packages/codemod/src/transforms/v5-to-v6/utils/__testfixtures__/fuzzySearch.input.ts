import { fuzzyFilter } from "react-md";

const item1 = "Lorem ipsum";
const item2 = "another item";
const item3 = "in this string";
const item4 = "not interested, mate";
const item5 = "not in my house";
const list2 = [item1, item2, item3, item4, item5];

expect(fuzzyFilter("ti", list2)).toEqual([item3]);
expect(fuzzyFilter("ti", list2, { ignoreWhitespace: true })).toEqual([
  item2,
  item3,
  item4,
  item5,
]);
expect(fuzzyFilter("t i", list2, { ignoreWhitespace: true })).toEqual([
  item2,
  item3,
  item4,
  item5,
]);
expect(fuzzyFilter("rem", list2, { ignoreWhitespace: true })).toEqual([
  item1,
  item2,
]);
expect(fuzzyFilter("tem", list2, { ignoreWhitespace: true })).toEqual([item2]);
