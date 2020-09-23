import React from "react";
import { render } from "@testing-library/react";

import { UnstyledButton } from "../UnstyledButton";

describe("UnstyledButton", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<UnstyledButton />);

    expect(container).toMatchSnapshot();

    rerender(
      <UnstyledButton>
        <span>Some children</span>
      </UnstyledButton>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <UnstyledButton className="custom-class-name">
        <span>Some children</span>
      </UnstyledButton>
    );
    expect(container).toMatchSnapshot();
  });
});
