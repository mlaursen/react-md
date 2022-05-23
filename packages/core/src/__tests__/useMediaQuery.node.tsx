/** @jest-environment node */

import { renderToString } from "react-dom/server";

import { useMediaQuery } from "../useMediaQuery";

describe("useMediaQuery", () => {
  it("should return false when thee window does not exist", () => {
    let matches: boolean | undefined;

    function Test(): null {
      matches = useMediaQuery("screen");
      return null;
    }

    renderToString(<Test />);

    expect(matches).toBe(false);
  });
});
