import React, { ElementType, ReactElement, useMemo } from "react";
import cn from "classnames";
import { AppBar } from "@react-md/app-bar";
import {
  FolderOpenSVGIcon,
  FolderSVGIcon,
  KeyboardArrowDownSVGIcon,
} from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import {
  GetItemProps,
  getItemsFrom,
  Tree,
  TreeData,
  useTreeItemExpansion,
} from "@react-md/tree";
import { MobileOnly, useIsUserInteractionMode } from "@react-md/utils";

import CssIcon from "icons/CssIcon";
import FileSVGIcon from "icons/FileSVGIcon";
import HtmlIcon from "icons/HtmlIcon";
import JsIcon from "icons/JsIcon";
import JsonIcon from "icons/JsonIcon";
import JsxIcon from "icons/JsxIcon";
import ScssIcon from "icons/ScssIcon";
import TsIcon from "icons/TsIcon";

import NavigationActions from "./NavigationActions";
import { FileTreeData } from "./useFiles";

import styles from "./SandboxFileTree.module.scss";

export interface SandboxFileTreeProps {
  from: string;
  fileName: string;
  inline: boolean;
  visible: boolean;
  folders: readonly string[];
  files: TreeData<FileTreeData>;
  onFileChange: (fileName: string) => void;
  hideTree(): void;
  onRequestClose(): void;
  disableTransition: boolean;
}

const noop = (): void => {
  // do nothing
};
const getItemProps: GetItemProps<FileTreeData> = (item) => {
  const { expanded, type } = item;
  let Icon: ElementType;
  switch (type) {
    case "folder":
      Icon = expanded ? FolderOpenSVGIcon : FolderSVGIcon;
      break;
    case "js":
      Icon = JsIcon;
      break;
    case "jsx":
      Icon = JsxIcon;
      break;
    case "css":
      Icon = CssIcon;
      break;
    case "html":
      Icon = HtmlIcon;
      break;
    case "scss":
      Icon = ScssIcon;
      break;
    case "ts":
      Icon = TsIcon;
      break;
    case "json":
      Icon = JsonIcon;
      break;
    default:
      Icon = FileSVGIcon;
  }

  return {
    leftAddon: <Icon className={styles.icon} />,
    className: styles.item,
  };
};

export default function SandboxFileTree({
  from,
  inline,
  visible,
  fileName,
  files,
  folders,
  hideTree,
  onFileChange,
  onRequestClose,
  disableTransition,
}: SandboxFileTreeProps): ReactElement {
  const defaultExpandedIds = useMemo(() => {
    const children = getItemsFrom(files, fileName).reduce<string[]>(
      (folderIds, { itemId }) => {
        if (folders.includes(itemId)) {
          folderIds.push(itemId);
        }

        return folderIds;
      },
      []
    );

    return Array.from(new Set(["src", "public", ...children]));
  }, [folders, files, fileName]);
  const isKeyboard = useIsUserInteractionMode("keyboard");
  const values = useMemo(() => Object.values(files), [files]);

  return (
    <Sheet
      id="code-previewer-file-sheet"
      aria-label="Files sheet"
      visible={visible}
      onRequestClose={hideTree}
      position="left"
      overlay={!inline}
      portal={false}
      className={cn({
        [styles.inline]: inline,
      })}
      mountOnEnter={!inline}
      unmountOnExit={!inline}
      disableScrollLock
      disableTransition={disableTransition}
      disableTabFocusWrap={isKeyboard}
    >
      <MobileOnly>
        <AppBar theme="default">
          <NavigationActions from={from} onRequestClose={onRequestClose} />
        </AppBar>
      </MobileOnly>
      <Tree
        id="code-previewer-files"
        className={styles.tree}
        aria-label="Files"
        data={files}
        onItemSelect={onFileChange}
        onMultiItemSelect={noop}
        selectedIds={[fileName]}
        {...useTreeItemExpansion(defaultExpandedIds)}
        getItemProps={getItemProps}
        labelKey="children"
        valueKey="children"
        expanderIcon={<KeyboardArrowDownSVGIcon />}
        tabIndex={visible ? 0 : -1}
        sort={(anyItems) => {
          const items = anyItems as FileTreeData[];

          return items.sort((a, b) => {
            const aId = a.itemId;
            const bId = b.itemId;
            let aIsFolder = false;
            let bIsFolder = false;
            for (
              let i = 0;
              i < values.length && !aIsFolder && !bIsFolder;
              i += 1
            ) {
              const { parentId } = values[i];
              aIsFolder = aIsFolder || parentId === aId;
              bIsFolder = bIsFolder || parentId === bId;
            }

            if (aIsFolder === bIsFolder) {
              return a.children.localeCompare(b.children);
            }

            if (aIsFolder) {
              return -1;
            }

            return 1;
          });
        }}
      />
    </Sheet>
  );
}
