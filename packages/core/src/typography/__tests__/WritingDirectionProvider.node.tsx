/** @vitest-environment node */
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  type Dir,
  WritingDirectionProvider,
  useDir,
} from "../WritingDirectionProvider.js";

describe("WritingDirectionProvider", () => {
  it('should default to "ltr" for environments that do not have a document and not crash', () => {
    expect(typeof document).toBe("undefined");
    let dir: Dir | undefined;
    const Child = () => {
      ({ dir } = useDir());
      return null;
    };

    renderToString(
      <WritingDirectionProvider>
        <Child />
      </WritingDirectionProvider>
    );
    expect(dir).toBe("ltr");
  });
});
