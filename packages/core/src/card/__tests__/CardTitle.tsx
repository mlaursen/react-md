import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { CardTitle } from "../CardTitle.js";

describe("CardTitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const props = {
      ref,
      children: "Title",
    } as const;
    const { rerender } = render(<CardTitle {...props} />);

    const subtitle = screen.getByRole("heading", { name: "Title" });
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(subtitle);
    expect(subtitle).toMatchSnapshot();

    rerender(
      <CardTitle
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(subtitle).toMatchSnapshot();
  });
});
