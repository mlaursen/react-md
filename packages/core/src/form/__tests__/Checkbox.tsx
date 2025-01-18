import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen, userEvent } from "../../test-utils/index.js";

import { Checkbox } from "../Checkbox.js";

describe("Checkbox", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Checkbox",
    } as const;

    const { container, rerender } = render(<Checkbox {...props} />);

    const checkbox = screen.getByRole("checkbox", { name: "Checkbox" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(checkbox);
    expect(container).toMatchSnapshot();

    rerender(
      <Checkbox
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<Checkbox {...props} id="custom-id" />);
    expect(container).toMatchSnapshot();
  });

  it("should disable autoComplete to fix a firefox bug", () => {
    // https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("autocomplete", "off");
  });

  it("should allow the checked state to be toggled", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Label" />);

    const checkbox = screen.getByRole("checkbox", { name: "Label" });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("should allow for a defaultChecked state", () => {
    render(<Checkbox label="Label" defaultChecked />);

    const checkbox = screen.getByRole("checkbox", { name: "Label" });
    expect(checkbox).toBeChecked();
  });
});
