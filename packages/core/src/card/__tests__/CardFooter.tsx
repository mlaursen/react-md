import { render } from "@testing-library/react";
import { createRef } from "react";

import { CardFooter } from "../CardFooter";

describe("CardFooter", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "footer",
      ref,
      children: "Footer",
    } as const;
    const { getByTestId, rerender } = render(<CardFooter {...props} />);

    const footer = getByTestId("footer");
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
