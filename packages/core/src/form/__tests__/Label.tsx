import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";

import { Label } from "../Label.js";

describe("Label", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLabelElement>();
    const props = {
      "data-testid": "label",
      ref,
      children: "Label content",
    } as const;
    const { rerender } = render(<Label {...props} />);

    const label = screen.getByTestId("label");
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    expect(ref.current).toBe(label);
    expect(label).toMatchSnapshot();

    rerender(
      <Label
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} floating />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} floating active />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} floating active inactive />);
    expect(label).toMatchSnapshot();

    rerender(
      <Label {...props} floating active inactive floatingActive={false} />
    );
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} dense />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} error />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} error active />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} error active floating />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} gap />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} stacked />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} stacked reversed />);
    expect(label).toMatchSnapshot();

    rerender(<Label {...props} reversed />);
    expect(label).toMatchSnapshot();
  });
});
