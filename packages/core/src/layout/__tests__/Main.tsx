import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { rmdRender, screen, userEvent } from "../../test-utils/index.js";
import { Main } from "../Main.js";
import { main } from "../mainStyles.js";

describe("Main", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLElement>();
    const props = {
      ref,
      children: "Hello, world!",
    } as const;

    const { rerender } = rmdRender(<Main {...props} />);

    const main = screen.getByRole("main");
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toBe(main);
    expect(main).toMatchSnapshot();

    rerender(
      <Main
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(main).toMatchSnapshot();

    rerender(<Main {...props} appBarOffset navOffset />);
    expect(main).toMatchSnapshot();
  });

  it("should apply the tabIndex only while using a keyboard to support focusing with the SkipToMainContent component", async () => {
    const user = userEvent.setup();
    rmdRender(<Main>Hello, world!</Main>);

    const main = screen.getByRole("main");
    expect(main).not.toHaveAttribute("tabIndex");

    await user.keyboard("[Shift]");
    expect(main).toHaveAttribute("tabIndex", "-1");
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(main()).toMatchSnapshot();
    });
  });
});
