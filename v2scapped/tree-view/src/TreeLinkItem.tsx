import * as React from "react";
import cn from "classnames";

import { ITreeItemBaseProps } from "./TreeItem";
import { default as TreeItemContent, ITreeItemContentBaseProps } from "./TreeItemContent";

export interface ITreeLinkItemProps extends ITreeItemBaseProps, ITreeItemContentBaseProps {
  /**
   * An optional style to apply to the surrounding `<li>` element. You should normally not be
   * applying styles to this element and instead use the default `style` prop.
   */
  liStyle?: React.CSSProperties;

  /**
   * An optional className to apply to the surrounding `<li>` element. You should normally not
   * be applying styles to this element and instead use the default `className` prop.
   */
  liClassName?: string;

  /**
   * An optional `href` to apply to the link if not using a custom `linkComponent`.
   */
  href?: string;

  /**
   * The component used to render a link. This should normally be the `Link` component from
   * `react-router` or `reach-router`, but can also just be `"a"` to render as a normal link if
   * you are not creating a SPA.
   */
  linkComponent?: React.ReactType;

  /**
   * An optional `TreeGroup` component to render. This is really like a second `children` prop
   * since the main `children` are passed down to the `TreeItemContent` component instead.
   */
  group?: React.ReactNode;
}

export type TreeLinkItemProps = ITreeLinkItemProps & React.HTMLAttributes<HTMLAnchorElement>;

/**
 * The `TreeLinkItem` component should be used whenever you want to render a `TreeItem` as a link.
 * The only reason for this component is that the accessibility specs change when rendering links,
 * so this component automatically fixes them for you.
 *
 * @props TreeLinkItemProps
 */
const TreeLinkItem: React.FunctionComponent<TreeLinkItemProps> = ({
  liStyle,
  liClassName,
  className,
  tabIndex: propTabIndex,
  group,
  ...props
}) => {
  let tabIndex = propTabIndex;
  if (typeof tabIndex !== "number") {
    tabIndex = props.selected ? 0 : -1;
  }

  return (
    <li style={liStyle} className={cn("rmd-tree-item", liClassName)} role="none">
      <TreeItemContent {...props} role="treeitem" tabIndex={tabIndex} />
      {group}
    </li>
  );
};

export default TreeLinkItem;
