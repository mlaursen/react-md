import { describe, expect, it } from "@jest/globals";
import { type FC, type PropsWithChildren } from "react";

import { render } from "../../test-utils/index.js";
import { useHigherContrastChildren } from "../useHigherContrastChildren.js";

const Test: FC<PropsWithChildren<{ disable?: boolean }>> = ({
  children,
  disable,
}) => {
  const updated = useHigherContrastChildren(children, disable);

  return <>{updated}</>;
};

describe("useHigherContrastChildren", () => {
  it("should wrap string and number DIRECT children in spans to enable higher contrast", () => {
    const { container, rerender } = render(<Test>String</Test>);

    expect(container.firstElementChild).toBeInstanceOf(HTMLSpanElement);
    expect(container).toMatchSnapshot();

    rerender(<Test disable>String</Test>);
    expect(container.firstElementChild).toBeNull();
    expect(container).toMatchSnapshot();

    rerender(<Test>0</Test>);
    expect(container.firstElementChild).toBeInstanceOf(HTMLSpanElement);
    expect(container).toMatchSnapshot();

    rerender(<Test disable>0</Test>);
    expect(container.firstElementChild).toBeNull();
    expect(container).toMatchSnapshot();

    rerender(
      <Test>
        <p>Text</p>
      </Test>
    );
    expect(container.firstElementChild).toBeInstanceOf(HTMLParagraphElement);
    expect(container).toMatchSnapshot();

    rerender(
      <Test disable>
        <p>Text</p>
      </Test>
    );
    expect(container.firstElementChild).toBeInstanceOf(HTMLParagraphElement);
    expect(container).toMatchSnapshot();
  });

  it("should wrap a list of children correctly", () => {
    const { container, rerender } = render(
      <Test>
        {"String 1"}
        {"String 2"}
        {"String 3"}
      </Test>
    );

    expect(container.childElementCount).toBe(3);
    expect(container.children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(container.children[1]).toBeInstanceOf(HTMLSpanElement);
    expect(container.children[2]).toBeInstanceOf(HTMLSpanElement);
    expect(container).toMatchSnapshot();

    rerender(
      <Test>
        {"String 1"}
        <p>Text</p>
        {"String 3"}
      </Test>
    );
    expect(container.childElementCount).toBe(3);
    expect(container.children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(container.children[1]).toBeInstanceOf(HTMLParagraphElement);
    expect(container.children[2]).toBeInstanceOf(HTMLSpanElement);
    expect(container).toMatchSnapshot();
  });

  // A user should normally not provide a fragment to any of the react-md
  // components since you'd normally define the children inline:
  //
  // <Button>Content</Button>
  // vs
  // <Button><>Content</></Button>
  it("should not wrap fragments since I don't care for my use cases", () => {
    const { container } = render(
      <Test>
        <>String</>
      </Test>
    );

    expect(container.firstElementChild).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
