import { createRef } from "react";
import { render } from "../../test-utils";

import { CardContent } from "../CardContent";

describe("CardContent", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "data-testid": "content",
      ref,
      children: "Content",
    } as const;
    const { getByTestId, rerender } = render(<CardContent {...props} />);

    const card = getByTestId("content");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(card);
    expect(card).toMatchSnapshot();

    rerender(
      <CardContent
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(card).toMatchSnapshot();

    rerender(<CardContent {...props} disablePadding />);
    expect(card).toMatchSnapshot();

    rerender(<CardContent {...props} disableSecondaryColor />);
    expect(card).toMatchSnapshot();

    rerender(<CardContent {...props} disableLastChildPadding />);
    expect(card).toMatchSnapshot();
  });
});
