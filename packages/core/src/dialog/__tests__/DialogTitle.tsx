import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "test-utils";
import { DialogTitle } from "../DialogTitle.js";

describe("DialogTitle", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      ref,
      children: "Title",
    } as const;

    const { rerender } = render(<DialogTitle {...props} />);

    const title = screen.getByRole("heading", { name: "Title" });
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(title);
    expect(title).toMatchSnapshot();

    rerender(
      <DialogTitle
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(title).toMatchSnapshot();
  });

  it("should allow for the Typography component defaults to be overwritten", () => {
    render(
      <DialogTitle as="h3" type="caption" margin="top">
        Title
      </DialogTitle>
    );

    const title = screen.getByRole("heading", { name: "Title" });
    expect(title).toMatchSnapshot();
  });
});
