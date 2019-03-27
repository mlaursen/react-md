import React from "react";
import { render, cleanup } from "react-testing-library";

import AppBarTitle from "../AppBarTitle";

afterEach(cleanup);
describe("AppBarTitle", () => {
  it("should render as an h6", () => {
    const { container } = render(<AppBarTitle />);
    expect(container.querySelector("h6")).not.toBeNull();
  });

  it("should apply the correct class names", () => {
    const { container, rerender } = render(<AppBarTitle />);
    let title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe("rmd-app-bar__title");

    rerender(<AppBarTitle keyline />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--keyline"
    );

    rerender(<AppBarTitle className="custom-class names" />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe("rmd-app-bar__title custom-class names");

    rerender(<AppBarTitle keyline className="custom-class names" />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--keyline custom-class names"
    );
  });
});
