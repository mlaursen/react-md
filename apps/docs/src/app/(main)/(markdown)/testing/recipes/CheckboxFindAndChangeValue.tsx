import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

describe("Checkbox", () => {
  it("should be able to change value", async () => {
    const user = userEvent.setup();
    rmdRender(<Checkbox label="Label" />);

    const checkbox = screen.getByRole("checkbox", { name: "Label" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
`;

export default function CheckboxFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
