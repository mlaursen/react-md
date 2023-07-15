import { createRef } from "react";
import { render } from "../../test-utils";

import { Radio } from "../Radio";

describe("Radio", () => {
  it("should apply the correct styles, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ref,
      label: "Radio",
      value: "a",
    } as const;

    const { getByRole, container, rerender } = render(<Radio {...props} />);

    const radio = getByRole("radio", { name: "Radio" });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(radio);
    expect(container).toMatchSnapshot();

    rerender(
      <Radio
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(container).toMatchSnapshot();

    rerender(<Radio {...props} id="custom-id" />);
    expect(container).toMatchSnapshot();
  });
});
