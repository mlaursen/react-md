import React from "react";
import { render } from "@testing-library/react";

import TextField from "../TextField";

describe("TextField", () => {
  it("should render correctly", () => {
    const props = { id: "field" };
    const { container, rerender } = render(<TextField {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} label="Label" placeholder="Placeholder" />);
    expect(container).toMatchSnapshot();

    rerender(
      <TextField {...props} label="Label" placeholder="Placeholder" disabled />
    );
    expect(container).toMatchSnapshot();
    expect(document.getElementById("field")).toHaveAttribute("disabled");
  });
});
