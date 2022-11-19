import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { DEFAULT_DESKTOP_MIN_WIDTH } from "../AppSizeProvider";
import { useMediaQuery } from "../useMediaQuery";

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

const matchMedia = jest
  .spyOn(window, "matchMedia")
  .mockImplementation((query) => ({
    matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
    ...baseQueryList,
  }));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useMediaQuery", () => {
  it("should return false if the query is disabled", () => {
    let matches: boolean | undefined;
    function Test(): null {
      matches = useMediaQuery("screen", true);
      return null;
    }

    render(<Test />);

    expect(matchMedia).not.toHaveBeenCalled();
    expect(matches).toBe(false);
  });

  it("should check if the query matches on mount", () => {
    let matches: boolean | undefined;
    function Test(): null {
      matches = useMediaQuery(`${DEFAULT_DESKTOP_MIN_WIDTH}`);
      return null;
    }

    render(<Test />);

    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(matches).toBe(true);
  });

  it("should update when the change event is fired", () => {
    type MediaQueryCallback = (event: MediaQueryListEvent) => void;
    const callbacks: MediaQueryCallback[] = [];
    matchMedia.mockImplementation((query) => ({
      addEventListener: jest.fn((_type, listener) => {
        callbacks.push(listener as MediaQueryCallback);
      }),
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
      addListener: jest.fn(),
      onchange: jest.fn(),
      dispatchEvent: jest.fn(),
      media: "",
      matches: query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`),
    }));

    let matches: boolean | undefined;
    function Test(): null {
      matches = useMediaQuery(`${DEFAULT_DESKTOP_MIN_WIDTH}`);
      return null;
    }

    render(<Test />);

    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(matches).toBe(true);

    act(() => {
      jest.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
      jest.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);
      window.dispatchEvent(new Event("resize"));

      callbacks.forEach((callback) =>
        callback({
          ...baseQueryList,
          matches: false,
        } as unknown as MediaQueryListEvent)
      );
    });

    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(matches).toBe(false);
  });
});
