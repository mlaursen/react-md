/** @vitest-environment node */
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { useOrientation } from "../useOrientation.js";

describe("useOrientation", () => {
  it('should default to "landscape-primary" when the window does not exist', () => {
    let orientation: OrientationType | undefined;

    function Test(): null {
      orientation = useOrientation();
      return null;
    }

    renderToString(<Test />);

    expect(orientation).toBe("landscape-primary");
  });
});
