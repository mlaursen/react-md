import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import SimpleExample from "@/components/dialog/SimpleExample.jsx";

describe("SimpleExample", () => {
  it("should be able to change the visibility", async () => {
    const user = userEvent.setup();
    rmdRender(<SimpleExample />);

    // not required -- just show that the dialog isn't visible
    expect(() => screen.getByRole("dialog")).toThrow();

    const show = screen.getByRole("button", { name: "Show" });
    await user.click(show);

    const dialog = screen.getByRole("dialog", { name: "Simple Dialog" });
    // do whatever you want to verify

    // close the dialog by clicking the close button
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog).not.toBeInTheDocument();
  });
});
`;

export default function DialogFindAndToggleVisibility(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
