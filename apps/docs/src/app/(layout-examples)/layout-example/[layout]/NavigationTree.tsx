"use client";
import { ButtonStyledLink } from "@/components/ButtonStyledLink.jsx";
import { LinkUnstyled } from "@/components/LinkUnstyled.jsx";
import { pascalCase } from "@/utils/strings.js";
import { box } from "@react-md/core/box/styles";
import { cssUtils } from "@react-md/core/cssUtils";
import { useLayoutTree } from "@react-md/core/layout/useLayoutTree";
import { Tree } from "@react-md/core/tree/Tree";
import { type TreeData, type TreeItemSorter } from "@react-md/core/tree/types";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import FavoriteIcon from "node_modules/@react-md/material-icons/src/FavoriteIcon.jsx";
import StarIcon from "node_modules/@react-md/material-icons/src/StarIcon.jsx";
import { useMemo, type ReactElement } from "react";
import { LayoutIcon } from "./LayoutIcon.jsx";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";

const PATH_PREFIX = "/layout-example/";
const TYPE_SUFFIX = "-type";

const sort: TreeItemSorter = (items) => {
  if (items.length !== LAYOUT_TYPES.length) {
    return items;
  }
  const sorted = [...items];
  sorted.sort((a, b) => {
    const aType = a.itemId.substring(
      PATH_PREFIX.length,
      a.itemId.length - TYPE_SUFFIX.length
    );
    const bType = b.itemId.substring(
      PATH_PREFIX.length,
      b.itemId.length - TYPE_SUFFIX.length
    );

    return (
      LAYOUT_TYPES.indexOf(bType as LayoutType) -
      LAYOUT_TYPES.indexOf(aType as LayoutType)
    );
  });
  sorted.reverse();

  return sorted;
};

export interface NavigationTreeProps {
  layout: LayoutType;
}

export function NavigationTree(props: NavigationTreeProps): ReactElement {
  const { layout } = props;

  const pathname = usePathname();
  const navItems = useMemo<TreeData>(() => {
    const homeHref = `${PATH_PREFIX}${layout}`;
    const layouts = LAYOUT_TYPES.reduce<TreeData>((result, layoutType) => {
      const href = `${PATH_PREFIX}${layoutType}`;
      result[`${href}${TYPE_SUFFIX}`] = {
        href,
        itemId: `${href}${TYPE_SUFFIX}`,
        children: pascalCase(layoutType, " "),
        parentId: "layouts",
        leftAddon: <LayoutIcon layout={layoutType} />,
        contentClassName: cnb(
          layout === layoutType && "rmd-tree-item__content--selected"
        ),
      };

      return result;
    }, {});

    return {
      pages: {
        itemId: "pages",
        parentId: null,
        children: "Pages",
      },
      layouts: {
        itemId: "layouts",
        parentId: null,
        children: "Layout Types",
      },
      [homeHref]: {
        href: homeHref,
        itemId: homeHref,
        parentId: "pages",
        children: "Home",
        leftAddon: <HomeIcon />,
      },
      [`${homeHref}/page-1`]: {
        href: `${homeHref}/page-1`,
        itemId: `${homeHref}/page-1`,
        parentId: "pages",
        children: "Page 1",
        leftAddon: <StarIcon />,
      },
      [`${homeHref}/page-2`]: {
        href: `${homeHref}/page-2`,
        itemId: `${homeHref}/page-2`,
        parentId: "pages",
        children: "Page 2",
        leftAddon: <FavoriteIcon />,
      },
      ...layouts,
    };
  }, [layout]);
  const tree = useLayoutTree({
    navItems,
    pathname,
    defaultExpandedIds: ["layouts", "pages"],
  });

  return (
    <>
      <Tree
        aria-label="Navigation"
        {...tree}
        sort={sort}
        linkComponent={LinkUnstyled}
      />
      <footer
        className={box({
          justify: "stretch",
          fullWidth: true,
          disableWrap: true,
          className: cssUtils({ textOverflow: "ellipsis" }),
        })}
      >
        <ButtonStyledLink
          style={{ flex: "1 1 auto", justifyContent: "flex-start" }}
          href={`/getting-started/layout#${layout}-navigation-layout`}
          theme="secondary"
          themeType="contained"
        >
          <ExitToAppIcon />
          <span className={cssUtils({ textOverflow: "ellipsis" })}>
            Back to layout docs
          </span>
        </ButtonStyledLink>
      </footer>
    </>
  );
}
