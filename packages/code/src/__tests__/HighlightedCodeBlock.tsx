import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@react-md/core/test-utils";

import { HighlightedCodeBlock } from "../HighlightedCodeBlock.js";
import { highlightCode } from "../prismjs/highlight.js";

describe("HighlightedCodeBlock", () => {
  it("should auto highlight children", () => {
    render(
      <HighlightedCodeBlock
        containerProps={{ "data-testid": "container" }}
        language="ts"
        highlightCode={highlightCode}
      >
        const x = 3;
      </HighlightedCodeBlock>
    );

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });
});
