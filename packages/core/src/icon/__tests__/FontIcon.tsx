import { describe, expect, it } from "@jest/globals";

import { render, screen } from "../../test-utils/index.js";
import { FontIcon } from "../FontIcon.js";

describe("FontIcon", () => {
  it("should render as an <i> element", () => {
    render(<FontIcon data-testid="icon">home</FontIcon>);
    expect(screen.getByTestId("icon")).toBeInstanceOf(HTMLSpanElement);
  });

  it("should render correctly", () => {
    const { rerender } = render(<FontIcon data-testid="icon">home</FontIcon>);
    const icon = screen.getByTestId("icon");
    expect(icon).toMatchSnapshot();

    rerender(<FontIcon data-testid="icon" iconClassName="fa fa-github" />);
  });

  it("should apply the correct classNames", () => {
    const { rerender } = render(<FontIcon data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("rmd-icon rmd-icon--font material-icons", {
      exact: true,
    });
    expect(icon).toMatchSnapshot();

    rerender(<FontIcon data-testid="icon" className="test-thing" dense />);
    expect(icon).toHaveClass(
      "rmd-icon rmd-icon--font rmd-icon--dense material-icons test-thing",
      { exact: true }
    );
    expect(icon).toMatchSnapshot();

    rerender(
      <FontIcon
        data-testid="icon"
        className="test-thing"
        dense
        iconClassName="fa fa-github"
      />
    );
    expect(icon).toHaveClass(
      "rmd-icon rmd-icon--font rmd-icon--dense fa fa-github test-thing",
      { exact: true }
    );
    expect(icon).toMatchSnapshot();
  });
});
