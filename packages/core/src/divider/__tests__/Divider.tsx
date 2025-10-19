import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Divider } from "../Divider.js";
import { divider } from "../styles.js";

describe("Divider", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHRElement>();

    const { rerender } = render(<Divider ref={ref} />);
    const divider = screen.getByRole("separator");
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
    expect(ref.current).toBe(divider);
    expect(divider).toMatchSnapshot();

    rerender(
      <Divider
        ref={ref}
        style={{ color: "blue" }}
        className="custom-class-name"
      />
    );
    expect(divider).toMatchSnapshot();

    rerender(<Divider ref={ref} inset />);
    expect(divider).toMatchSnapshot();
  });

  it("should be able to render vertically", async () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ref,
      vertical: true,
    } as const;

    const { rerender } = render(<Divider {...props} />);
    const divider = screen.getByRole("separator");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(divider);
    expect(divider).toMatchSnapshot();

    rerender(
      <Divider
        {...props}
        style={{ color: "blue" }}
        className="custom-class-name"
      />
    );
    expect(divider).toMatchSnapshot();

    rerender(<Divider {...props} inset />);
    expect(divider).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(divider()).toMatchSnapshot();
    });
  });
});
