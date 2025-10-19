import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Radio } from "../Radio.js";

describe("Radio", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Radio",
      value: "a",
    } as const;

    const { container, rerender } = render(<Radio {...props} />);

    const radio = screen.getByRole("radio", { name: "Radio" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(radio);
    expect(container).toMatchSnapshot();

    rerender(
      <Radio
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} id="custom-id" />);
    expect(container).toMatchSnapshot();
  });
});
