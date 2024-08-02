import { describe, expect, it } from "@jest/globals";
import { objectFit } from "../objectFit.js";

describe("objectFit", () => {
  it("should generate the correct class names", () => {
    expect(objectFit()).toMatchSnapshot();
    expect(objectFit({ fit: "contain" })).toMatchSnapshot();
    expect(objectFit({ fit: "cover" })).toMatchSnapshot();
    expect(objectFit({ fit: "fill" })).toMatchSnapshot();
    expect(objectFit({ fit: "none" })).toMatchSnapshot();
    expect(objectFit({ fit: "scale-down" })).toMatchSnapshot();
  });

  it("should support aspect ratios", () => {
    expect(objectFit({ aspectRatio: "16-9" })).toMatchSnapshot();
    expect(objectFit({ aspectRatio: "4-3" })).toMatchSnapshot();
    expect(objectFit({ aspectRatio: "1-1" })).toMatchSnapshot();

    expect(objectFit({ fit: "cover", aspectRatio: "16-9" })).toMatchSnapshot();
    expect(objectFit({ fit: "cover", aspectRatio: "4-3" })).toMatchSnapshot();
    expect(objectFit({ fit: "cover", aspectRatio: "1-1" })).toMatchSnapshot();
  });
});
