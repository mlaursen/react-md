import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test-utils/index.js";
import { CardFooter } from "../CardFooter.js";

describe("CardFooter", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "footer",
      ref,
      children: "Footer",
    } as const;
    const { rerender } = render(<CardFooter {...props} />);

    const footer = screen.getByTestId("footer");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(footer);
    expect(footer).toMatchSnapshot();

    rerender(
      <CardFooter
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(footer).toMatchSnapshot();

    rerender(<CardFooter {...props} justify="space-between" />);
    expect(footer).toMatchSnapshot();
  });
});
