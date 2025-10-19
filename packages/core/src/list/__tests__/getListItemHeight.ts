import { describe, expect, it } from "vitest";

import { getListItemHeight } from "../getListItemHeight.js";

describe("getListItemHeight", () => {
  it('should return "normal" if no addons are provided when the height is omitted', () => {
    expect(getListItemHeight({})).toBe("normal");
  });

  it("should return the height if it was provided", () => {
    expect(getListItemHeight({ height: "auto" })).toBe("auto");
    expect(getListItemHeight({ height: "normal" })).toBe("normal");
    expect(getListItemHeight({ height: "normal", leftAddon: "Addon" })).toBe(
      "normal"
    );
    expect(
      getListItemHeight({
        height: "normal",
        leftAddon: "Addon",
        rightAddon: "Addon",
        rightAddonType: "large-media",
      })
    ).toBe("normal");

    expect(getListItemHeight({ height: "medium" })).toBe("medium");
    expect(
      getListItemHeight({
        height: "medium",
        leftAddon: "Addon",
        leftAddonType: "media",
      })
    ).toBe("medium");

    expect(getListItemHeight({ height: "large" })).toBe("large");
    expect(
      getListItemHeight({
        height: "large",
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("large");

    expect(getListItemHeight({ height: "extra-large" })).toBe("extra-large");
  });

  it('should return "extra-large" if there is a media addon provided or secondary text', () => {
    expect(
      getListItemHeight({
        leftAddon: "Addon",
        leftAddonType: "media",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        leftAddon: "Addon",
        leftAddonType: "large-media",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        rightAddon: "Addon",
        rightAddonType: "media",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        rightAddon: "Addon",
        rightAddonType: "large-media",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        leftAddon: "Addon",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        rightAddon: "Addon",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        leftAddon: "Addon",
        leftAddonType: "icon",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        rightAddon: "Addon",
        rightAddonType: "icon",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        leftAddon: "Addon",
        leftAddonType: "avatar",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("extra-large");
  });

  it('should return "large" if there is an avatar', () => {
    expect(
      getListItemHeight({
        leftAddon: "Addon",
        leftAddonType: "avatar",
      })
    ).toBe("large");
    expect(
      getListItemHeight({
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("large");
  });

  it('should return "medium" if there is an icon', () => {
    expect(getListItemHeight({ leftAddon: "Addon" })).toBe("medium");
    expect(getListItemHeight({ rightAddon: "Addon" })).toBe("medium");

    expect(
      getListItemHeight({
        leftAddon: "Addon",
        leftAddonType: "icon",
      })
    ).toBe("medium");
    expect(
      getListItemHeight({
        rightAddon: "Addon",
        rightAddonType: "icon",
      })
    ).toBe("medium");
  });

  it("should always choose the largest addon type that actually has an addon provided", () => {
    expect(
      getListItemHeight({
        leftAddonType: "large-media",
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("large");

    expect(
      getListItemHeight({
        leftAddon: "Addon",
        leftAddonType: "large-media",
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        secondaryText: "Secondary Text",
        leftAddonType: "large-media",
        rightAddon: "Addon",
        rightAddonType: "avatar",
      })
    ).toBe("extra-large");
  });
});
