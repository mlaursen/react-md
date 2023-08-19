import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render } from "../../test-utils/index.js";

import { VerticalDivider } from "../VerticalDivider.js";

describe("VerticalDivider", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();

    const { getByRole, rerender } = render(<VerticalDivider ref={ref} />);
    const divider = getByRole("separator");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(divider);
    expect(divider).toMatchSnapshot();

    rerender(
      <VerticalDivider
        ref={ref}
        style={{ color: "blue" }}
        className="custom-class-name"
      />
    );
    expect(divider).toMatchSnapshot();

    rerender(<VerticalDivider ref={ref} maxHeight={0.8} />);
    expect(divider).toMatchSnapshot();

    rerender(<VerticalDivider ref={ref} maxHeight={300} />);
    expect(divider).toMatchSnapshot();

    rerender(<VerticalDivider ref={ref} maxHeight={-10} />);
    expect(divider).toMatchSnapshot();
  });
});
