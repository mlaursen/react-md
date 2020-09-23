import React from "react";
import { render } from "@testing-library/react";

import { CardTitle } from "../CardTitle";

describe("CardTitle", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<CardTitle {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<CardTitle {...props} small />);
    expect(container).toMatchSnapshot();

    rerender(<CardTitle {...props} className="custom-class-name" />);
    expect(container).toMatchSnapshot();

    rerender(<CardTitle {...props} className="custom-class-name" small />);
    expect(container).toMatchSnapshot();
  });
});
