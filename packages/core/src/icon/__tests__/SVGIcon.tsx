import { describe, expect, it } from "@jest/globals";

import { render, screen } from "../../test-utils/index.js";
import { SVGIcon } from "../SVGIcon.js";

describe("SVGIcon", () => {
  it("should default to setting aria-hidden", () => {
    render(<SVGIcon data-testid="icon" />);
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("should default to setting focusable false to fix IE bugs of custom focus", () => {
    render(<SVGIcon data-testid="icon" />);
    expect(screen.getByTestId("icon")).toHaveAttribute("focusable", "false");
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

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector("use")).not.toBeNull();
  });
});
