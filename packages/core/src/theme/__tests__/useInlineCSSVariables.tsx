import { describe, expect, it } from "@jest/globals";
import { type CSSProperties, type ReactElement } from "react";

import { render } from "../../test-utils/index.js";
import { useInlineCSSVariables } from "../useInlineCSSVariables.js";

declare module "react" {
  interface CSSProperties {
    "--test-defined"?: string | number;
  }
}

describe("useInlineCSSVariables", () => {
  it("should return a style object with the provided values", () => {
    let style: CSSProperties | undefined;
    function Test(): ReactElement {
      style = useInlineCSSVariables([{ name: "--test", value: "3rem" }]);

      // this one should work without issue since it was added at the top of the test
      const _style2 = useInlineCSSVariables([
        { name: "--test-defined", value: "1" },
      ]);
      return <div style={style} />;
    }

    const html = document.documentElement;
    expect(html.style.getPropertyValue("--test")).toBe("");

    const { unmount } = render(<Test />);
    expect(html.style.getPropertyValue("--test")).toBe("");
    expect(style).toEqual({ "--test": "3rem" });

    unmount();
    expect(html.style.getPropertyValue("--test")).toBe("");
  });
});
