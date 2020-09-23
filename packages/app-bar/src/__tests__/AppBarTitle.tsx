import React from "react";
import { render } from "@testing-library/react";

import { AppBarTitle } from "../AppBarTitle";

describe("AppBarTitle", () => {
  it("should render as an h6", () => {
    const { container } = render(<AppBarTitle />);
    expect(container.querySelector("h6")).not.toBeNull();
  });

  it("should apply the correct class names", () => {
    const { container, rerender } = render(<AppBarTitle />);
    let title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--no-wrap"
    );

    rerender(<AppBarTitle keyline />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--no-wrap rmd-app-bar__title--keyline"
    );

    rerender(<AppBarTitle className="custom-class names" />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--no-wrap custom-class names"
    );

    rerender(<AppBarTitle keyline className="custom-class names" />);
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--no-wrap rmd-app-bar__title--keyline custom-class names"
    );

    rerender(
      <AppBarTitle keyline inheritColor className="custom-class names" />
    );
    title = container.querySelector("h6") as HTMLHeadingElement;
    expect(title.className).toBe(
      "rmd-app-bar__title rmd-app-bar__title--no-wrap rmd-app-bar__title--keyline rmd-app-bar__title--inherit custom-class names"
    );
  });

  it("should render correctly (with snapshots)", () => {
    const { container, rerender } = render(<AppBarTitle>Title</AppBarTitle>);

    expect(container).toMatchSnapshot();

    rerender(<AppBarTitle keyline>Title</AppBarTitle>);
    expect(container).toMatchSnapshot();

    rerender(
      <AppBarTitle keyline inheritColor>
        Title
      </AppBarTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
