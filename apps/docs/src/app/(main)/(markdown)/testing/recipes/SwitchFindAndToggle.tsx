import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { Switch } from "@react-md/core/form/Switch";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

describe("Switch", () => {
  it("should be able to change the checked state", async () => {
    const user = userEvent.setup();
    rmdRender(<Switch label="Label" />);

    const switchElement = screen.getByRole("switch", { name: "Label" });
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(switchElement).toBeChecked();
  });
});
`;

export default function SwitchFindAndToggle(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
