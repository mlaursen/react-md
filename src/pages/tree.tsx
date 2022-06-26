import { Button } from "@react-md/button";
import {
  Box,
  ElementInteractionProvider,
  TextContainer,
  Typography,
} from "@react-md/core";
import { IconRotator } from "@react-md/icon";
import { FolderIcon } from "@react-md/material-icons/filled/file/FolderIcon";
import { FolderOpenIcon } from "@react-md/material-icons/filled/file/FolderOpenIcon";
import { ArrowDropDownIcon } from "@react-md/material-icons/filled/navigation/ArrowDropDownIcon";
import type { TreeExpansionMode } from "@react-md/tree";
import { Tree, useTreeExpansion, useTreeSelection } from "@react-md/tree";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useState } from "react";
import { TempRadio } from "src/components/TempRadio";
import { folders } from "src/constants/folders";
import styles from "./tree.module.scss";

type Layout = "button" | "before" | "after";

export default function TreePage(): ReactElement {
  const { expandedIds, onItemExpansion, onMultiItemExpansion } =
    useTreeExpansion();
  const { selectedIds, onItemSelection, onMultiItemSelection } =
    useTreeSelection();

  const [layout, setLayout] = useState<Layout>("button");
  const itemWithButton = layout === "button";
  const itemWithExpanderBefore = layout === "before";
  const itemWithExpanderAfter = layout === "after";
  const [expansionMode, setExpansionMode] = useState<TreeExpansionMode>("auto");
  const [disableTransition, setDisableTransition] = useState(false);

  return (
    <TextContainer>
      <Box>
        <TempRadio
          label="Button"
          checked={layout === "button"}
          value="button"
          onChange={() => setLayout("button")}
          name="layout"
        />
        <TempRadio
          label="Expander Before"
          checked={layout === "before"}
          value="before"
          onChange={() => setLayout("before")}
          name="layout"
        />
        <TempRadio
          label="Expander After"
          checked={layout === "after"}
          value="after"
          onChange={() => setLayout("after")}
          name="layout"
        />
      </Box>
      <Box>
        <TempRadio
          label="Auto Expansion"
          checked={expansionMode === "auto"}
          value="auto"
          onChange={() => setExpansionMode("auto")}
          name="expansionMode"
        />
        <TempRadio
          label="Manual Expansion"
          checked={expansionMode === "manual"}
          value="manual"
          onChange={() => setExpansionMode("manual")}
          name="expansionMode"
        />
      </Box>
      <Box>
        <label>
          Disable Transitions?
          <input
            type="checkbox"
            name="disableTransition"
            checked={disableTransition}
            onChange={(event) =>
              setDisableTransition(event.currentTarget.checked)
            }
          />
        </label>
      </Box>
      <Typography type="headline-4">Tree</Typography>
      <ElementInteractionProvider mode={disableTransition ? "none" : undefined}>
        <Tree
          aria-label="Tree"
          data={folders}
          expansionMode={expansionMode}
          expandedIds={expandedIds}
          selectedIds={selectedIds}
          onItemExpansion={onItemExpansion}
          onItemSelection={onItemSelection}
          onMultiItemExpansion={onMultiItemExpansion}
          onMultiItemSelection={onMultiItemSelection}
          getTreeItemProps={(item) => {
            const {
              itemId,
              expanded,
              selected: _selected,
              childItems,
              parentId,
            } = item;
            const folderIcon = expanded ? <FolderOpenIcon /> : <FolderIcon />;

            return {
              contentClassName: cnb(
                itemWithButton && styles.itemWithButton,
                itemWithExpanderBefore && styles.itemWithExpanderBefore,
                itemWithExpanderBefore &&
                  parentId === null &&
                  styles.lessPaddingStart,
                itemWithExpanderAfter && styles.itemWithExpanderAfter
              ),
              leftAddonType: itemWithButton ? "icon" : "media",
              leftAddon: itemWithButton ? (
                folderIcon
              ) : (
                <span
                  className={cnb(
                    styles.addon,
                    itemWithExpanderBefore && styles.addonSpaceBetween,
                    itemWithExpanderBefore && !childItems && styles.offset
                  )}
                >
                  {!itemWithExpanderBefore && folderIcon}
                  {childItems && (
                    <IconRotator
                      rotated={expanded}
                      disableTransition={disableTransition}
                    >
                      <ArrowDropDownIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          onItemExpansion(itemId, !expanded);
                        }}
                      />
                    </IconRotator>
                  )}
                  {itemWithExpanderBefore && folderIcon}
                </span>
              ),
              children: folders[itemId].name,
              disableCollapseTransition: disableTransition,
              rightAddon: item.childItems && itemWithButton && (
                <Button
                  className={styles.button}
                  onClick={(event) => {
                    event.stopPropagation();
                    onItemExpansion(item.itemId, !item.expanded);
                  }}
                  tabIndex={-1}
                  buttonType="icon"
                >
                  <IconRotator
                    rotated={expanded}
                    disableTransition={disableTransition}
                  >
                    <ArrowDropDownIcon />
                  </IconRotator>
                </Button>
              ),
            };
          }}
        />
      </ElementInteractionProvider>
    </TextContainer>
  );
}
