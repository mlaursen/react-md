import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import SingleSelectTree from "@/components/tree/SingleSelectTree.js";

describe("SingleSelectTree", () => {
  it("should be able to verify the selected tree items", async () => {
    const user = userEvent.setup();
    rmdRender(<SingleSelectTree />);

    // name is the \`aria-label\`
    const tree = screen.getByRole("tree", { name: "Tree" });
    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });

    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-selected", "false");

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
  });
});
`;

export default function TreeFindAndVerifySelectedItems(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
