import type { PropsWithRef } from "@react-md/core";
import { Typography } from "@react-md/core";
import { render } from "@testing-library/react";
import { createRef } from "react";

import type {
  VisualMediaOverlayPosition,
  VisualMediaOverlayProps,
} from "../VisualMediaOverlay";
import { visualMediaOverlay, VisualMediaOverlay } from "../VisualMediaOverlay";

describe("VisualMediaOverlay", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props: PropsWithRef<VisualMediaOverlayProps, HTMLSpanElement> = {
      ref,
      children: (
        <Typography type="headline-5" margin="none">
          Some description
        </Typography>
      ),
    };
    const { container, rerender } = render(<VisualMediaOverlay {...props} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(<VisualMediaOverlay {...props} />);
    expect(container).toMatchSnapshot();

    rerender(
      <VisualMediaOverlay
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    const positions: readonly VisualMediaOverlayPosition[] = [
      "top",
      "right",
      "bottom",
      "left",
      "middle",
      "center",
      "absolute-center",
    ];

    positions.forEach((position) => {
      rerender(<VisualMediaOverlay {...props} position={position} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("style utility function", () => {
    it("should be callable without any arguments", () => {
      expect(visualMediaOverlay()).toMatchSnapshot();
    });
  });
});
