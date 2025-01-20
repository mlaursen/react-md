/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { renderToString } from "react-dom/server";

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
