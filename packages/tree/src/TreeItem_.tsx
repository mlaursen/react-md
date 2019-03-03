import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  Fragment,
  createElement,
  ComponentType,
  ReactType,
} from "react";
import cn from "classnames";
import {
  getListItemHeight,
  IListItemProps,
  ListItemChildren,
  SimpleListItem,
  IListItemChildrenProps,
  ISimpleListItemProps,
} from "@react-md/list";
import {
  IInteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { IWithForwardedRef, Omit } from "@react-md/utils";

export interface ITreeItemBaseProps {
  /**
   * An optional aria-expanded attribute to apply to the tree item. This should only be provided
   * as the value "true" and only if it is currently expanded. It should be `undefined` otherwise.
   */
  "aria-expanded"?: "true";

  /**
   * The current level (depth) for the tree item.
   */
  "aria-level": number;

  /**
   * The tree item's current position within the parent treeview or a sub-group. This should be
   * a number starting from `1`.
   */
  "aria-posinset": number;

  /**
   * The size of the treeview or sub-group that the tree item is in. This should be a number
   * starting from `1`.
   */
  "aria-setsize": number;

  /**
   * The tabindex for the tree item. When working with a single-selection tree view,
   * **only 1 treeitem** can have a tab index of `0` while all other treeitems should have a tab
   * index of `-1`.
   *
   * It is generally recommended to keep this prop `undefined` and let the `selected` prop handle
   * setting the correct `tabIndex` instead. However, you can manually override the built-in
   * behavior by setting this to valid number.
   */
  tabIndex?: 0 | -1;

  /**
   * Boolean if the tree item is current selected. This will update the styles to be have the
   * selected state as well as changing the `tabIndex` from `-1` to `0` so it is focusable. If
   * the `tabIndex` prop is defined, that value will **always** be used instead.
   */
  selected?: boolean;
}

type TreeItemElement = HTMLDivElement | HTMLAnchorElement;
type TreeItemElementAttributes = Omit<
  HTMLAttributes<TreeItemElement>,
  | "id"
  | "tabIndex"
  | "aria-expanded"
  | "aria-level"
  | "aria-posinset"
  | "aria-setsize"
>;

export interface ITreeItemProps
  extends ITreeItemBaseProps,
    IListItemChildrenProps,
    Pick<ISimpleListItemProps, "threeLines" | "height">,
    TreeItemElementAttributes,
    IInteractionStatesOptions<TreeItemElement>,
    IWithForwardedRef<TreeItemElement> {
  [key: string]: any;

  /**
   * An optional style to apply to the surrounding `<li>` element. It is generally recommended
   * to not add styles to the `<li>` element but instead use the default `style` prop.
   */
  liStyle?: CSSProperties;

  /**
   * An optional className to apply to the surrounding `<li>` element. It is generally recommended
   * to not add styles to the `<li>` element but instead use the default `className` prop.
   */
  liClassName?: string;

  /**
   * An optional tree group to render within the list item outside of the main content. This
   * is really just used so that the sizing of the group does not interfere with the sizing
   * of the tree item.
   */
  group?: ReactNode;

  /**
   * An optional component to render the tree item's content as.
   */
  component?: ReactType;

  /**
   * An optional boolean to tell if the `component` prop is a link. This will update the tree item
   * so that the main `<li>` tag has a `role="none"` and the `component` gets rendered with a
   * `role="treeitem"`.
   *
   * When this is undefined, it will default to `true` when the `component` is specifically not the
   * string: `div`.
   */
  isLink?: boolean;
}

interface ITreeItemDefaultProps {
  selected: boolean;
  component: ReactType;
}

type TreeItemWithDefaultProps = ITreeItemProps & ITreeItemDefaultProps;

/**
 * The `TreeItem` component is an extremely simple component that just renders an `li` element
 * with the "base" tree item props and any children provided. This should be used in combination
 * with the `TreeItemContent` and `TreeGroup` components to get a fully functional tree item.
 *
 * If you want to render the treeitem as a link, please use the `TreeLinkItem` component instead
 * of this one.
 */
const TreeItem: FunctionComponent<ITreeItemProps> = providedProps => {
  const {
    id,
    disabled,
    isLink: propIsLink,
    liStyle,
    liClassName,
    component,
    selected,
    tabIndex: propTabIndex,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    forwardedRef,
    leftIcon,
    leftAvatar,
    rightIcon,
    rightAvatar,
    forceIconWrap,
    height: propHeight,
    threeLines,
    group,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...props
  } = providedProps as TreeItemWithDefaultProps;
  const Component = component as ComponentType<any>;
  const isLink =
    typeof propIsLink === "boolean" ? propIsLink : component !== "div";

  let tabIndex = propTabIndex;
  if (typeof tabIndex !== "number") {
    tabIndex = selected ? 0 : -1;
  }

  const { ripples, className, handlers } = useInteractionStates({
    id,
    handlers: {
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    enableKeyboardClick: !isLink,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
  });
  const height = getListItemHeight(providedProps);
  const treeItemProps = {
    id,
    "aria-disabled": disabled || undefined,
    ...handlers,
    role: "treeitem",
    tabIndex,
  };

  return (
    <li
      style={liStyle}
      className={cn("rmd-tree-item", liClassName)}
      {...(isLink ? { role: "none" } : treeItemProps)}
    >
      <Component
        {...props}
        {...(isLink ? treeItemProps : undefined)}
        ref={forwardedRef}
        className={cn(
          "rmd-tree-item__content",
          {
            [`rmd-tree-item__content--${height}`]:
              height !== "auto" && height !== "normal",
            "rmd-tree-item__content--three-lines":
              !!secondaryText && threeLines,
            "rmd-tree-item__content--clickable": !disabled,
            "rmd-tree-item__content--link": isLink,
          },
          className
        )}
      >
        <ListItemChildren
          textClassName={textClassName}
          secondaryTextClassName={secondaryTextClassName}
          textChildren={textChildren}
          primaryText={primaryText}
          secondaryText={secondaryText}
          leftIcon={leftIcon}
          leftAvatar={leftAvatar}
          rightIcon={rightIcon}
          rightAvatar={rightAvatar}
          forceIconWrap={forceIconWrap}
        >
          {children}
        </ListItemChildren>
        {ripples}
      </Component>
      {group}
    </li>
  );
};

const defaultProps: ITreeItemDefaultProps = {
  component: "div",
  selected: false,
};

TreeItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TreeItem.displayName = "TreeItem";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TreeItem.propTypes = {
      id: PropTypes.string.isRequired,
      "aria-expanded": PropTypes.oneOf(["true"]),
      "aria-level": PropTypes.number.isRequired,
      "aria-posinset": PropTypes.number.isRequired,
      "aria-setsize": PropTypes.number.isRequired,
      tabIndex: PropTypes.oneOf([0, -1]),
      selected: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<TreeItemElement, ITreeItemProps>((props, ref) => (
  <TreeItem {...props} forwardedRef={ref} />
));
