import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Legend, type LegendProps } from "../Legend.js";
import { label } from "../labelStyles.js";
import { legend } from "../legendStyles.js";

describe("Legend", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLegendElement>();
    const props = {
      "data-testid": "legend",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<Legend {...props} />);

    const legend = screen.getByTestId("legend");
    expect(ref.current).toBeInstanceOf(HTMLLegendElement);
    expect(ref.current).toBe(legend);
    expect(legend).toMatchSnapshot();

    rerender(
      <Legend
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} srOnly />);
    expect(legend).toMatchSnapshot();
  });

  it("should support being styled as a floating label", () => {
    render(
      <Legend data-testid="legend" floating>
        I am legend
      </Legend>
    );

    const legend = screen.getByTestId("legend");
    expect(legend).toHaveClass(label({ floating: true, floatingActive: true }));
    expect(legend).toMatchSnapshot();
  });

  it("should allow some of the label styles", () => {
    const props = {
      "data-testid": "legend",
      floating: true,
      children: "I am legend",
    } satisfies LegendProps;
    const { rerender } = render(<Legend {...props} dense />);
    const legend = screen.getByTestId("legend");
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} theme="underline" />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} active />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} error />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} disabled />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} gap stacked reversed />);
    expect(legend).toMatchSnapshot();
  });

  it("should ignore the label props if floating is not true", () => {
    const props = {
      "data-testid": "legend",
      floating: false,
      children: "I am legend",
    } satisfies LegendProps;
    const { rerender } = render(<Legend {...props} dense />);
    const legend = screen.getByTestId("legend");
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} theme="underline" />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} active />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} error />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} disabled />);
    expect(legend).toMatchSnapshot();

    rerender(<Legend {...props} gap stacked reversed />);
    expect(legend).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(legend()).toMatchSnapshot();
    });
  });
});
