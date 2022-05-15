import { getTreeItemId } from "../getTreeItemId";

describe("getTreeItemId", () => {
  it("should return the correct id when the parentIndexes are omitted or an empty list", () => {
    expect(getTreeItemId("tree-id", 0)).toBe("tree-id-item-1");
    expect(getTreeItemId("tree-id", 2)).toBe("tree-id-item-3");
    expect(getTreeItemId("tree-id", 10)).toBe("tree-id-item-11");

    expect(getTreeItemId("tree-id", 0, [])).toBe("tree-id-item-1");
    expect(getTreeItemId("tree-id", 2, [])).toBe("tree-id-item-3");
    expect(getTreeItemId("tree-id", 10, [])).toBe("tree-id-item-11");
  });

  it("should return the correct id for all the provided parentIndexes", () => {
    expect(getTreeItemId("tree-id", 0, [1])).toBe("tree-id-item-1-1");
    expect(getTreeItemId("tree-id", 0, [3])).toBe("tree-id-item-3-1");

    expect(getTreeItemId("tree-id", 0, [1, 1, 1])).toBe("tree-id-item-1-1-1-1");
    expect(getTreeItemId("tree-id", 0, [3, 2, 5, 1, 2])).toBe(
      "tree-id-item-3-2-5-1-2-1"
    );
  });
});
