import { createElement } from "react";
import getNode from "../getNode";

describe("getNode", () => {
  it("should throw an error if there is no node", () => {
    expect(() => getNode({ current: null })).toThrow(
      new Error("Node not provided. Ref not passed correctly to child")
    );
  });

  it("should throw an error if the current value is not an instance of an HTMLElement", () => {
    // this is for JS users since TS should catch it. have to do this wonderful
    // casting to even test it

    const thing = createElement("span");
    expect(() =>
      getNode({ current: (thing as unknown) as HTMLElement })
    ).toThrow(new Error("Node is not an HTMLElement"));
  });

  it("should return the element", () => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const button = document.createElement("button");

    expect(getNode({ current: div })).toBe(div);
    expect(getNode({ current: span })).toBe(span);
    expect(getNode({ current: button })).toBe(button);
  });
});
