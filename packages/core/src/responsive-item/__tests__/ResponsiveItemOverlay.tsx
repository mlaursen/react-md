import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import { Typography } from "../../typography/Typography.js";
import {
  ResponsiveItemOverlay,
  type ResponsiveItemOverlayProps,
} from "../ResponsiveItemOverlay.js";
import {
  type ResponsiveItemOverlayPosition,
  responsiveItemOverlay,
} from "../responsiveItemOverlayStyles.js";

describe("ResponsiveItemOverlay", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props: PropsWithRef<ResponsiveItemOverlayProps, HTMLSpanElement> = {
      ref,
      children: (
        <Typography type="headline-5" margin="none">
          Some description
        </Typography>
      ),
    };
    const { container, rerender } = render(
      <ResponsiveItemOverlay {...props} />
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItemOverlay {...props} />);
    expect(container).toMatchSnapshot();

    rerender(
      <ResponsiveItemOverlay
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    const positions: readonly ResponsiveItemOverlayPosition[] = [
      "top",
      "right",
      "bottom",
      "left",
      "middle",
      "center",
      "absolute-center",
    ];

    positions.forEach((position) => {
      rerender(<ResponsiveItemOverlay {...props} position={position} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("style utility function", () => {
    it("should be callable without any arguments", () => {
      expect(responsiveItemOverlay()).toMatchSnapshot();
    });
  });
});
