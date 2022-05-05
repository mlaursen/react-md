import type { ReactElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { Tree } from "../Tree";
import type { TreeData, TreeItemIds } from "../types";
import { useTreeItemExpansion } from "../useTreeItemExpansion";
import { useTreeItemSelection } from "../useTreeItemSelection";

const PROPS = {
  id: "tree",
  data: {},
  expandedIds: [],
  onItemExpansion: () => {},
  onMultiItemExpansion: () => {},
  selectedIds: [],
  onItemSelect: () => {},
  onMultiItemSelect: () => {},
};
describe("Tree", () => {
  it("should be able to render an empty tree", () => {
    const { container } = render(<Tree {...PROPS} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a tree with multiple root level nodes", () => {
    const data = {
      "item-1": {
        parentId: null,
        itemId: "item-1",
        name: "Item 1",
      },
      "item-3": {
        parentId: null,
        itemId: "item-3",
        name: "Item 3",
      },
      "item-2": {
        parentId: null,
        itemId: "item-2",
        name: "Item 2",
      },
    };
    const { container } = render(<Tree {...PROPS} data={data} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to use a rootId that is not null", () => {
    const data = {
      "item-1": {
        parentId: "root-id",
        itemId: "item-1",
        name: "Item 1",
      },
      "item-3": {
        parentId: "root-id",
        itemId: "item-3",
        name: "Item 3",
      },
      "item-2": {
        parentId: "root-id",
        itemId: "item-2",
        name: "Item 2",
      },
    };
    const { container, getByRole } = render(
      <Tree {...PROPS} data={data} rootId="root-id" />
    );
    expect(container).toMatchSnapshot();

    const tree = getByRole("tree");
    expect(tree.firstElementChild).not.toBeNull();
  });

  it("should pass the tree item's className and liClassName attributes by default", () => {
    const data = {
      "item-1": {
        parentId: null,
        itemId: "item-1",
        name: "Item 1",
        className: "item-1-class-name",
        liClassName: "item-1-li-class-name",
      },
    };

    const { container, getByRole } = render(<Tree {...PROPS} data={data} />);
    expect(container).toMatchSnapshot();

    const item = getByRole("treeitem");
    expect(item.className).toContain("item-1-li-class-name");
    expect(item.children[0].className).toContain("item-1-class-name");
  });

  describe("Real World Demos", () => {
    interface Folder extends TreeItemIds {
      name: string;
    }

    const folders: TreeData<Folder> = {
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
    };

    it("should work with the tree item hooks for single selection", () => {
      function Test(): ReactElement {
        const selection = useTreeItemSelection([], false);
        const expansion = useTreeItemExpansion([]);

        return (
          <Tree
            id="single-select-tree"
            data={folders}
            aria-label="Tree"
            {...selection}
            {...expansion}
          />
        );
      }

      const { getByRole, container } = render(<Test />);
      const tree = getByRole("tree", { name: "Tree" });
      expect(tree).not.toHaveAttribute("aria-multiselectable");

      const folder1 = getByRole("treeitem", { name: "Folder 1" });
      const folder2 = getByRole("treeitem", { name: "Folder 2" });
      const folder3 = getByRole("treeitem", { name: "Folder 3" });
      expect(folder1).toHaveAttribute("aria-selected", "false");
      expect(folder2).toHaveAttribute("aria-selected", "false");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();

      fireEvent.click(folder1);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).toHaveAttribute("aria-selected", "false");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();

      fireEvent.click(folder2);
      expect(folder1).toHaveAttribute("aria-selected", "false");
      expect(folder2).toHaveAttribute("aria-selected", "true");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();

      // does not support having an unselected tree item at this time
      fireEvent.click(folder2);
      expect(folder1).toHaveAttribute("aria-selected", "false");
      expect(folder2).toHaveAttribute("aria-selected", "true");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();
    });

    it("should work with the tree item hooks for multi selection", () => {
      function Test(): ReactElement {
        const selection = useTreeItemSelection([], true);
        const expansion = useTreeItemExpansion([]);

        return (
          <Tree
            id="multi-select-tree"
            data={folders}
            aria-label="Tree"
            {...selection}
            {...expansion}
          />
        );
      }

      const { getByRole, container } = render(<Test />);

      const tree = getByRole("tree", { name: "Tree" });
      expect(tree).toHaveAttribute("aria-multiselectable", "true");
      expect(container).toMatchSnapshot();

      const folder1 = getByRole("treeitem", { name: "Folder 1" });
      const folder2 = getByRole("treeitem", { name: "Folder 2" });
      const folder3 = getByRole("treeitem", { name: "Folder 3" });
      expect(folder1).toHaveAttribute("aria-selected", "false");
      expect(folder2).toHaveAttribute("aria-selected", "false");
      expect(folder3).toHaveAttribute("aria-selected", "false");

      fireEvent.click(folder1);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).toHaveAttribute("aria-selected", "false");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();

      fireEvent.click(folder2);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).toHaveAttribute("aria-selected", "true");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();

      fireEvent.click(folder2);
      expect(folder1).toHaveAttribute("aria-selected", "true");
      expect(folder2).toHaveAttribute("aria-selected", "false");
      expect(folder3).toHaveAttribute("aria-selected", "false");
      expect(container).toMatchSnapshot();
    });
  });
});
