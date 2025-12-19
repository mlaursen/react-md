import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import ExpansionPanelGroupExample from "@/components/expansion-panel/ExpansionPanelGroupExample.js";

describe("ExpansionPanelGroupExample", () => {
  it("should be able to expand and collapse panels", async () => {
    const user = userEvent.setup();
    rmdRender(<ExpansionPanelGroupExample />);
    const panel1 = screen.getByRole("button", { name: "Panel 1" });
    const panel2 = screen.getByRole("button", { name: "Panel 2" });
    const panel3 = screen.getByRole("button", { name: "Panel 3" });

    const [panel1Contents, panel2Contents, panel3Contents] =
      screen.getAllByRole("region");

    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1Contents).toBeInTheDocument();
    expect(panel2Contents).toBeInTheDocument();
    expect(panel3Contents).toBeInTheDocument();
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);

    await user.click(panel3);
    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "true");
    expect(panel1Contents).toBeInTheDocument();
    expect(panel2Contents).toBeInTheDocument();
    expect(panel3Contents).toBeInTheDocument();
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(true);
  });
});

`;

export default function ExpansionPanelFindAndVerifyExpansion(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
