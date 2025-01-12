import { describe, expect, it } from "@jest/globals";
import { render, screen } from "test-utils";
import { AutocompleteCircularProgress } from "../AutocompleteCircularProgress.js";

describe("AutocompleteCircularProgress", () => {
  it("should apply the correct styling and HTML attributes", () => {
    const { rerender } = render(<AutocompleteCircularProgress />);

    const progress = screen.getByRole("progressbar", { name: "Loading" });
    expect(progress).toMatchSnapshot();

    rerender(
      <AutocompleteCircularProgress
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(progress).toMatchSnapshot();
  });

  it("should allow for a custom aria-label", () => {
    const { rerender } = render(<AutocompleteCircularProgress />);

    const progress = screen.getByRole("progressbar", { name: "Loading" });
    expect(progress).toHaveAttribute("aria-label", "Loading");
    expect(progress).not.toHaveAttribute("aria-labelledby");

    rerender(<AutocompleteCircularProgress aria-label="Custom" />);
    expect(progress).toHaveAttribute("aria-label", "Custom");
    expect(progress).not.toHaveAttribute("aria-labelledby");
  });

  it("should not default the aria-label if aria-labelledby was provided", () => {
    render(<AutocompleteCircularProgress aria-labelledby="some-other-id" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).not.toHaveAttribute("aria-label");
    expect(progress).toHaveAttribute("aria-labelledby", "some-other-id");
  });
});
