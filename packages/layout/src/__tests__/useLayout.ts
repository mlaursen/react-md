import { LayoutConfiguration } from "../types";
import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
  getLayout,
  isFullHeightLayout,
  isInlineLayout,
  isPersistentLayout,
  isTemporaryLayout,
  isToggleableLayout,
} from "../useLayout";

const VERTICAL_PHONE = {
  isPhone: true,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false,
  isLandscape: false,
};

const HORIZONTAL_PHONE = {
  isPhone: true,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false,
  isLandscape: true,
};

const VERTICAL_TABLET = {
  isPhone: false,
  isTablet: true,
  isDesktop: false,
  isLargeDesktop: false,
  isLandscape: false,
};

const HORIZONTAL_TABLET = {
  isPhone: false,
  isTablet: true,
  isDesktop: false,
  isLargeDesktop: false,
  isLandscape: true,
};

const VERTICAL_DESKTOP = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  isLandscape: false,
};

const HORIZONTAL_DESKTOP = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  isLandscape: true,
};

const VERTICAL_LARGE_DESKTOP = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: true,
  isLandscape: false,
};

const HORIZONTAL_LARGE_DESKTOP = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: true,
  isLandscape: true,
};

describe("getLayout", () => {
  it("should return the correct layout type based on the app size and the default values for each layout type", () => {
    expect(getLayout({ appSize: VERTICAL_PHONE })).toBe(DEFAULT_PHONE_LAYOUT);
    expect(getLayout({ appSize: HORIZONTAL_PHONE })).toBe(DEFAULT_PHONE_LAYOUT);

    expect(getLayout({ appSize: VERTICAL_TABLET })).toBe(DEFAULT_TABLET_LAYOUT);
    expect(getLayout({ appSize: HORIZONTAL_TABLET })).toBe(
      DEFAULT_LANDSCAPE_TABLET_LAYOUT
    );

    expect(getLayout({ appSize: VERTICAL_DESKTOP })).toBe(
      DEFAULT_DESKTOP_LAYOUT
    );
    expect(getLayout({ appSize: HORIZONTAL_DESKTOP })).toBe(
      DEFAULT_DESKTOP_LAYOUT
    );

    expect(getLayout({ appSize: VERTICAL_LARGE_DESKTOP })).toBe(
      DEFAULT_DESKTOP_LAYOUT
    );
    expect(getLayout({ appSize: HORIZONTAL_LARGE_DESKTOP })).toBe(
      DEFAULT_DESKTOP_LAYOUT
    );
  });

  it("should allow for custom layouts", () => {
    const customLayout: LayoutConfiguration = {
      phoneLayout: "temporary-mini",
      tabletLayout: "toggleable-mini",
      landscapeTabletLayout: "full-height",
      desktopLayout: "clipped",
      largeDesktopLayout: "floating",
    };
    expect(getLayout({ ...customLayout, appSize: VERTICAL_PHONE })).toBe(
      "temporary-mini"
    );
    expect(getLayout({ ...customLayout, appSize: HORIZONTAL_PHONE })).toBe(
      "temporary-mini"
    );

    expect(getLayout({ ...customLayout, appSize: VERTICAL_TABLET })).toBe(
      "toggleable-mini"
    );
    expect(getLayout({ ...customLayout, appSize: HORIZONTAL_TABLET })).toBe(
      "full-height"
    );

    expect(
      getLayout({ ...customLayout, appSize: VERTICAL_LARGE_DESKTOP })
    ).toBe("floating");
    expect(
      getLayout({ ...customLayout, appSize: HORIZONTAL_LARGE_DESKTOP })
    ).toBe("floating");
  });

  it("should default the largeDesktopLayout to the desktop layout", () => {
    expect(
      getLayout({ appSize: VERTICAL_LARGE_DESKTOP, desktopLayout: "clipped" })
    ).toBe("clipped");
    expect(
      getLayout({ appSize: HORIZONTAL_LARGE_DESKTOP, desktopLayout: "clipped" })
    ).toBe("clipped");

    expect(
      getLayout({
        appSize: VERTICAL_LARGE_DESKTOP,
        desktopLayout: "clipped",
        largeDesktopLayout: "full-height",
      })
    ).toBe("full-height");
    expect(
      getLayout({
        appSize: HORIZONTAL_LARGE_DESKTOP,
        desktopLayout: "clipped",
        largeDesktopLayout: "full-height",
      })
    ).toBe("full-height");
  });
});

describe("isTemporaryLayout", () => {
  it("should return true for the temporary layout types", () => {
    expect(isTemporaryLayout("temporary")).toBe(true);
    expect(isTemporaryLayout("temporary-mini")).toBe(true);
    expect(isTemporaryLayout("toggleable")).toBe(false);
    expect(isTemporaryLayout("toggleable-mini")).toBe(false);
    expect(isTemporaryLayout("full-height")).toBe(false);
    expect(isTemporaryLayout("clipped")).toBe(false);
    expect(isTemporaryLayout("floating")).toBe(false);
  });
});

describe("isToggleableLayout", () => {
  it("should return true for the toggleable layout types", () => {
    expect(isToggleableLayout("temporary")).toBe(false);
    expect(isToggleableLayout("temporary-mini")).toBe(false);
    expect(isToggleableLayout("toggleable")).toBe(true);
    expect(isToggleableLayout("toggleable-mini")).toBe(true);
    expect(isToggleableLayout("full-height")).toBe(false);
    expect(isToggleableLayout("clipped")).toBe(false);
    expect(isToggleableLayout("floating")).toBe(false);
  });
});

describe("isPersistentLayout", () => {
  it("should return true for the persistent layout types", () => {
    expect(isPersistentLayout("temporary")).toBe(false);
    expect(isPersistentLayout("temporary-mini")).toBe(false);
    expect(isPersistentLayout("toggleable")).toBe(false);
    expect(isPersistentLayout("toggleable-mini")).toBe(false);
    expect(isPersistentLayout("full-height")).toBe(true);
    expect(isPersistentLayout("clipped")).toBe(true);
    expect(isPersistentLayout("floating")).toBe(true);
  });
});

describe("isInlineLayout", () => {
  it("should return true for the inline layout types", () => {
    expect(isInlineLayout("temporary")).toBe(false);
    expect(isInlineLayout("temporary-mini")).toBe(false);
    expect(isInlineLayout("toggleable")).toBe(true);
    expect(isInlineLayout("toggleable-mini")).toBe(true);
    expect(isInlineLayout("full-height")).toBe(true);
    expect(isInlineLayout("clipped")).toBe(true);
    expect(isInlineLayout("floating")).toBe(true);
  });
});

describe("isFullHeightLayout", () => {
  // I don't remember why this is a thing
  it("should return true for the full-height layout type", () => {
    expect(isFullHeightLayout("temporary")).toBe(false);
    expect(isFullHeightLayout("temporary-mini")).toBe(false);
    expect(isFullHeightLayout("toggleable")).toBe(false);
    expect(isFullHeightLayout("toggleable-mini")).toBe(false);
    expect(isFullHeightLayout("full-height")).toBe(true);
    expect(isFullHeightLayout("clipped")).toBe(false);
    expect(isFullHeightLayout("floating")).toBe(false);
  });
});
