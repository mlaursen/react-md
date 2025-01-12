import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";

import { Link } from "../Link.js";

describe("Link", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    const props = {
      ref,
      href: "/some-url",
      children: "Content",
    } as const;

    const { rerender } = render(<Link {...props} />);
    const link = screen.getByRole("link", { name: "Content" });
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toBe(link);
    expect(link).toMatchSnapshot();

    rerender(
      <Link
        {...props}
        style={{ color: "blue" }}
        className="custom-class-name"
      />
    );
    expect(link).toMatchSnapshot();
  });
});
