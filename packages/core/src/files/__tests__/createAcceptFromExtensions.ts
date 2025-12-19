import { describe, expect, it } from "vitest";

import { createAcceptFromExtensions } from "../createAcceptFromExtensions.js";

describe("createAcceptFromExtensions", () => {
  it("should return an empty string if there are no extensions", () => {
    expect(createAcceptFromExtensions([])).toBe("");
  });

  it("should return the single extension for a list of one", () => {
    expect(createAcceptFromExtensions(["svg"])).toBe(".svg");
  });

  it("should return a comma-delimited list with the extensions", () => {
    expect(
      createAcceptFromExtensions([
        "svg",
        "jpeg",
        "jpg",
        "png",
        "apng",
        "mkv",
        "mp4",
        "mpeg",
        "mpg",
        "webm",
        "mov",
      ])
    ).toBe(".svg,.jpeg,.jpg,.png,.apng,.mkv,.mp4,.mpeg,.mpg,.webm,.mov");
  });
});
