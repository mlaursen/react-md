import type { PropsWithRef } from "@react-md/core";
import { render } from "@testing-library/react";
import { createRef } from "react";

import type { VisualMediaContainerProps } from "../VisualMediaContainer";
import {
  visualMediaContainer,
  VisualMediaContainer,
} from "../VisualMediaContainer";

describe("VisualMediaContainer", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props: PropsWithRef<VisualMediaContainerProps, HTMLSpanElement> = {
      ref,
      children: <img alt="" src="/some-image.png" />,
    };
    const { container, rerender } = render(<VisualMediaContainer {...props} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(<VisualMediaContainer {...props} fullWidth />);
    expect(container).toMatchSnapshot();

    rerender(
      <VisualMediaContainer
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<VisualMediaContainer {...props} responsive="manual" />);
    expect(container).toMatchSnapshot();

    rerender(<VisualMediaContainer {...props} responsive="container" />);
    expect(container).toMatchSnapshot();

    // @ts-expect-error
    rerender(<VisualMediaContainer {...props} aspectRatio="16---9" />);
    rerender(<VisualMediaContainer {...props} aspectRatio="16-9" />);
    expect(container).toMatchSnapshot();
  });

  describe("style utility function", () => {
    it("should be callable without any arguments", () => {
      expect(visualMediaContainer()).toMatchSnapshot();
    });
  });
});
