/** @jest-environment node */

import { renderToString } from "react-dom/server";

import type { Dir } from "../WritingDirection";
import { WritingDirection, useDir } from "../WritingDirection";

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
