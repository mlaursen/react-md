import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import { ResponsiveItem, type ResponsiveItemProps } from "../ResponsiveItem.js";

describe("ResponsiveItem", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props: PropsWithRef<ResponsiveItemProps> = {
      ref,
      children: <img alt="" src="/some-image.png" />,
    };
    const { container, rerender } = render(<ResponsiveItem {...props} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(container.firstElementChild);
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItem {...props} fullWidth />);
    expect(container).toMatchSnapshot();

    rerender(
      <ResponsiveItem
        {...props}
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItem {...props} responsive="manual" />);
    expect(container).toMatchSnapshot();

    rerender(<ResponsiveItem {...props} responsive="container" />);
    expect(container).toMatchSnapshot();

    // @ts-expect-error
    rerender(<ResponsiveItem {...props} aspectRatio="16---9" />);
    rerender(<ResponsiveItem {...props} aspectRatio="16-9" />);
    expect(container).toMatchSnapshot();
  });
});
