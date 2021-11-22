import { render } from "@testing-library/react";

import { SrOnly } from "../SrOnly";

describe("SrOnly", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<SrOnly>Some Text</SrOnly>);
    expect(container).toMatchSnapshot();

    rerender(<SrOnly focusable>Some Text</SrOnly>);
    expect(container).toMatchSnapshot();

    rerender(<SrOnly tabIndex={-1}>Some Text</SrOnly>);
    expect(container).toMatchSnapshot();

    rerender(
      <SrOnly tabIndex={-1} focusable>
        Some Text
      </SrOnly>
    );
    expect(container).toMatchSnapshot();

    rerender(<SrOnly component="div">Some Text</SrOnly>);
    expect(container).toMatchSnapshot();
  });
});
