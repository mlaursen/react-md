import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import { List, type ListElement, type ListProps } from "../List.js";

describe("List", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<ListElement>();
    const { rerender } = render(<List ref={ref} />);

    const unorderedList = screen.getByRole("none");
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toBe(unorderedList);
    expect(unorderedList).toMatchSnapshot();

    const props: PropsWithRef<ListProps> = {
      ref,
      style: {
        maxWidth: 30,
      },
      className: "custom-class-name",
    };
    rerender(<List {...props} />);
    expect(unorderedList).toMatchSnapshot();

    rerender(<List {...props} dense horizontal />);
    expect(unorderedList).toBeInTheDocument();
    expect(unorderedList).toHaveClass("custom-class-name");
    expect(unorderedList).toMatchSnapshot();

    rerender(<List ref={ref} ordered />);
    expect(unorderedList).not.toBeInTheDocument();

    const orderedList = screen.getByRole("none");
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
    expect(ref.current).toBe(orderedList);
    expect(orderedList).toMatchSnapshot();

    rerender(<List {...props} dense horizontal ordered />);
    expect(orderedList).toBeInTheDocument();
    expect(orderedList).toMatchSnapshot();
  });

  it("should allow the role to be overridden", () => {
    render(<List role="menu" />);

    expect(() => screen.getByRole("none")).toThrow();
    expect(() => screen.getByRole("menu")).not.toThrow();
  });
});
