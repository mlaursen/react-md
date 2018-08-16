import * as React from "react";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { IListItemBaseProps, ListItemText, ListItemLeftIcon, ListItemRightIcon } from "@react-md/list";

import { ITreeItemDefaultProps } from "./TreeItem";

export interface ITreeItemContentBaseProps extends IListItemBaseProps {
  // TODO: Learn how to correctly type this
  /**
   * The component to use that renders a `Link` component. This should normally be something like the `Link`
   * from `react-router` or `reach-router`, but can also just be the `Link` from `@react-md/link` if you are
   * not creating a SPA.
   *
   * @docgen
   */
  linkComponent?: React.ReactType;

  /**
   * Boolean if the `medium` `ListItem` spec should be used for the content.
   *
   * @docgen
   */
  medium?: boolean;
}

export type ITreeItemContentDivProps = ITreeItemContentBaseProps & React.HTMLAttributes<HTMLDivElement>;
export interface ITreeItemContentLinkProps extends ITreeItemContentBaseProps, React.HTMLAttributes<HTMLAnchorElement> {
  [key: string]: any;
  linkComponent?: React.ReactType;
}

export type ITreeItemContentProps = ITreeItemContentDivProps | ITreeItemContentLinkProps;
export interface ITreeItemContentDefaultProps {
  medium: boolean;
  linkComponent: React.ReactType;
}
export type TreeItemContentWithDefaultProps = ITreeItemContentProps &
  ITreeItemContentDefaultProps &
  ITreeItemDefaultProps;

/**
 * The `TreeItemContent` is extremely similar to the `ListItem` component as it uses some of the same props.
 * It is used to layout the contents within a `TreeItem` so that is it separated from the `TreeGroup` and has
 * the different focus states and icon alignments.
 */
const TreeItemContent: React.SFC<ITreeItemContentProps> = providedProps => {
  const {
    className: propClassName,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
    onKeyUp,
    linkComponent,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children,
    medium,
    selected,
    ...props
  } = providedProps as TreeItemContentWithDefaultProps;

  const content = (
    <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
      <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
        <ListItemText>{children}</ListItemText>
      </ListItemRightIcon>
    </ListItemLeftIcon>
  );

  return (
    <StatesConsumer
      selected={selected}
      className={cn(
        "rmd-tree-item__content",
        {
          "rmd-tree-item__content--link": !!linkComponent,
        },
        "rmd-list-item rmd-list-item--stateful",
        {
          "rmd-list-item--medium": medium && !!linkComponent,
        },
        propClassName
      )}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    >
      {statesProps => {
        if (!linkComponent) {
          const divProps = props as ITreeItemContentDivProps;
          return (
            <div {...statesProps} {...divProps}>
              {content}
            </div>
          );
        }

        return React.createElement(
          linkComponent,
          {
            ...statesProps,
            ...props,
          },
          content
        );
      }}
    </StatesConsumer>
  );
};

TreeItemContent.defaultProps = {
  medium: false,
} as ITreeItemContentDefaultProps;

export default TreeItemContent;
