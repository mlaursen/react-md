import { describe, expect, it } from "@jest/globals";
import { type ReactElement, createRef } from "react";

import { rmdRender, screen } from "../../test-utils/index.js";
import { MenuItemCircularProgress } from "../MenuItemCircularProgress.js";

function render(ui: ReactElement) {
  return rmdRender(ui, {
    wrapper: function Wrapper({ children }) {
      return <ul>{children}</ul>;
    },
  });
}

describe("MenuItemCircularProgress", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      liProps: {
        "data-testid": "li",
      },
      ref,
    } as const;
    const { rerender } = render(<MenuItemCircularProgress {...props} />);

    const li = screen.getByTestId("li");
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(li);
    expect(li).toMatchSnapshot();

    rerender(
      <MenuItemCircularProgress
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(li).toMatchSnapshot();
  });
});
