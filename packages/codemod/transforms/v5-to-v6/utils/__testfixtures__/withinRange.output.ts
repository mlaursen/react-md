import { withinRange } from "react-md";

expect(withinRange({
  min: undefined,
  max: undefined,
  value: 100
})).toBe(100);
expect(withinRange({
  min: undefined,
  max: undefined,
  value: 0
})).toBe(0);
expect(withinRange({
  min: undefined,
  max: undefined,
  value: -100
})).toBe(-100);

expect(withinRange({
  min: 0,
  max: 10,
  value: 0
})).toBe(0);
expect(withinRange({
  min: 0,
  max: 10,
  value: -1
})).toBe(0);
expect(withinRange({
  min: 0,
  max: 10,
  value: -0.00000001
})).toBe(0);
expect(withinRange({
  min: 0,
  max: 20,
  value: 20
})).toBe(20);
expect(withinRange({
  min: 0,
  max: 19,
  value: 20
})).toBe(19);
expect(withinRange({
  min: 10,
  max: 11,
  value: 10.5
})).toBe(10.5);
expect(withinRange({
  min: 9,
  max: 10,
  value: 10.5
})).toBe(10);
