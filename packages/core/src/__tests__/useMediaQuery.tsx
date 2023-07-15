import { matchPhone, render, spyOnMatchMedia } from "../test-utils";

import { DEFAULT_DESKTOP_MIN_WIDTH } from "../AppSizeProvider";
import { useMediaQuery } from "../useMediaQuery";

const matchMedia = spyOnMatchMedia();

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
    let matches: boolean | undefined;
    function Test(): null {
      matches = useMediaQuery(`${DEFAULT_DESKTOP_MIN_WIDTH}`);
      return null;
    }

    render(<Test />);

    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(matches).toBe(true);

    jest.spyOn(window.screen, "availHeight", "get").mockReturnValue(760);
    jest.spyOn(window.screen, "availWidth", "get").mockReturnValue(360);
    matchMedia.changeViewport(matchPhone);

    expect(matchMedia).toHaveBeenCalledTimes(2);
    expect(matches).toBe(false);
  });
});
