import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { DialogContent } from "../DialogContent.js";
import { dialogContent } from "../styles.js";

describe("DialogContent", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "content",
      ref,
    } as const;

    const { rerender } = render(<DialogContent {...props} />);

    const content = screen.getByTestId("content");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(content);
    expect(content).toMatchSnapshot();

    rerender(
      <DialogContent
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(content).toMatchSnapshot();
  });

  it("should support disabling padding", () => {
    const { rerender } = render(
      <DialogContent data-testid="content">Content</DialogContent>
    );

    const content = screen.getByTestId("content");
    expect(content).toMatchSnapshot();

    rerender(
      <DialogContent data-testid="content" disablePadding>
        Content
      </DialogContent>
    );
    expect(content).toMatchSnapshot();
  });
});

describe("dialogContent class name utility", () => {
  it("should be callable with no arguments", () => {
    expect(dialogContent()).toMatchSnapshot();
  });
});
