import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";

import { Badge } from "../Badge.js";

describe("Badge", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: 3,
    } as const;
    const { rerender } = render(<Badge {...props} />);

    const badge = screen.getByText("3");
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(badge);
    expect(badge).toMatchSnapshot();

    rerender(
      <Badge
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(badge).toMatchSnapshot();

    rerender(<Badge {...props} theme="primary" />);
    expect(badge).toMatchSnapshot();

    rerender(<Badge {...props} theme="secondary" />);
    expect(badge).toMatchSnapshot();

    rerender(<Badge {...props} theme="greyscale" />);
    expect(badge).toMatchSnapshot();

    rerender(<Badge {...props} theme="clear" />);
    expect(badge).toMatchSnapshot();
  });
});
