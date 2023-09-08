import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  matchAnyDesktop,
  matchLargeDesktop,
  matchPhone,
  matchTablet,
  render,
  spyOnMatchMedia,
} from "../../test-utils/index.js";

import type { AppSize } from "../appSize.js";
import { AppSizeProvider, useAppSize } from "../AppSizeProvider.js";

const matchMedia = spyOnMatchMedia();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AppSizeProvider", () => {
  it("should render without crashing", () => {
    expect(() =>
      render(<AppSizeProvider>Hello</AppSizeProvider>)
    ).not.toThrow();
  });

  it("should throw an error if multiple AppSizeProviders are mounted", () => {
    const consoleError = jest.spyOn(console, "error");
    // hide React uncaught error message
    consoleError.mockImplementation(() => {});

    expect(() => {
      render(
        <AppSizeProvider>
          <AppSizeProvider>Hello</AppSizeProvider>
        </AppSizeProvider>
      );
    }).toThrow("The `AppSizeProvider` cannot be mounted multiple times.");
  });
});

describe("useAppSize", () => {
  it("should throw an error when not used as a child of the AppSizeListener", () => {
    function Test(): null {
      useAppSize();
      return null;
    }

    const error = jest.spyOn(console, "error");
    // hide React uncaught error message
    error.mockImplementation(() => {});

    expect(() => render(<Test />)).toThrow(
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
    jest.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
    jest.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);
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
