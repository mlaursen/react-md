import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";

import { CircularProgress } from "../CircularProgress.js";

describe("CircularProgress", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      ref,
    } as const;

    const { rerender } = render(<CircularProgress {...props} />);

    const element = screen.getByRole("progressbar");

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <CircularProgress
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();

    rerender(
      <CircularProgress
        {...props}
        svgStyle={{ color: "red" }}
        svgClassName="custom-svg-class-name"
      />
    );
    expect(element).toMatchSnapshot();

    rerender(
      <CircularProgress
        {...props}
        circleStyle={{ color: "orange" }}
        circleClassName="custom-circle-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow the id to be overridden", () => {
    render(<CircularProgress id="custom-id" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("id", "custom-id");
  });

  it("should default to being centered but can be removed by enabling the disableCentered prop", () => {
    const { rerender } = render(<CircularProgress />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress disableCentered />);
    expect(progress).toMatchSnapshot();
  });

  it("should be able to render as a dense size", () => {
    const { rerender } = render(<CircularProgress dense />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress dense disableCentered />);
    expect(progress).toMatchSnapshot();
  });

  it("should render as a determinate progress bar when the value is provided", () => {
    const { rerender } = render(<CircularProgress value={30} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "30");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress value={50} />);
    expect(progress).toHaveAttribute("aria-valuenow", "50");
    expect(progress).toMatchSnapshot();
  });

  it("should allow the transition to be disabled for determinate progress bars", () => {
    const { rerender } = render(
      <CircularProgress value={30} disableTransition />
    );
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress disableTransition />);
    expect(progress).toMatchSnapshot();
  });

  it("should allow the animation to be simplified when the disableShrink prop is enabled", () => {
    const { rerender } = render(<CircularProgress disableShrink />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress disableShrink value={100} />);
    expect(progress).toMatchSnapshot();
  });

  it("should be able to render as any of the theme colors", () => {
    const { rerender } = render(<CircularProgress theme="primary" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress theme="secondary" />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress theme="warning" />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress theme="success" />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress theme="error" />);
    expect(progress).toMatchSnapshot();

    rerender(<CircularProgress theme="current-color" />);
    expect(progress).toMatchSnapshot();
  });

  it("should support customizing the svg through the radio, center, and dashoffset props even though I don't know what they do", () => {
    render(<CircularProgress dashoffset={100} center={20} radius={5} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();
  });
});
