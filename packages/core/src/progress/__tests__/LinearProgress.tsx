import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";

import { LinearProgress } from "../LinearProgress.js";

describe("LinearProgress", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      ref,
    } as const;

    const { rerender } = render(<LinearProgress {...props} />);

    const element = screen.getByRole("progressbar");

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <LinearProgress
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();

    rerender(
      <LinearProgress
        {...props}
        barStyle={{ color: "orange" }}
        barClassName="custom-bar-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow the id to be overridden", () => {
    render(<LinearProgress id="custom-id" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("id", "custom-id");
  });

  it("should be able to render vertically", () => {
    const { rerender } = render(<LinearProgress vertical />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress vertical verticalHeight={null} />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress vertical verticalHeight={500} />);
    expect(progress).toMatchSnapshot();
  });

  it("should be able to reverse the animation by enabling the reverse prop", () => {
    const { rerender } = render(<LinearProgress reverse />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress reverse vertical />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress reverse value={50} />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress reverse value={50} vertical />);
    expect(progress).toMatchSnapshot();
  });

  it("should render as a determinate progress bar when the value is provided", () => {
    const { rerender } = render(<LinearProgress value={30} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "30");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress value={50} />);
    expect(progress).toHaveAttribute("aria-valuenow", "50");
    expect(progress).toMatchSnapshot();
  });

  it("should allow the transition to be disabled for determinate progress bars", () => {
    const { rerender } = render(
      <LinearProgress value={30} disableTransition />
    );
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress disableTransition />);
    expect(progress).toMatchSnapshot();
  });

  it("should be able to render as any of the theme colors", () => {
    const { rerender } = render(<LinearProgress theme="primary" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress theme="secondary" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress theme="warning" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress theme="success" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress theme="error" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress theme="current-color" />);
    expect(progress).toMatchSnapshot();
  });
});
