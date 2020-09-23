import React from "react";
import { render } from "@testing-library/react";

import { Collapse } from "../Collapse";

describe("Collapse", () => {
  describe("rendering", () => {
    it("should render as null when collapsed by default", () => {
      const { container } = render(
        <Collapse collapsed>
          <div />
        </Collapse>
      );
      expect(container.firstChild).toBe(null);
    });

    it("should not render as null if any of minHeight, minPaddingTop, or minPaddingBottom are greater than 0", () => {
      const { container } = render(
        <Collapse
          collapsed
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
          <div />
        </Collapse>
      );

      expect(container).toMatchSnapshot();
    });

    it("should use the value of the temporary prop over the values of minHeight, minPaddingTop, minPaddingBottom if it is defined", () => {
      const { container, rerender } = render(
        <Collapse
          key="true"
          collapsed
          temporary
          minHeight={1}
          minPaddingTop={1}
          minPaddingBottom={1}
        >
          <div />
        </Collapse>
      );

      expect(container.firstChild).toBe(null);

      rerender(
        <Collapse
          key="false"
          collapsed
          temporary={false}
          minHeight={0}
          minPaddingTop={0}
          minPaddingBottom={0}
        >
          <div />
        </Collapse>
      );

      expect(container.firstChild).not.toBe(null);
    });

    it("should correctly merge class names", () => {
      const { getByTestId } = render(
        <Collapse collapsed={false}>
          <div data-testid="div" className="test">
            Content
          </div>
        </Collapse>
      );
      const div = getByTestId("div");
      expect(div).toMatchSnapshot();

      expect(div.className).toContain("test");
    });
  });
});
