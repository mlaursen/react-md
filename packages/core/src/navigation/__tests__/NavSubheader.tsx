import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";
import { NavSubheader } from "../NavSubheader.js";

describe("NavSubheader", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      "data-testid": "subheader",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<NavSubheader {...props} />);

    const subheader = screen.getByTestId("subheader");
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(subheader);
    expect(subheader).toMatchSnapshot();

    rerender(
      <NavSubheader
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(subheader).toMatchSnapshot();
  });
});
