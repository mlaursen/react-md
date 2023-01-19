import { render } from "@testing-library/react";
import { createRef } from "react";
import type { PropsWithRef } from "../../types";
import type { ResponsiveItemContainerProps } from "../ResponsiveItemContainer";
import {
  responsiveItemContainer,
  ResponsiveItemContainer,
} from "../ResponsiveItemContainer";

describe("ResponsiveItemContainer", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props: PropsWithRef<ResponsiveItemContainerProps, HTMLSpanElement> = {
      ref,
      children: <img alt="" src="/some-image.png" />,
    };
    const { container, rerender } = render(
      <ResponsiveItemContainer {...props} />
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItemContainer {...props} fullWidth />);
    expect(container).toMatchSnapshot();

    rerender(
      <ResponsiveItemContainer
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItemContainer {...props} responsive="manual" />);
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItemContainer {...props} responsive="container" />);
    expect(container).toMatchSnapshot();

    // @ts-expect-error
    rerender(<ResponsiveItemContainer {...props} aspectRatio="16---9" />);
    rerender(<ResponsiveItemContainer {...props} aspectRatio="16-9" />);
    expect(container).toMatchSnapshot();
  });

  describe("style utility function", () => {
    it("should be callable without any arguments", () => {
      expect(responsiveItemContainer()).toMatchSnapshot();
    });
  });
});
