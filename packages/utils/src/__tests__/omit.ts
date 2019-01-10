import { omit } from "../omit";

describe("omit", () => {
  it("should return the object unmodified if there are no keys", () => {
    const o = {};
    const o2 = { hello: "world" };

    expect(omit(o, [])).toBe(o);
    expect(omit(o2, [])).toBe(o2);
  });

  it("should return a new object with the provided keys omitted", () => {
    const obj1 = { hello: "world" };
    const obj2 = { hello: "world", another: "thing" };

    expect(omit(obj1, ["another"])).toEqual(obj1);
    expect(omit(obj2, ["another"])).toEqual(obj1);
  });
});
