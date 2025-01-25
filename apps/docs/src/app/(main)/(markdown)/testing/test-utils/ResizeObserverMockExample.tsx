import { type ReactElement } from "react";

import TestFrameworkCodeBlock from "../TestFrameworkCodeBlock.jsx";

const BASE_CODE = `
import { afterEach, describe, expect, it, {FRAMEWORK} } from "{IMPORT}";
import {
  cleanupResizeObserverAfterEach,
  render,
  screen,
  setupResizeObserverMock,
} from "@react-md/core/test-utils";
import { ExampleComponent } from "../ExampleComponent.jsx";

cleanupResizeObserverAfterEach(afterEach, {FRAMEWORK}.restoreAllMocks);

describe("ExampleComponent", () => {
  it("should do stuff", () => {
    const observer = setupResizeObserverMock();
    render(<ExampleComponent />);

    const size = screen.getByTestId("size");
    const resizeTarget = screen.getByTestId("resize-target");

    // jsdom sets all element sizes to 0 by default
    expect(size).toHaveTextContent(JSON.stringify({ height: 0, width: 0 }));

    // you can trigger with a custom change
    act(() => {
      observer.resizeElement(resizeTarget, { height: 100, width: 100 });
    });
    expect(size).toHaveTextContent(JSON.stringify({ height: 100, width: 100 }));

    // or you can mock the \`getBoundingClientRect\` result
    jest.spyOn(resizeTarget, "getBoundingClientRect").mockReturnValue({
      ...document.body.getBoundingClientRect(),
      height: 200,
      width: 200,
    });

    act(() => {
      observer.resizeElement(resizeTarget);
    });
    expect(size).toHaveTextContent(JSON.stringify({ height: 200, width: 200 }));
  });
});

`;

export default function ResizeObserverMockExample(): ReactElement {
  return (
    <TestFrameworkCodeBlock
      lang="tsx"
      code={{
        jest: BASE_CODE.replace(/{IMPORT}/g, "@jest/globals").replace(
          /{FRAMEWORK}/g,
          "jest"
        ),
        vitest: BASE_CODE.replace(/{IMPORT}/g, "vitest").replace(
          /{FRAMEWORK}/g,
          "vitest"
        ),
      }}
      fileName="Resize Observer Testing"
    />
  );
}
