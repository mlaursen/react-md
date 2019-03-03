import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import {
  HomeSVGIcon,
  InfoOutlineSVGIcon,
  DeveloperBoardSVGIcon,
} from "@react-md/material-icons";
import { List } from "@react-md/list";
import {
  Tree,
  TreeDataList,
  useTreeItemSelect,
  useTreeItemExpansion,
} from "@react-md/tree";
// import { TreeItem, TreeGroup } from "@react-md/tree";
import { useActiveDescendantMovement } from "@react-md/wia-aria";

import "./navigation-tree.scss";

const data: TreeDataList = [
  {
    itemId: "home",
    children: "Home",
    leftIcon: <HomeSVGIcon />,
  },
  {
    itemId: "getting-started",
    leftIcon: <InfoOutlineSVGIcon />,
    children: "Getting Started",
    childItems: [
      {
        itemId: "installation",
        children: "Installation",
      },
      {
        itemId: "using-create-react-app",
        children: "Using create-react-app",
      },
    ],
  },
];

const NavigationTree: FunctionComponent = () => {
  const { selectedIds, onItemSelect } = useTreeItemSelect([
    "main-navigation-tree-item-0-0",
  ]);
  const { expandedIds, onItemExpandedChange } = useTreeItemExpansion([]);
  return (
    <Tree
      id="main-navigation-tree"
      aria-label="Main Navigation"
      data={data}
      selectedIds={selectedIds}
      expandedIds={expandedIds}
      onItemSelect={onItemSelect}
      onItemExpandedChange={onItemExpandedChange}
    />
  );
  // const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
  //   console.log("event.target:", event.target);
  // };

  // const { handlers, activeId, setActiveId } = useActiveDescendantMovement({
  //   handlers: {
  //     onClick: event => {
  //       console.log("event.target:", event.target);
  //     },
  //   },
  //   defaultActiveId: "item-1",
  //   incrementKeys: ["ArrowDown"],
  //   decrementKeys: ["ArrowUp"],
  //   jumpToFirstKeys: ["Home"],
  //   jumpToLastKeys: ["End"],
  // });

  // return (
  //   <List
  //     id="main-navigation-tree"
  //     aria-label="Main Navigation"
  //     role="tree"
  //     className="rmd-tree"
  //     // onClick={handleClick}
  //     {...handlers}
  //     aria-activedescendant={activeId}
  //     tabIndex={0}
  //   >
  //     <Link href="/" passHref prefetch>
  //       <TreeItem
  //         id="item-1"
  //         component="a"
  //         aria-level={1}
  //         aria-posinset={1}
  //         aria-setsize={2}
  //         leftIcon={<HomeSVGIcon />}
  //       >
  //         Home
  //       </TreeItem>
  //     </Link>
  //     <TreeItem
  //       id="item-2"
  //       aria-level={1}
  //       aria-posinset={2}
  //       aria-setsize={2}
  //       leftIcon={<InfoOutlineSVGIcon />}
  //       group={
  //         <TreeGroup collapsed={false}>
  //           <Link href="/getting-started/installation" passHref prefetch>
  //             <TreeItem
  //               id="item-2-1"
  //               component="a"
  //               aria-level={2}
  //               aria-posinset={1}
  //               aria-setsize={2}
  //             >
  //               Installation
  //             </TreeItem>
  //           </Link>
  //           <Link
  //             href="/getting-started/using-create-react-app"
  //             passHref
  //             prefetch
  //           >
  //             <TreeItem
  //               id="item-2-2"
  //               component="a"
  //               aria-level={2}
  //               aria-posinset={2}
  //               aria-setsize={2}
  //             >
  //               Using create-react-app
  //             </TreeItem>
  //           </Link>
  //         </TreeGroup>
  //       }
  //     >
  //       Getting Started
  //     </TreeItem>
  //   </List>
  // );
};

export default NavigationTree;
