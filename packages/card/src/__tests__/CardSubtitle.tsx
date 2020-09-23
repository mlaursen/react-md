import React from "react";
import { render } from "@testing-library/react";

import { CardSubtitle } from "../CardSubtitle";

describe("CardSubtitle", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<CardSubtitle {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<CardSubtitle {...props} disableSecondaryColor />);
    expect(container).toMatchSnapshot();

    rerender(<CardSubtitle {...props} className="custom-class-name" />);
    expect(container).toMatchSnapshot();

    rerender(
      <CardSubtitle
        {...props}
        className="custom-class-name"
        disableSecondaryColor
      />
    );
    expect(container).toMatchSnapshot();
  });
});
