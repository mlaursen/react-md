/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button } from "@react-md/button";
import {
  ElementInteractionProvider,
  TextContainer,
  Typography,
} from "@react-md/core";
import { IconRotator, useIcon } from "@react-md/icon";
import { FolderIcon } from "@react-md/material-icons/filled/file/FolderIcon";
import { FolderOpenIcon } from "@react-md/material-icons/filled/file/FolderOpenIcon";
import { Tree, useTreeExpansion, useTreeSelection } from "@react-md/tree";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";
import styles from "./tree.module.scss";

const disableTransition = false;

export default function TreePage(): ReactElement {
  const { expandedIds, onItemExpansion, onMultiItemExpansion } =
    useTreeExpansion();
  const { selectedIds, onItemSelection, onMultiItemSelection } =
    useTreeSelection();
  const expander = useIcon("dropdown");

  return (
    <TextContainer>
      <Typography type="headline-4">Tree</Typography>
      <ElementInteractionProvider mode={disableTransition ? "none" : undefined}>
        <Tree
          aria-label="Tree"
          data={folders}
          expandedIds={expandedIds}
          selectedIds={selectedIds}
          onItemExpansion={onItemExpansion}
          onItemSelection={onItemSelection}
          onMultiItemExpansion={onMultiItemExpansion}
          onMultiItemSelection={onMultiItemSelection}
          getTreeItemProps={(item) => {
            const { itemId, expanded, selected, childItems } = item;

            return {
              contentClassName: styles.item,
              leftAddonType: "media",
              leftAddon: item.parentId ? null : (
                <span className={styles.addon}>
                  {expanded ? <FolderOpenIcon /> : <FolderIcon />}
                  {childItems && (
                    <IconRotator
                      rotated={expanded}
                      disableTransition={disableTransition}
                    >
                      <span
                        className={styles.icon}
                        onClick={() => onItemExpansion(itemId, !expanded)}
                      >
                        {expander}
                      </span>
                    </IconRotator>
                  )}
                </span>
              ),
              children: folders[itemId].name,
              disableCollapseTransition: disableTransition,
              onClick(event) {
                event.stopPropagation();
                onItemSelection(itemId);
              },
              // rightAddon: item.childItems && (
              //   <Button
              //     className={styles.button}
              //     onClick={(event) => {
              //       event.stopPropagation();
              //       onItemExpansion(item.itemId, !item.expanded);
              //     }}
              //     tabIndex={-1}
              //     buttonType="icon"
              //   >
              //     <IconRotator rotated={item.expanded}>{expander}</IconRotator>
              //   </Button>
              // ),
            };
          }}
        />
      </ElementInteractionProvider>
    </TextContainer>
  );
}
