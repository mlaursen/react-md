import { type ReactElement } from "react";
import { Tree } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Tree
        toggleTreeItemExpansion={(itemId) => {
          expand(itemId);
        }}
        expandMultipleTreeItems={(itemIds) => {
          setExpanded(itemIds);
        }}
        toggleTreeItemSelection={(itemId) => {
          select(itemId);
        }}
        selectMultipleTreeItems={(itemIds) => {
          multiSelect(itemIds);
        }} />
    </>
  );
}
