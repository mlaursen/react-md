import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { rmdRender, screen } from "../../test-utils/index.js";
import { LayoutNav, type LayoutNavProps } from "../LayoutNav.js";
import { layoutNav } from "../layoutNavStyles.js";

describe("LayoutNav", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ref,
      children: "Content",
      expanded: true,
    } as const;

    const { rerender } = rmdRender(<LayoutNav {...props} />);

    const nav = screen.getByRole("navigation", { name: "Navigation" });
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(nav);
    expect(nav).toMatchSnapshot();

    rerender(
      <LayoutNav
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(nav).toMatchSnapshot();

    rerender(<LayoutNav {...props} as="div" data-testid="div" />);
    expect(nav).not.toBeInTheDocument();
    const div = screen.getByTestId("div");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(div);
    expect(div).toMatchSnapshot();
  });

  it("should apply an aria label while rendered as a nav", () => {
    const props: LayoutNavProps = {
      expanded: true,
      children: "Content",
    };
    const { rerender } = rmdRender(<LayoutNav {...props} />);

    const nav = screen.getByRole("navigation", { name: "Navigation" });
    expect(nav).toBeInTheDocument();

    rerender(<LayoutNav {...props} aria-label="Custom" />);
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Custom");

    rerender(<LayoutNav {...props} aria-labelledby="another-id" />);
    expect(nav).toBeInTheDocument();
    expect(nav).not.toHaveAttribute("aria-label");

    const divProps = {
      ...props,
      as: "div" as const,
      "data-testid": "div",
    };
    rerender(<LayoutNav {...divProps} />);

    expect(nav).not.toBeInTheDocument();
    const div = screen.getByTestId("div");
    expect(div).not.toHaveAttribute("aria-label");

    rerender(<LayoutNav {...divProps} aria-label="My Label" />);
    expect(div).toHaveAttribute("aria-label", "My Label");
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(layoutNav()).toMatchSnapshot();
    });
  });
});
