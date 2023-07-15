import { createRef } from "react";
import { render } from "../../test-utils";

import { Divider } from "../Divider";
import { divider } from "../styles";

describe("Divider", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();

    const { getByRole, rerender } = render(<Divider ref={ref} />);
    const divider = getByRole("separator");
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
    expect(ref.current).toBe(divider);
    expect(divider).toMatchSnapshot();

    rerender(
      <Divider
        ref={ref}
        style={{ color: "blue" }}
        className="custom-class-name"
      />
    );
    expect(divider).toMatchSnapshot();

    rerender(<Divider ref={ref} inset />);
    expect(divider).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(divider()).toMatchSnapshot();
    });
  });
});
