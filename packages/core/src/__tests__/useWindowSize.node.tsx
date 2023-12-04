/** @jest-environment node */

import { describe, expect, it } from "@jest/globals";
import { type MutableRefObject } from "react";
import { renderToString } from "react-dom/server";
import { type ElementSize } from "../types.js";
import { useWindowSize } from "../useWindowSize.js";

describe("useWindowSize", () => {
  it("should default to Infinity in ssr", () => {
    const sizeRef: MutableRefObject<ElementSize | null> = {
      current: null,
    };
    function Test(): null {
      const { height, width } = useWindowSize();
      sizeRef.current = {
        height,
        width,
      };

      return null;
    }

    expect(renderToString(<Test />)).toBe("");
    expect(sizeRef.current).toEqual({
      height: Infinity,
      width: Infinity,
    });
  });
});
