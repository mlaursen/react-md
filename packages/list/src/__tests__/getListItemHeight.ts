import { getListItemHeight } from "../getListItemHeight";

describe("getListItemHeight", () => {
  it('should return "normal" if no addons are provided when the height is omitted or set to "auto"', () => {
    expect(getListItemHeight({})).toBe("normal");
    expect(getListItemHeight({ height: "auto" })).toBe("normal");
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
