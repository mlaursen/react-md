import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import type { AppSize } from "../AppSizeProvider";
import {
  AppSizeProvider,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  useAppSize,
} from "../AppSizeProvider";

const onchange = jest.fn();
const addListener = jest.fn();
const addEventListener = jest.fn();
const removeListener = jest.fn();
const removeEventListener = jest.fn();
const dispatchEvent = jest.fn();

const baseQueryList: Omit<MediaQueryList, "matches"> = {
  media: "",
  onchange,
  addListener,
  addEventListener,
  removeEventListener,
  removeListener,
  dispatchEvent,
};

const matchMedia = jest.spyOn(window, "matchMedia");
matchMedia.mockImplementation((query) => ({
  matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
  ...baseQueryList,
}));

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
    consoleError.mockImplementation();

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

    const error = jest.spyOn(console, "error");
    // hide React uncaught error message
    error.mockImplementation();

    expect(() => render(<Test />)).toThrowError(
      "The `AppSizeProvider` has not been mounted."
    );
  });

  it("should return the app size without the internal root", () => {
    type MediaQueryCallback = (event: MediaQueryListEvent) => void;
    const callbacks: { query: string; callback: MediaQueryCallback }[] = [];
    matchMedia.mockImplementation((query) => ({
      addEventListener: jest.fn((_type, listener) => {
        callbacks.push({ query, callback: listener as MediaQueryCallback });
      }),
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
      addListener: jest.fn(),
      onchange: jest.fn(),
      dispatchEvent: jest.fn(),
      media: "",
      matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
    }));

    let appSize: Readonly<AppSize> | undefined = undefined;
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
    act(() => {
      jest.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
      jest.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);
      window.dispatchEvent(new Event("resize"));

      callbacks.forEach(({ query, callback }) =>
        callback({
          ...baseQueryList,
          matches: query.includes(`${DEFAULT_PHONE_MAX_WIDTH}`),
        } as unknown as MediaQueryListEvent)
      );
    });

    expect(appSize).toEqual({
      isPhone: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      isLandscape: false,
    });
  });
});
