import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

import SingleSelectTree from "@/components/tree/SingleSelectTree.jsx";

describe("SingleSelectTree", () => {
  it("should be able to verify the expanded states", async () => {
    const user = userEvent.setup();
    rmdRender(<SingleSelectTree />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });

    const subtrees = within(tree).getAllByRole("group");
    // only \`Folder 2\` and \`Folder 2 Child 2\` have child items
    expect(subtrees).toHaveLength(2);
    const [folder2Subtree, folder2Child2Subtree] = subtrees;

    // NOTE: This would error while not expanded if the \`temporaryChildItems\` prop was enabled.
    // Also, this could be found by
    // \`within(folder2Subtree).getByRole("treeitem", { name: "Folder 2 Child 1" })\`
    // if there are items with the same name
    const folder11 = screen.getByRole("treeitem", { name: "Folder 2 Child 1" });

    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder1).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "false");
    expect(folder2).toHaveAttribute("aria-expanded", "false");
    expect(isElementVisible(folder11)).toBe(false);
    expect(isElementVisible(folder2Subtree)).toBe(false);
    expect(isElementVisible(folder2Child2Subtree)).toBe(false);

    await user.click(folder2);
    expect(folder1).toHaveAttribute("aria-selected", "false");
    expect(folder1).toHaveAttribute("aria-expanded", "false");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    expect(folder2).toHaveAttribute("aria-expanded", "true");

    // due to timers, might to use \`waitFor\`
    await waitFor(() => {
      expect(isElementVisible(folder2Subtree)).toBe(true);
    });
    expect(isElementVisible(folder11)).toBe(true);
  });
});
`;

export default function TreeFindAndVerifyExpansion(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
