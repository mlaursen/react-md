import { describe, expect, it, jest } from "@jest/globals";

import { render, screen } from "../../test-utils/index.js";
import { AutocompleteClearButton } from "../AutocompleteClearButton.js";
import { type AutocompleteClearButtonProps } from "../types.js";

describe("AutocompleteClearButton", () => {
  it("should apply the correct styling and HTML attributes", () => {
    const props: AutocompleteClearButtonProps = {
      onClick: jest.fn(),
    };
    const { rerender } = render(<AutocompleteClearButton {...props} />);

    const button = screen.getByRole("button", { name: "Clear" });
    expect(button).toMatchSnapshot();

    rerender(
      <AutocompleteClearButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();
  });

  it("should apply different classes based on the visibility prop", () => {
    const props: AutocompleteClearButtonProps = {
      onClick: jest.fn(),
    };
    const { rerender } = render(<AutocompleteClearButton {...props} />);

    const button = screen.getByRole("button", { name: "Clear" });
    expect(button).toMatchSnapshot();

    rerender(<AutocompleteClearButton {...props} visibility="always" />);
    expect(button).toMatchSnapshot();

    rerender(<AutocompleteClearButton {...props} visibility="active" />);
    expect(button).toMatchSnapshot();

    rerender(<AutocompleteClearButton {...props} visibility="query" />);
    expect(button).toMatchSnapshot();
  });
});
