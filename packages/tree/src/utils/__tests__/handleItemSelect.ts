/* tslint:disable:max-line-length */
import handleItemSelect from "../handleItemSelect";

const EMPTY_IDS: string[] = [];
const ITEM_ID_1 = "item-id-1";
const ITEM_ID_2 = "item-id-2";

describe("handleItemSelect", () => {
  describe("single selection", () => {
    it("should return a list of only the provided itemId", () => {
      expect(handleItemSelect(ITEM_ID_1, EMPTY_IDS)).toEqual([ITEM_ID_1]);
      expect(handleItemSelect(ITEM_ID_1, [ITEM_ID_2])).toEqual([ITEM_ID_1]);
      expect(handleItemSelect(ITEM_ID_1, [ITEM_ID_1, ITEM_ID_2])).toEqual([
        ITEM_ID_1,
      ]);
    });

    it("should return the provided list of selectedIds if the item was already selected and the only item in the list", () => {
      const selectedIds = [ITEM_ID_1];

      expect(handleItemSelect(ITEM_ID_1, selectedIds)).toBe(selectedIds);
    });
  });

  describe("multi-selection", () => {
    it("should add the itemId to the list if it did not already exist", () => {
      expect(handleItemSelect(ITEM_ID_1, EMPTY_IDS, true)).toEqual([ITEM_ID_1]);
      expect(handleItemSelect(ITEM_ID_2, [ITEM_ID_1], true)).toEqual([
        ITEM_ID_1,
        ITEM_ID_2,
      ]);
    });

    it("should should remove the itemId from the list if it already existed", () => {
      const selectedIds = [ITEM_ID_1];

      expect(handleItemSelect(ITEM_ID_1, selectedIds, true)).toEqual([]);
      expect(handleItemSelect(ITEM_ID_1, [ITEM_ID_1, ITEM_ID_2], true)).toEqual(
        [ITEM_ID_2]
      );
      expect(handleItemSelect(ITEM_ID_1, [ITEM_ID_2, ITEM_ID_1], true)).toEqual(
        [ITEM_ID_2]
      );
    });
  });
});
