/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { renderToString } from "react-dom/server";

import { WritingDirection, useDir, type Dir } from "../WritingDirection.js";

describe("WritingDirection", () => {
  it('should default to "ltr" for environments that do not have a document and not crash', () => {
    expect(typeof document).toBe("undefined");
    let dir: Dir | undefined;
    const Child = () => {
      ({ dir } = useDir());
      return null;
    };

    renderToString(
      <WritingDirection>
        <Child />
      </WritingDirection>
    );
    expect(dir).toBe("ltr");
  });
});
