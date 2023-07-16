import { createRef, type ReactElement } from "react";
import { rmdRender, screen, userEvent, waitFor } from "../../test-utils";

import type { TreeProps } from "../Tree";
import { Tree } from "../Tree";
import type { TreeData } from "../types";
import type { TreeHookOptions } from "../useTree";
import { useTree } from "../useTree";
import type { TreeExpansion } from "../useTreeExpansion";
import type { TreeSelection } from "../useTreeSelection";

interface Folder {
  name: string;
  itemId: string;
  parentId: string | null;
}

const folders = {
  "folder-1": {
    name: "Folder 1",
    itemId: "folder-1",
    parentId: null,
  },
  "folder-2": {
    name: "Folder 2",
    itemId: "folder-2",
    parentId: null,
  },
  "folder-3": {
    name: "Folder 3",
    itemId: "folder-3",
    parentId: null,
  },
  "folder-2-1": {
    name: "Folder 2 Child 1",
    itemId: "folder-2-1",
    parentId: "folder-2",
  },
  "folder-2-2": {
    name: "Folder 2 Child 2",
    itemId: "folder-2-2",
    parentId: "folder-2",
  },
  "folder-2-3": {
    name: "Folder 2 Child 3",
    itemId: "folder-2-3",
    parentId: "folder-2",
  },
  "folder-2-2-1": {
    name: "Folder 2 Child 2 Child 1",
    itemId: "folder-2-2-1",
    parentId: "folder-2-2",
  },
  "folder-2-2-1-1": {
    name: "Folder 2 Child 2 Child 1 Child 1",
    itemId: "folder-2-2-1-1",
    parentId: "folder-2-2-1",
  },
} satisfies Record<string, Folder>;

interface TestProps
  extends Omit<
    TreeProps<Folder>,
    "data" | keyof TreeExpansion | keyof TreeSelection
  > {
  data?: TreeData<Folder>;
  options?: TreeHookOptions;
}

function Test(props: TestProps): ReactElement {
  const { options, ...remaining } = props;
  const tree = useTree(options);

  return <Tree data={folders} aria-label="Tree" {...remaining} {...tree} />;
}

describe("Tree", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLUListElement>();
    const props = {
      "aria-label": "Tree",
      treeRef: ref,
      data: {},
    } as const;
    const { rerender } = rmdRender(<Test {...props} />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toBe(tree);
    expect(tree).toMatchSnapshot();

    rerender(
      <Test
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should handle single select tree behavior", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const tree = screen.getByRole("tree", { name: "Tree" });
    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
    expect(folder1).not.toHaveAttribute("aria-selected");
    expect(folder2).not.toHaveAttribute("aria-selected");
    expect(tree).toMatchSnapshot();

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).not.toHaveAttribute("aria-selected");

    await user.click(folder2);
    expect(folder1).not.toHaveAttribute("aria-selected");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();

    await waitFor(() => {
      screen.getByRole("group", { name: "Folder 2" });
    });
    const subtree = screen.getByRole("group", { name: "Folder 2" });
    expect(tree).toMatchSnapshot();

    await user.click(folder1);
    expect(folder1).toHaveAttribute("aria-selected", "true");
    expect(folder2).not.toHaveAttribute("aria-selected");
    expect(subtree).not.toHaveAttribute("hidden");
    expect(tree).toMatchSnapshot();

    await user.click(folder2);
    expect(folder1).not.toHaveAttribute("aria-selected");
    expect(folder2).toHaveAttribute("aria-selected", "true");
    await waitFor(() => {
      expect(subtree).toHaveAttribute("hidden");
    });
    expect(tree).toMatchSnapshot();

    // you cannot deselect the last item for a single select tree
    await user.click(folder2);
    expect(folder1).not.toHaveAttribute("aria-selected");
    expect(folder2).toHaveAttribute("aria-selected", "true");
  });

  it("should support default selected and expanded ids", () => {
    rmdRender(
      <Test
        options={{
          defaultSelectedIds: [folders["folder-2-1"].itemId],
          defaultExpandedIds: [folders["folder-2"].itemId],
        }}
      />
    );

    const tree = screen.getByRole("tree", { name: "Tree" });
    expect(screen.getByRole("treeitem", { name: "Folder 2" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    const folder21 = screen.getByRole("treeitem", {
      name: folders["folder-2-1"].name,
    });
    expect(folder21).toHaveAttribute("aria-selected", "true");
    expect(tree).toMatchSnapshot();
  });

  it("should allow expansion to be triggered by clicking the icon only by setting the expansion mode to manual", async () => {
    const user = userEvent.setup();
    rmdRender(<Test expansionMode="manual" disableTransition />);

    const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
    const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
    await user.click(folder2);
    expect(folder2).not.toHaveAttribute("aria-expanded");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    const icon = folder2.querySelector(".rmd-icon-rotator");
    if (!icon) {
      throw new Error();
    }
    await user.click(icon);
    expect(folder2).toHaveAttribute("aria-expanded", "true");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.click(icon);
    expect(folder2).not.toHaveAttribute("aria-expanded");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.click(folder1);
    expect(folder2).not.toHaveAttribute("aria-expanded");
    expect(folder2).not.toHaveAttribute("aria-selected");

    await user.keyboard("[ArrowDown][Space]");
    expect(folder2).not.toHaveAttribute("aria-expanded");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.keyboard("[ArrowRight]");
    expect(folder2).toHaveAttribute("aria-expanded", "true");
    expect(folder2).toHaveAttribute("aria-selected", "true");

    await user.keyboard("[ArrowLeft]");
    expect(folder2).not.toHaveAttribute("aria-expanded");
    expect(folder2).toHaveAttribute("aria-selected", "true");
  });

  describe("multi-select", () => {
    it("should handle multi-select tree behavior", async () => {
      const user = userEvent.setup();
      rmdRender(<Test options={{ multiSelect: true }} />);

      const tree = screen.getByRole("tree", { name: "Tree" });
      const folder1 = screen.getByRole("treeitem", { name: "Folder 1" });
      const folder2 = screen.getByRole("treeitem", { name: "Folder 2" });
      expect(folder1).not.toHaveAttribute("aria-selected");
      expect(folder2).not.toHaveAttribute("aria-selected");
      expect(tree).toMatchSnapshot();

      await user.click(folder1);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).not.toHaveAttribute("aria-selected");

      await user.click(folder2);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).toHaveAttribute("aria-selected", "true");
      expect(tree).toMatchSnapshot();

      await waitFor(() => {
        screen.getByRole("group", { name: "Folder 2" });
      });
      const subtree = screen.getByRole("group", { name: "Folder 2" });
      expect(tree).toMatchSnapshot();

      await user.click(folder1);
      expect(folder1).not.toHaveAttribute("aria-selected");
      expect(folder2).toHaveAttribute("aria-selected", "true");
      expect(subtree).not.toHaveAttribute("hidden");
      expect(tree).toMatchSnapshot();

      await user.click(folder2);
      expect(folder1).not.toHaveAttribute("aria-selected");
      expect(folder2).not.toHaveAttribute("aria-selected");
      await waitFor(() => {
        expect(subtree).toHaveAttribute("hidden");
      });
      expect(tree).toMatchSnapshot();
    });
  });
});
