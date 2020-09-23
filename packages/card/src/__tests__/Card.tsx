import React from "react";
import { render } from "@testing-library/react";

import { Card } from "../Card";

describe("Card", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Card />);

    expect(container).toMatchSnapshot();

    rerender(<Card bordered />);
    expect(container).toMatchSnapshot();

    rerender(<Card bordered raiseable />);
    expect(container).toMatchSnapshot();

    rerender(<Card bordered fullWidth raiseable />);
    expect(container).toMatchSnapshot();

    rerender(
      <Card bordered fullWidth raiseable>
        <div>Content</div>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});
