import React from "react";
import { render } from "@testing-library/react";

import { FileInput } from "../FileInput";

describe("FileInput", () => {
  it("should render correctly", () => {
    const props = { id: "input", onChange: () => {} };
    const { container, rerender } = render(<FileInput {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<FileInput {...props}>Custom children</FileInput>);
    expect(container).toMatchSnapshot();

    rerender(
      <FileInput {...props} icon={null}>
        Custom children and no Icon
      </FileInput>
    );
    expect(container).toMatchSnapshot();
  });
});
