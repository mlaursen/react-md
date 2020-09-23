import React from "react";
import { render } from "@testing-library/react";

import { FontIcon } from "../FontIcon";

describe("FontIcon", () => {
  it("should render as an <i> element", () => {
    const { getByTestId } = render(
      <FontIcon data-testid="icon">home</FontIcon>
    );
    expect(getByTestId("icon").tagName).toBe("I");
  });

  it("should render correctly", () => {
    const { getByTestId, rerender } = render(
      <FontIcon data-testid="icon">home</FontIcon>
    );
    const icon = getByTestId("icon");
    expect(icon).toMatchSnapshot();

    rerender(<FontIcon data-testid="icon" iconClassName="fa fa-github" />);
  });

  it("should apply the correct classNames", () => {
    const { getByTestId, rerender } = render(<FontIcon data-testid="icon" />);
    const icon = getByTestId("icon");
    expect(icon.className).toBe("rmd-icon rmd-icon--font material-icons");
    expect(icon).toMatchSnapshot();

    rerender(<FontIcon data-testid="icon" className="test-thing" dense />);
    expect(icon.className).toBe(
      "rmd-icon rmd-icon--font rmd-icon--dense material-icons test-thing"
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
    expect(icon.className).toBe(
      "rmd-icon rmd-icon--font rmd-icon--dense fa fa-github test-thing"
    );
    expect(icon).toMatchSnapshot();
  });
});
