import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { Card } from "../Card.js";

describe("Card", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "card",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<Card {...props} />);

    const card = screen.getByTestId("card");
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
