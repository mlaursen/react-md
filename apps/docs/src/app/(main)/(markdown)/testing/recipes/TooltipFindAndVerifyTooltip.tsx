import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

function Test() {
  return (
    <TooltippedButton tooltip={<span>Some Tooltip</span>}>
      Button
    </TooltippedButton>
  );
}

describe("Test", () => {
  it("should be able to trigger a tooltip", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const button = screen.getByRole("button", { name: "Button" });

    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.hover(button);

    // change \`name\` to the tooltip text or another query
    const tooltip = screen.getByRole("tooltip", { name: "Some Tooltip" });
    expect(tooltip).toBeInTheDocument();

    await user.unhover(button);
    expect(tooltip).not.toBeInTheDocument();
  });
});
`;

export default function TooltipFindAndVerifyTooltip(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
