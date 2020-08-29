/**
 * @jest-environment node
 */

import React from "react";
import { renderToString } from "react-dom/server";

import { Dir, useDir, WritingDirection } from "../Dir";

describe("Dir", () => {
  it('should default to "ltr" for environments that do not have a document and not crash', () => {
    expect(typeof document).toBe("undefined");
    let dir: WritingDirection | undefined;
    const Child = () => {
      ({ dir } = useDir());
      return null;
    };

    renderToString(
      <Dir>
        <Child />
      </Dir>
    );
    expect(dir).toBe("ltr");
  });
});
