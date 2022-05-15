import { render } from "@testing-library/react";

import { Card } from "../Card";

describe("Card", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Card />);

    expect(container).toMatchSnapshot();

    rerender(<Card bordered />);
    expect(container).toMatchSnapshot();

    rerender(<Card bordered raisable />);
    expect(container).toMatchSnapshot();

    rerender(<Card bordered fullWidth raisable />);
    expect(container).toMatchSnapshot();

    rerender(
      <Card bordered fullWidth raisable>
        <div>Content</div>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});
