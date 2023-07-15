import { createRef } from "react";
import { render } from "../../test-utils";

import { CardTitle } from "../CardTitle";

describe("CardTitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const props = {
      ref,
      children: "Title",
    } as const;
    const { getByRole, rerender } = render(<CardTitle {...props} />);

    const subtitle = getByRole("heading", { name: "Title" });
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(subtitle);
    expect(subtitle).toMatchSnapshot();

    rerender(
      <CardTitle
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(subtitle).toMatchSnapshot();
  });
});
