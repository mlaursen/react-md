import getListItemHeight from "../getListItemHeight";

describe("getListItemHeight", () => {
  it("should return the height if it is anything other than auto ignoring all the other props", () => {
    expect(
      getListItemHeight({
        height: "normal",
        leftIcon: "Left",
      })
    ).toBe("normal");
    expect(
      getListItemHeight({
        height: "normal",
        rightIcon: "Left",
      })
    ).toBe("normal");

    expect(
      getListItemHeight({
        height: "normal",
        leftAvatar: "Left",
      })
    ).toBe("normal");
    expect(
      getListItemHeight({
        height: "normal",
        rightAvatar: "Left",
      })
    ).toBe("normal");

    expect(
      getListItemHeight({
        height: "normal",
        leftMedia: "Left",
      })
    ).toBe("normal");
    expect(
      getListItemHeight({
        height: "normal",
        rightMedia: "Left",
      })
    ).toBe("normal");

    expect(
      getListItemHeight({
        height: "normal",
        secondaryText: "Secondary Text",
      })
    ).toBe("normal");
  });

  it("should return normal only no other props are provided (also defaults to auto)", () => {
    expect(getListItemHeight({})).toBe("normal");
    expect(getListItemHeight({ height: "auto" })).toBe("normal");
  });

  it("should return medium when only a left or right icon are provided", () => {
    expect(getListItemHeight({ leftIcon: "Left" })).toBe("medium");
    expect(getListItemHeight({ rightIcon: "Right" })).toBe("medium");

    expect(
      getListItemHeight({
        leftIcon: "Left",
        rightIcon: "Right",
      })
    ).toBe("medium");
  });

  it("should return large if there is an avatar or secondary text", () => {
    expect(getListItemHeight({ leftAvatar: "Left" })).toBe("large");
    expect(getListItemHeight({ rightAvatar: "Right" })).toBe("large");
    expect(getListItemHeight({ secondaryText: "Secondary" })).toBe("large");

    expect(
      getListItemHeight({
        leftAvatar: "Left",
        rightAvatar: "Right",
      })
    ).toBe("large");
  });

  it("should return extra-large if there is any sort of media or secondary text with an icon or avatar", () => {
    expect(
      getListItemHeight({
        leftIcon: "Left",
        secondaryText: "Secondary",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        rightIcon: "Right",
        secondaryText: "Secondary",
      })
    ).toBe("extra-large");

    expect(
      getListItemHeight({
        leftAvatar: "Left",
        secondaryText: "Secondary",
      })
    ).toBe("extra-large");
    expect(
      getListItemHeight({
        rightAvatar: "Right",
        secondaryText: "Secondary",
      })
    ).toBe("extra-large");

    expect(getListItemHeight({ leftMedia: "Left" })).toBe("extra-large");
    expect(getListItemHeight({ leftMediaLarge: "Large Left" })).toBe(
      "extra-large"
    );

    expect(getListItemHeight({ rightMedia: "Right" })).toBe("extra-large");
    expect(getListItemHeight({ rightMediaLarge: "Large Left" })).toBe(
      "extra-large"
    );
  });
});
