import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { DialogHeader } from "../DialogHeader.js";
import { dialogHeader } from "../styles.js";

describe("DialogHeader", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "header",
      ref,
    } as const;

    const { rerender } = render(<DialogHeader {...props} />);

    const header = screen.getByTestId("header");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(header);
    expect(header).toMatchSnapshot();

    rerender(
      <DialogHeader
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(header).toMatchSnapshot();
  });
});

describe("dialogHeader class name utility", () => {
  it("should be callable with no arguments", () => {
    expect(dialogHeader()).toMatchSnapshot();
  });
});
