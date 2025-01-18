import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";
import { AutocompleteChip } from "../AutocompleteChip.js";

describe("AutocompleteChip", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      onClick: jest.fn(),
      children: "Option 1",
    } as const;
    const { rerender } = render(<AutocompleteChip {...props} />);

    const button = screen.getByRole("button", { name: "Option 1" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <AutocompleteChip
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();
  });
});
