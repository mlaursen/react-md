import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";

import { Divider } from "../Divider.js";
import { divider } from "../styles.js";

describe("Divider", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();

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

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(divider()).toMatchSnapshot();
    });
  });
});
