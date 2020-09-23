import { act, renderHook } from "@testing-library/react-hooks";

import { useTreeItemExpansion } from "../useTreeItemExpansion";

describe("useTreeItemExpansion", () => {
  it("should set the initial expandedIds to the provided default ids", () => {
    let { result } = renderHook(() => useTreeItemExpansion([]));
    expect(result.current.expandedIds).toEqual([]);

    const expandedIds = ["id-1", "id-3", "id-4"];
    ({ result } = renderHook(() => useTreeItemExpansion(expandedIds)));
    expect(result.current.expandedIds).toEqual(expandedIds);
  });

  it("should add itemIds correctly when the onItemExpansion is called", () => {
    const { result } = renderHook(() => useTreeItemExpansion([]));
    const { onItemExpansion } = result.current;
    let { expandedIds } = result.current;

    expect(expandedIds).toEqual([]);
    act(() => {
      onItemExpansion("id-1", true);
    });

    ({ expandedIds } = result.current);
    expect(expandedIds).toEqual(["id-1"]);

    act(() => {
      onItemExpansion("id-1", true);
      onItemExpansion("id-1", true);
      onItemExpansion("id-1", true);
    });

    // it should not have updated
    expect(result.current.expandedIds).toBe(expandedIds);

    act(() => {
      onItemExpansion("id-2", true);
    });
    expect(result.current.expandedIds).not.toBe(expandedIds);

    ({ expandedIds } = result.current);
    expect(expandedIds).toEqual(["id-1", "id-2"]);
  });

  it("should remove itemIds correctly when the onItemExpansion is called", () => {
    const defaultExpandedIds = ["id-1", "id-2", "id-3"];
    const { result } = renderHook(() =>
      useTreeItemExpansion(defaultExpandedIds)
    );
    const { onItemExpansion } = result.current;
    let { expandedIds } = result.current;

    expect(expandedIds).toEqual(defaultExpandedIds);
    act(() => {
      onItemExpansion("id-100", false);
    });
    // it should not have updated
    expect(result.current.expandedIds).toBe(expandedIds);

    act(() => {
      onItemExpansion("id-1", false);
    });
    ({ expandedIds } = result.current);
    expect(expandedIds).toEqual(["id-2", "id-3"]);

    act(() => {
      onItemExpansion("id-3", false);
    });
    ({ expandedIds } = result.current);
    expect(expandedIds).toEqual(["id-2"]);

    act(() => {
      onItemExpansion("id-2", false);
    });
    ({ expandedIds } = result.current);
    expect(expandedIds).toEqual([]);
  });

  it("should always update the expandedIds to the provided itemIds when the onMultiItemExpansion is called", () => {
    const ids1 = ["id-1"];
    const ids2 = ["id-2", "id-1", "id-3"];

    const { result } = renderHook(() => useTreeItemExpansion([]));
    const { onMultiItemExpansion } = result.current;

    expect(result.current.expandedIds).toEqual([]);

    act(() => {
      onMultiItemExpansion(ids1);
    });
    expect(result.current.expandedIds).toEqual(ids1);

    act(() => {
      onMultiItemExpansion(ids2);
    });
    expect(result.current.expandedIds).toEqual(ids2);
  });
});
