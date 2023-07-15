import { createRef } from "react";
import { render } from "../../test-utils";

import { Card } from "../Card";

describe("Card", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "card",
      ref,
      children: "Content",
    } as const;
    const { getByTestId, rerender } = render(<Card {...props} />);

    const card = getByTestId("card");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(card);
    expect(card).toMatchSnapshot();

    rerender(
      <Card
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(card).toMatchSnapshot();

    rerender(<Card {...props} bordered raisable />);
    expect(card).toMatchSnapshot();

    rerender(<Card {...props} fullWidth />);
    expect(card).toMatchSnapshot();
  });
});
