import { withinRange } from "react-md";

expect(withinRange(100, undefined, undefined)).toBe(100);
expect(withinRange(0, undefined, undefined)).toBe(0);
expect(withinRange(-100, undefined, undefined)).toBe(-100);

expect(withinRange(0, 0, 10)).toBe(0);
expect(withinRange(-1, 0, 10)).toBe(0);
expect(withinRange(-0.00000001, 0, 10)).toBe(0);
expect(withinRange(20, 0, 20)).toBe(20);
expect(withinRange(20, 0, 19)).toBe(19);
expect(withinRange(10.5, 10, 11)).toBe(10.5);
expect(withinRange(10.5, 9, 10)).toBe(10);
