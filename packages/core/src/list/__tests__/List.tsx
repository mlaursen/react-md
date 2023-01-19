import { render } from "@testing-library/react";
import { createRef } from "react";
import type { PropsWithRef } from "../../types";
import type { ListElement, ListProps } from "../List";
import { list, List } from "../List";

describe("List", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<ListElement>();
    const { getByRole, rerender } = render(<List ref={ref} />);

    const unorderedList = getByRole("none");
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toBe(unorderedList);
    expect(unorderedList).toMatchSnapshot();

    const props: PropsWithRef<ListProps, ListElement> = {
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

    const orderedList = getByRole("none");
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
    expect(ref.current).toBe(orderedList);
    expect(orderedList).toMatchSnapshot();

    rerender(<List {...props} dense horizontal ordered />);
    expect(orderedList).toBeInTheDocument();
    expect(orderedList).toMatchSnapshot();
  });

  it("should allow the role to be overridden", () => {
    const { getByRole } = render(<List role="menu" />);

    expect(() => getByRole("none")).toThrow();
    expect(() => getByRole("menu")).not.toThrow();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(list()).toMatchSnapshot();
    });
  });
});
