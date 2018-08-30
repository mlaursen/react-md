/* tslint:disable:max-line-length */
import handleItemExpandedChange from "../handleItemExpandedChange";

const EMPTY_IDS: string[] = [];
const ITEM_ID_1 = "item-id-1";
const ITEM_ID_2 = "item-id-2";

describe("handleItemExpandedChange", () => {
  it("should return the list with the itemId added if it did not exist in the list and the expanded param is true", () => {
    expect(handleItemExpandedChange(ITEM_ID_1, true, EMPTY_IDS)).toEqual([ITEM_ID_1]);
    expect(handleItemExpandedChange(ITEM_ID_1, true, [ITEM_ID_2])).toEqual([ITEM_ID_2, ITEM_ID_1]);
  });

  it("should return the list without the itemId if it already existed and the expanded param is false", () => {
    expect(handleItemExpandedChange(ITEM_ID_1, false, [ITEM_ID_1])).toEqual([]);
    expect(handleItemExpandedChange(ITEM_ID_1, false, [ITEM_ID_1, ITEM_ID_2])).toEqual([ITEM_ID_2]);
    expect(handleItemExpandedChange(ITEM_ID_1, false, [ITEM_ID_2, ITEM_ID_1])).toEqual([ITEM_ID_2]);
  });

  it("should return the unmodified list if the itemId did not exist in the list while the expanded param is true OR the item existed in the list and the expanded param is false", () => {
    const selectedIds1 = [ITEM_ID_1];
    const selectedIds2 = [ITEM_ID_2];

    expect(handleItemExpandedChange(ITEM_ID_1, true, selectedIds1)).toBe(selectedIds1);
    expect(handleItemExpandedChange(ITEM_ID_1, false, selectedIds2)).toBe(selectedIds2);
  });
});
