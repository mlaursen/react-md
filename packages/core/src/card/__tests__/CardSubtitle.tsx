import { createRef } from "react";
import { render } from "../../test-utils";

import { CardSubtitle } from "../CardSubtitle";

describe("CardSubtitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const props = {
      ref,
      children: "Subtitle",
    } as const;
    const { getByRole, rerender } = render(<CardSubtitle {...props} />);

    const subtitle = getByRole("heading", { name: "Subtitle" });
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toBe(subtitle);
    expect(subtitle).toMatchSnapshot();

    rerender(
      <CardSubtitle
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(subtitle).toMatchSnapshot();
  });
});
