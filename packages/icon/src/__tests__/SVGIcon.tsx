import React from "react";
import { render } from "@testing-library/react";

import { SVGIcon } from "../SVGIcon";

describe("SVGIcon", () => {
  it("should default to setting aria-hidden", () => {
    const { getByTestId } = render(<SVGIcon data-testid="icon" />);
    expect(getByTestId("icon").getAttribute("aria-hidden")).toBe("true");
  });

  it("should default to setting focusable false to fix IE bugs of custom focus", () => {
    const { getByTestId } = render(<SVGIcon data-testid="icon" />);
    expect(getByTestId("icon").getAttribute("focusable")).toBe("false");
  });

  it("should render correctly", () => {
    const { container, rerender } = render(
      <SVGIcon>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SVGIcon>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <SVGIcon dense>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SVGIcon>
    );
    expect(container).toMatchSnapshot();
  });

  it("should support the use prop", () => {
    const { container } = render(<SVGIcon use="#some-sprite" />);
    expect(container).toMatchSnapshot();

    expect(container.querySelector("use")).not.toBeNull();
  });
});
