import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";

import { LinearProgress } from "../LinearProgress.js";

describe("LinearProgress", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const props = {
      "aria-label": "Progressbar",
      ref,
    } as const;

    const { rerender } = render(<LinearProgress {...props} />);

    const element = screen.getByRole("progressbar", { name: "Progressbar" });

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
    render(<LinearProgress aria-label="Progressbar" id="custom-id" />);
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toHaveAttribute("id", "custom-id");
  });

  it("should be able to render vertically", () => {
    const { rerender } = render(
      <LinearProgress aria-label="Progressbar" vertical />
    );
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toMatchSnapshot();

    rerender(
      <LinearProgress aria-label="Progressbar" vertical verticalHeight={null} />
    );
    expect(progress).toMatchSnapshot();

    rerender(
      <LinearProgress aria-label="Progressbar" vertical verticalHeight={500} />
    );
    expect(progress).toMatchSnapshot();
  });

  it("should be able to reverse the animation by enabling the reverse prop", () => {
    const { rerender } = render(
      <LinearProgress aria-label="Progressbar" reverse />
    );
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" reverse vertical />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" reverse value={50} />);
    expect(progress).toMatchSnapshot();

    rerender(
      <LinearProgress aria-label="Progressbar" reverse value={50} vertical />
    );
    expect(progress).toMatchSnapshot();
  });

  it("should render as a determinate progress bar when the value is provided", () => {
    const { rerender } = render(
      <LinearProgress aria-label="Progressbar" value={30} />
    );
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toHaveAttribute("aria-valuenow", "30");
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" value={50} />);
    expect(progress).toHaveAttribute("aria-valuenow", "50");
    expect(progress).toMatchSnapshot();
  });

  it("should allow the transition to be disabled for determinate progress bars", () => {
    const { rerender } = render(
      <LinearProgress aria-label="Progressbar" value={30} disableTransition />
    );
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" disableTransition />);
    expect(progress).toMatchSnapshot();
  });

  it("should be able to render as any of the theme colors", () => {
    const { rerender } = render(
      <LinearProgress aria-label="Progressbar" theme="primary" />
    );
    const progress = screen.getByRole("progressbar", { name: "Progressbar" });
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" theme="secondary" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" theme="warning" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" theme="success" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" theme="error" />);
    expect(progress).toMatchSnapshot();

    rerender(<LinearProgress aria-label="Progressbar" theme="current-color" />);
    expect(progress).toMatchSnapshot();
  });
});
