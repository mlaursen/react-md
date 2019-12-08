import React from "react";
import { render } from "@testing-library/react";

import Collapse from "../Collapse";

describe("Collapse", () => {
  describe("rendering", () => {
    it("should render as null when collapsed by default", () => {
      const children = jest.fn();
      const { container } = render(<Collapse collapsed>{children}</Collapse>);
      expect(container.firstChild).toBe(null);
    });

    it("should not call the children callback function when it is rendered as null", () => {
      const children = jest.fn();
      render(<Collapse collapsed>{children}</Collapse>);

      expect(children).not.toBeCalled();
    });

    it("should not render as null if any of minHeight, minPaddingTop, or minPaddingBottom are greater than 0", () => {
      const { container } = render(
        <Collapse
          collapsed
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
          {() => <div />}
        </Collapse>
      );

      expect(container).toMatchSnapshot();
    });

    it("should use the value of the isEmptyCollapsed prop over the values of minHeight, minPaddingTop, minPaddingBottom if it is defined", () => {
      const { container, rerender } = render(
        <Collapse
          collapsed
          isEmptyCollapsed
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
          {() => <div />}
        </Collapse>
      );

      expect(container.firstChild).toBe(null);

      rerender(
        <Collapse
          collapsed
          isEmptyCollapsed={false}
          minHeight={0}
          minPaddingTop={0}
          minPaddingBottom={0}
        >
          {() => <div />}
        </Collapse>
      );
      expect(container.firstChild).not.toBe(null);
    });
  });
});
