import React from "react";
import { render } from "@testing-library/react";

import { CardActions } from "../CardActions";

describe("CardActions", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(
      <CardActions>
        <div>Content</div>
      </CardActions>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <CardActions align="start">
        <div>Content</div>
      </CardActions>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <CardActions align="center" className="custom-class-name">
        <div>Content</div>
      </CardActions>
    );
    expect(container).toMatchSnapshot();
  });
});
