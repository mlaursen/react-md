import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { Mark } from "../Mark.js";

describe("Mark", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLElement>();
    const props = {
      "data-testid": "mark",
      ref,
      children: "Content",
    } as const;

    const { rerender } = render(<Mark {...props} />);
    const mark = screen.getByTestId("mark");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(mark);
    expect(mark).toMatchSnapshot();

    rerender(
      <Mark
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(mark).toMatchSnapshot();
  });
});
