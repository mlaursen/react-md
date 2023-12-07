/** @jest-environment node */

import { describe, expect, it } from "@jest/globals";
import { type MutableRefObject } from "react";
import { renderToString } from "react-dom/server";
import { type ElementSize } from "../types.js";
import { useWindowSize } from "../useWindowSize.js";

describe("useWindowSize", () => {
  it("should default to 0 in ssr", () => {
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
      height: 0,
      width: 0,
    });
  });

  it("should allow for custom ssr default values", () => {
    const ssrHeight = 1080;
    const ssrWidth = 1920;
    const sizeRef: MutableRefObject<ElementSize | null> = {
      current: null,
    };
    function Test(): null {
      const { height, width } = useWindowSize({
        ssrHeight,
        ssrWidth,
      });
      sizeRef.current = {
        height,
        width,
      };

      return null;
    }

    expect(renderToString(<Test />)).toBe("");
    expect(sizeRef.current).toEqual({
      height: ssrHeight,
      width: ssrWidth,
    });
  });
});
