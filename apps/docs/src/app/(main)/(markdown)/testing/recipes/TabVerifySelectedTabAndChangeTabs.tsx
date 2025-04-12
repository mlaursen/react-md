import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { isElementVisible } from "@react-md/core/utils/isElementVisible";

import SimpleExample from "@/components/tabs/SimpleExample.jsx"

describe("SimpleExample", () => {
  it("should be able to change the active tab panel when clicking on a tab", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleExample />);

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });
    const panel2 = screen.getByRole("tabpanel", { name: "Tab 2" });
    const panel3 = screen.getByRole("tabpanel", { name: "Tab 3" });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(isElementVisible(panel1)).toBe(true);
    expect(isElementVisible(panel2)).toBe(false);
    expect(isElementVisible(panel3)).toBe(false);

    await user.click(tab2);
    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("aria-selected", "false");
    expect(isElementVisible(panel1)).toBe(false);
    expect(isElementVisible(panel2)).toBe(true);
    expect(isElementVisible(panel3)).toBe(false);
  });
});
`;

export default function TabVerifySelectedTabAndChangeTabs(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
