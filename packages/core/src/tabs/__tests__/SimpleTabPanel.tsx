import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";

import { render, screen } from "../../test-utils/index.js";
import { type PropsWithRef } from "../../types.js";
import { DISPLAY_NONE_CLASS } from "../../utils/isElementVisible.js";
import { SimpleTabPanel, type SimpleTabPanelProps } from "../SimpleTabPanel.js";

describe("SimpleTabPanel", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props: PropsWithRef<SimpleTabPanelProps> = {
      "aria-labelledby": "fake-tab-id",
      active: false,
      id: "fake-tab-panel-id",
      role: "tabpanel",
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<SimpleTabPanel {...props} />);

    // there is no visible label
    const tabPanel = screen.getByRole("tabpanel");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(tabPanel);
    expect(tabPanel).toMatchSnapshot();

    rerender(
      <SimpleTabPanel
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(tabPanel).toMatchSnapshot();
  });

  it("should apply the DISPLAY_NONE_CLASS while not active", () => {
    const props: SimpleTabPanelProps = {
      "aria-labelledby": "fake-tab-id",
      id: "fake-tab-panel-id",
      role: "tabpanel",
      active: false,
      children: "Content",
    };
    const { rerender } = render(<SimpleTabPanel {...props} />);

    // there is no visible label
    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toHaveClass(DISPLAY_NONE_CLASS);

    rerender(<SimpleTabPanel {...props} active />);
    expect(tabPanel).not.toHaveClass(DISPLAY_NONE_CLASS);
  });
});
