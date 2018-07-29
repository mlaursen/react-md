import * as React from "react";
import * as PropTypes from "prop-types";
import { TextIconSpacing } from "@react-md/icon";

export interface IListItemLeftIconProps {
  /**
   * An optional icon to display with a text button. This is invalid for icon buttons. If this is
   * a single element, a new class name will be cloned into the element to get correct spacing so
   * if you have a custom icon element, you **must** also pass that class name down. If you are using
   * one of the react-md icon component packages, this is handled automatically.
   *
   * If this is not a valid react element, the icon will be wrapped in a `<span>` instead
   * with the class names applied.
   *
   * @docgen
   */
  icon?: React.ReactElement<Element> | React.ReactNode;

  /**
   * The children to render before or after the provided icon.
   *
   * @docgen
   */
  children?: React.ReactNode;

  /**
   * Boolean if the icon should be forced into a `<span>` with the class names applied instead of attempting
   * to clone into the provided icon.
   *
   * @docgen
   */
  forceIconWrap?: boolean;
}

export interface IListItemLeftIconDefaultProps {
  forceIconWrap: boolean;
}

export type ListItemLeftIconWithDefaultProps = IListItemLeftIconProps & IListItemLeftIconDefaultProps;

const ListItemLeftIcon: React.SFC<IListItemLeftIconProps> = ({ icon, children, forceIconWrap }) => (
  <TextIconSpacing
    icon={icon}
    beforeClassName="rmd-list-item__icon rmd-list-item__icon--before"
    forceIconWrap={forceIconWrap}
  >
    {children}
  </TextIconSpacing>
);

ListItemLeftIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.node,
  forceIconWrap: PropTypes.bool,
};

ListItemLeftIcon.defaultProps = {
  forceIconWrap: false,
} as IListItemLeftIconDefaultProps;

export default ListItemLeftIcon;
