import { type ReactElement } from "react";
import { Tree } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Tree
        labelKey="example"
        valueKey="example-2"
        getItemLabel={(item) => item.something}
        getItemValue={(item) => item.somethingElse}
        onItemExpansion={(itemId) => {
          expand(itemId);
        }}
        onMultiItemExpansion={(itemIds) => {
          setExpanded(itemIds);
        }}
        onItemSelect={(itemId) => {
          select(itemId);
        }}
        onMultiItemSelect={(itemIds) => {
          multiSelect(itemIds);
        }}
      />
    </>
  );
}
