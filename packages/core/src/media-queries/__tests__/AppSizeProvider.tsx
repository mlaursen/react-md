import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  matchAnyDesktop,
  matchLargeDesktop,
  matchPhone,
  matchTablet,
  render,
} from "../../test-utils/index.js";
import { spyOnMatchMedia } from "../../test-utils/vitest/index.js";
import { AppSizeProvider, useAppSize } from "../AppSizeProvider.js";
import { type AppSize } from "../appSize.js";

const matchMedia = spyOnMatchMedia();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AppSizeProvider", () => {
  it("should render without crashing", () => {
    expect(() =>
      render(<AppSizeProvider>Hello</AppSizeProvider>)
    ).not.toThrowError();
  });

  it("should throw an error if multiple AppSizeProviders are mounted", () => {
    const consoleError = vi.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation(() => {});

    expect(() => {
      render(
        <AppSizeProvider>
          <AppSizeProvider>Hello</AppSizeProvider>
        </AppSizeProvider>
      );
    }).toThrowError("The `AppSizeProvider` cannot be mounted multiple times.");
  });
});

describe("useAppSize", () => {
  it("should throw an error when not used as a child of the AppSizeListener", () => {
    function Test(): null {
      useAppSize();
      return null;
    }

    const error = vi.spyOn(console, "error");
    // hide React uncaught error message
    error.mockImplementation(() => {});

    expect(() => render(<Test />)).toThrowError(
      "The `AppSizeProvider` has not been mounted."
    );
  });

  it("should return the app size without the internal root", () => {
    let appSize: Readonly<AppSize> | undefined;
    function Listener(): null {
      appSize = useAppSize();
      return null;
    }

    render(
      <AppSizeProvider>
        <Listener />
      </AppSizeProvider>
    );

    expect(appSize).toEqual({
      isPhone: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      isLandscape: true,
    });

    // pretend the app is resized to a phone
    vi.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
    vi.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);
    matchMedia.changeViewport(matchPhone);

    expect(appSize).toEqual({
      isPhone: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      isLandscape: false,
    });

    matchMedia.changeViewport(matchTablet);
    expect(appSize).toEqual({
      isPhone: false,
      isTablet: true,
      isDesktop: false,
      isLargeDesktop: false,
      isLandscape: false,
    });

    matchMedia.changeViewport(matchLargeDesktop);
    expect(appSize).toEqual({
      isPhone: false,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: true,
      isLandscape: false,
    });

    matchMedia.changeViewport(matchAnyDesktop);
    expect(appSize).toEqual({
      isPhone: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: true,
      isLandscape: false,
    });
  });
});
