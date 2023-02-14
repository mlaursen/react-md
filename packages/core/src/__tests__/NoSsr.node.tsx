/** @jest-environment node */

import { renderToString } from "react-dom/server";

import { NoSsr } from "../NoSsr";
import { SsrProvider } from "../SsrProvider";

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
