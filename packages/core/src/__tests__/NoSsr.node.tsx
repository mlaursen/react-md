/** @vitest-environment node */
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NoSsr } from "../NoSsr.js";
import { SsrProvider } from "../SsrProvider.js";

describe("NoSsr", () => {
  it("should not render anything initially in ssr mode", () => {
    expect(
      renderToString(
        <SsrProvider ssr>
          <NoSsr>Hidden Content</NoSsr>
        </SsrProvider>
      )
    ).toBe("");
    expect(
      renderToString(
        <SsrProvider>
          <NoSsr>Hidden Content</NoSsr>
        </SsrProvider>
      )
    ).toBe("Hidden Content");
  });
});
