import { act, renderHook } from "@testing-library/react-hooks";

import { useTreeItemSelection } from "../useTreeItemSelection";

describe("useTreeItemSelection", () => {
  it("should default to the provided selectedIds list", () => {
    let { result } = renderHook(() => useTreeItemSelection([], false));
    expect(result.current.selectedIds).toEqual([]);

    ({ result } = renderHook(() => useTreeItemSelection([], true)));
    expect(result.current.selectedIds).toEqual([]);

    const defaultIds = ["id-1", "id-2"];
    ({ result } = renderHook(() => useTreeItemSelection(defaultIds, false)));
    expect(result.current.selectedIds).toEqual(defaultIds);

    ({ result } = renderHook(() => useTreeItemSelection(defaultIds, true)));
    expect(result.current.selectedIds).toEqual(defaultIds);
  });

  it("should handle updating the selectedIds list for single select behavior", () => {
    const { result } = renderHook(() => useTreeItemSelection([], false));
    const { onItemSelect } = result.current;
    let { selectedIds } = result.current;

    expect(selectedIds).toEqual([]);

    act(() => {
      onItemSelect("id-1");
    });
    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-1"]);

    act(() => {
      onItemSelect("id-1");
    });
    // it should not have updated
    expect(result.current.selectedIds).toBe(selectedIds);

    act(() => {
      onItemSelect("id-2");
    });
    expect(result.current.selectedIds).not.toBe(selectedIds);

    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-2"]);
  });

  it("should handle updating the selected ids for multi-select behavior", () => {
    const { result } = renderHook(() => useTreeItemSelection([], true));
    const { onItemSelect } = result.current;
    let { selectedIds } = result.current;

    expect(selectedIds).toEqual([]);

    act(() => {
      onItemSelect("id-1");
    });
    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-1"]);

    act(() => {
      onItemSelect("id-1");
    });
    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual([]);

    act(() => {
      onItemSelect("id-1");
      onItemSelect("id-2");
    });

    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-1", "id-2"]);
  });

  it("should default to single select behavior", () => {
    // same tests as the single select test
    const { result } = renderHook(() => useTreeItemSelection([]));
    const { onItemSelect } = result.current;
    let { selectedIds } = result.current;

    expect(selectedIds).toEqual([]);

    act(() => {
      onItemSelect("id-1");
    });
    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-1"]);

    act(() => {
      onItemSelect("id-1");
    });
    // it should not have updated
    expect(result.current.selectedIds).toBe(selectedIds);

    act(() => {
      onItemSelect("id-2");
    });
    expect(result.current.selectedIds).not.toBe(selectedIds);

    ({ selectedIds } = result.current);
    expect(selectedIds).toEqual(["id-2"]);
  });
});
