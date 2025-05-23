import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { CardSubtitle } from "../CardSubtitle.js";

describe("CardSubtitle", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    const props = {
      ref,
      children: "Subtitle",
    } as const;
    const { rerender } = render(<CardSubtitle {...props} />);

    const subtitle = screen.getByRole("heading", { name: "Subtitle" });
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
