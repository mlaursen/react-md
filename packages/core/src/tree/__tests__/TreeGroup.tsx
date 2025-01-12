import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "test-utils";

import { TreeGroup } from "../TreeGroup.js";
import { TreeItem } from "../TreeItem.js";
import { TreeProvider } from "../TreeProvider.js";

describe("TreeGroup", () => {
  it("should throw an error if not wrapped in a TreeProvider", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <TreeGroup depth={1} collapsed={false}>
          <TreeItem depth={1} itemId="item-id" />
        </TreeGroup>
      )
    ).toThrow("Cannot find a parent Tree component");

    error.mockRestore();
  });

  it("should stop propagation for click and mousedown events to prevent parent actions from firing", () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const parentOnClick = jest.fn();
    const parentOnMouseDown = jest.fn();
    render(
      <div onClick={parentOnClick} onMouseDown={parentOnMouseDown}>
        <TreeProvider
          temporaryChildItems={false}
          data={{}}
          linkComponent="a"
          disableTransition={false}
          expandedIds={new Set()}
          expanderIcon={null}
          expanderLeft={false}
          expandMultipleTreeItems={jest.fn()}
          expansionMode="auto"
          metadataLookup={{
            current: {
              disabledItems: {},
              elementToItem: {},
              expandable: {},
              itemToElement: {},
            },
          }}
          rootId={null}
          selectedIds={new Set()}
          selectMultipleTreeItems={jest.fn()}
          toggleTreeItemExpansion={jest.fn()}
          toggleTreeItemSelection={jest.fn()}
          multiSelect={false}
        >
          <TreeGroup
            onClick={onClick}
            onMouseDown={onMouseDown}
            depth={1}
            collapsed={false}
          >
            <TreeItem depth={1} itemId="item-1-1-id" />
          </TreeGroup>
        </TreeProvider>
      </div>
    );

    const group = screen.getByRole("group");

    fireEvent.mouseDown(group);
    expect(onMouseDown).toHaveBeenCalled();
    expect(parentOnMouseDown).not.toHaveBeenCalled();

    fireEvent.click(group);
    expect(onClick).toHaveBeenCalled();
    expect(parentOnClick).not.toHaveBeenCalled();
  });
});
