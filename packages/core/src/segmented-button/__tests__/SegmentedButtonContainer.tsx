import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { SegmentedButtonContainer } from "../SegmentedButtonContainer.js";
import { segmentedButtonContainer } from "../segmentedButtonContainerStyles.js";

describe("SegmentedButtonContainer", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "container",
      ref,
      children: "Content",
    } as const;

    const { rerender } = render(<SegmentedButtonContainer {...props} />);

    const element = screen.getByTestId("container");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <SegmentedButtonContainer
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(segmentedButtonContainer()).toMatchSnapshot();
    });
  });
});
