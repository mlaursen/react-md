import { caseInsensitiveFilter } from "react-md";

const FRUITS = ["Apple", "Banana", "Mango", "Orange"];

expect(caseInsensitiveFilter("", list1)).toBe(list1);
expect(caseInsensitiveFilter("ap", FRUITS, { trim: true, startsWith: true })).toEqual([
  "Apple",
]);
expect(caseInsensitiveFilter("an", FRUITS, { ignoreWhitespace: true })).toEqual([]);

const list = ["Item 1", "This is Item 1"];
expect(caseInsensitiveFilter("item", list, { trim: false, ignoreWhitespace: false, startsWith: false })).toEqual([
  "Item 1",
]);
