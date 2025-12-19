import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
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

  it("should support a phoneOnly focusable state when the focusable prop is not true", () => {
    const { rerender } = render(
      <SrOnly data-testid="sr" phoneOnly>
        Phone only text
      </SrOnly>
    );

    const sr = screen.getByTestId("sr");
    expect(sr).toMatchSnapshot();

    rerender(
      <SrOnly data-testid="sr" phoneOnly focusable>
        Phone only text
      </SrOnly>
    );
    expect(sr).toMatchSnapshot();
  });
});
