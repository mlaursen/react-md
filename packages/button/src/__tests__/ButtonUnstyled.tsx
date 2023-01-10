import { render } from "@testing-library/react";
import { createRef } from "react";

import { buttonUnstyled, ButtonUnstyled } from "../ButtonUnstyled";

describe("ButtonUnstyled", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Content",
    } as const;
    const { getByRole, rerender } = render(<ButtonUnstyled {...props} />);

    const button = getByRole("button", { name: "Content" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <ButtonUnstyled
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(buttonUnstyled()).toMatchSnapshot();
    });
  });
});
