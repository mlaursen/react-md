import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render } from "../../test-utils/index.js";
import { SrOnly } from "../SrOnly.js";

describe("SrOnly", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container, rerender } = render(
      <SrOnly ref={ref}>Some content</SrOnly>
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(
      <SrOnly ref={ref} style={{ opacity: 0.3 }} className="custom-class-name">
        Some content
      </SrOnly>
    );
    expect(container).toMatchSnapshot();

    rerender(<SrOnly focusable>Some content</SrOnly>);
    expect(container).toMatchSnapshot();

    rerender(
      <SrOnly focusable tabIndex={-1}>
        Some content
      </SrOnly>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <SrOnly as="h4" ref={ref}>
        Some content
      </SrOnly>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(container).toMatchSnapshot();
  });
});
