import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { Legend } from "../Legend.js";

describe("Legend", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLegendElement>();
    const props = {
      "data-testid": "fieldset",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<Legend {...props} />);

    const fieldset = screen.getByTestId("fieldset");
    expect(ref.current).toBeInstanceOf(HTMLLegendElement);
    expect(ref.current).toBe(fieldset);
    expect(fieldset).toMatchSnapshot();

    rerender(
      <Legend
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(fieldset).toMatchSnapshot();

    rerender(<Legend {...props} srOnly />);
    expect(fieldset).toMatchSnapshot();
  });
});
