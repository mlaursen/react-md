import { render } from "@testing-library/react";
import { createRef } from "react";

import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Checkbox",
    } as const;

    const { getByRole, container, rerender } = render(<Checkbox {...props} />);

    const checkbox = getByRole("checkbox", { name: "Checkbox" });
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
    const { getByRole } = render(<Checkbox />);

    const checkbox = getByRole("checkbox");
    expect(checkbox).toHaveAttribute("autocomplete", "off");
  });
});
