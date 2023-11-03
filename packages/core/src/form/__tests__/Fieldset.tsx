import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { render, screen } from "../../test-utils/index.js";

import { fieldset, Fieldset } from "../Fieldset.js";
import { Legend } from "../Legend.js";

describe("Fieldset", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLFieldSetElement>();
    const props = {
      "data-testid": "fieldset",
      ref,
      children: <Legend>I am Legend</Legend>,
    } as const;
    const { rerender } = render(<Fieldset {...props} />);

    const fieldset = screen.getByTestId("fieldset");
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    expect(ref.current).toBe(fieldset);
    expect(fieldset).toMatchSnapshot();

    rerender(
      <Fieldset
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(fieldset).toMatchSnapshot();

    rerender(<Fieldset {...props} browserStyles />);
    expect(fieldset).toMatchSnapshot();

    rerender(<Fieldset {...props} fullWidth />);
    expect(fieldset).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(fieldset()).toMatchSnapshot();
    });
  });
});
