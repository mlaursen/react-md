import { nearest } from "react-md";

expect(nearest({
  value: 1,
  min: 0,
  max: 1,
  steps: 1
})).toBe(1);
expect(nearest({
  value: 0,
  min: 0,
  max: 100,
  steps: 100
})).toBe(0);

expect(nearest({
  value: 28,
  min: 0,
  max: 100,
  steps: 10
})).toBe(30);
expect(nearest({
  value: 28.7,
  min: 0,
  max: 100,
  steps: 10
})).toBe(30);
expect(nearest({
  value: 28.3,
  min: 0,
  max: 100,
  steps: 100
})).toBe(28);
expect(nearest({
  value: 28.7,
  min: 0,
  max: 100,
  steps: 100
})).toBe(29);

expect(nearest({
  value: 2.75,
  min: 0,
  max: 10,
  steps: 10
})).toBe(3);
expect(nearest({
  value: 5.12,
  min: 5,
  max: 6,
  steps: 10
})).toBe(5.1);
expect(nearest({
  value: 0.06,
  min: 0,
  max: 1,
  steps: 10
})).toBe(0.1);

expect(nearest({
  value: 0.12,
  min: 0,
  max: 1,
  steps: 4
})).toBe(0);
expect(nearest({
  value: 0.13,
  min: 0,
  max: 1,
  steps: 4
})).toBe(0.25);
expect(nearest({
  value: 0.24,
  min: 0,
  max: 1,
  steps: 4
})).toBe(0.25);
expect(nearest({
  value: 0.28,
  min: 0,
  max: 1,
  steps: 4
})).toBe(0.25);
expect(nearest({
  value: 0.33,
  min: 0,
  max: 1,
  steps: 4
})).toBe(0.25);

expect(nearest({
  value: 44.3,
  min: 40,
  max: 100,
  steps: 100,
  range: 100
})).toBe(44);
expect(nearest({
  value: 50,
  min: 20,
  max: 50,
  steps: 50,
  range: 50
})).toBe(50);
expect(nearest({
  value: 22.3,
  min: 20,
  max: 50,
  steps: 50,
  range: 50
})).toBe(22);
expect(nearest({
  value: 12.3,
  min: 20,
  max: 50,
  steps: 50,
  range: 50
})).toBe(20);
expect(nearest({
  value: 0,
  min: 30,
  max: 50,
  steps: 100,
  range: 100
})).toBe(30);

const min = 100;
const max = 10000;
const range = max - min;
const steps = range;
const minValue = 2000;
const maxValue = 8000;
expect(nearest({
  value: 10000,
  min: min,
  max: maxValue,
  steps: steps,
  range: range
})).toBe(maxValue);
expect(nearest({
  value: 0,
  min: minValue,
  max: max,
  steps: steps,
  range: range
})).toBe(minValue);
