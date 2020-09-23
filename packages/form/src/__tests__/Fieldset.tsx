import React from "react";
import { render } from "@testing-library/react";

import { Fieldset } from "../Fieldset";

describe("Fieldset", () => {
  it("should render correctly", () => {
    const props = {
      legend: "Legend",
      children: <input id="text-input" type="text" />,
    };

    const { container, rerender } = render(<Fieldset {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<Fieldset {...props} legend={<span>Legend in a span</span>} />);
    expect(container).toMatchSnapshot();

    rerender(<Fieldset {...props} legendSROnly />);
    expect(container).toMatchSnapshot();
  });

  it("should be unstyled by default", () => {
    const props = { legend: "Legend" };

    const { container, rerender } = render(<Fieldset {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<Fieldset {...props} unstyled />);
    expect(container).toMatchSnapshot();

    rerender(<Fieldset {...props} unstyled={false} />);
    expect(container).toMatchSnapshot();
  });
});
