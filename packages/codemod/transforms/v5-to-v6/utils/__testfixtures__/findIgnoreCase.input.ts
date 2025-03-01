import { findIgnoreCase } from "react-md";

expect(findIgnoreCase("", list)).toBe(null);
expect(findIgnoreCase("f", list)).toBe(item1);
expect(findIgnoreCase("s", list)).toBe(item2);
expect(findIgnoreCase("thi", list)).toBe(item3);
const getItemValue1 = (item: string) => `thing-${item}`;
expect(findIgnoreCase("thing-a", FRUITS, { getItemValue: getItemValue1 })).toBe(
  "Apple"
);

