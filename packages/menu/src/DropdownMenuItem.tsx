import React, { FC, Fragment, ReactNode } from "react";
import { FontIcon, IconRotator } from "@react-md/icon";
import { Omit, PositionAnchor, WithForwardedRef } from "@react-md/utils";

import defaultItemRenderer from "./defaultItemRenderer";
import defaultMenuRenderer from "./defaultMenuRenderer";
import { BaseDropdownMenuProps } from "./DropdownMenu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import useItemVisibility from "./useItemVisibility";

export interface DropdownMenuItemProps
  extends Omit<MenuItemProps, "id">,
    BaseDropdownMenuProps {
  /**
   * The icon to show after the children in the button when the `buttonType` is not
   * set to `"icon"`.
   */
  dropdownIcon?: ReactNode;

  /**
   * Boolean if the dropdown icon should be removed from the button. The icon will always
   * be removed for icon buttons.
   */
  disableDropdownIcon?: boolean;

  /**
   * The default behavior of the dropdown menu is to close when the escape key is pressed.
   * Now that there are multiple nested menus, this will actually close **all** of them by
   * default. If this is undesired behavior, you can enable this prop which will make sure
   * only the top-level dropdown menu will be closed.
   */
  disableEscapeCascade?: boolean;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    DropdownMenuItemProps,
    | "menuRenderer"
    | "itemRenderer"
    | "dropdownIcon"
    | "disableDropdownIcon"
    | "disableEscapeCascade"
    | "portal"
  >
>;
type WithDefaultProps = DropdownMenuItemProps &
  DefaultProps &
  WithRef & { menuLabelledBy: string };

const HORIZONTAL_ANCHOR: PositionAnchor = {
  x: "inner-right",
  y: "below",
};
const VERTICAL_ANCHOR: PositionAnchor = {
  x: "right",
  y: "top",
};

const DropdownMenuItem: FC<DropdownMenuItemProps & WithRef> = providedProps => {
  const {
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    children,
    forwardedRef,
    anchor: propAnchor,
    menuLabel,
    menuLabelledBy,
    menuRenderer,
    items,
    itemRenderer,
    horizontal,
    onVisibilityChange,
    portal,
    portalInto,
    portalIntoId,
    positionOptions,
    rightIcon: propRightIcon,
    dropdownIcon,
    disableEscapeCascade,
    disableDropdownIcon,
    disableCloseOnScroll,
    disableCloseOnResize,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const { visible, hide, onClick, onKeyDown, defaultFocus } = useItemVisibility(
    {
      onClick: propOnClick,
      onKeyDown: propOnKeyDown,
      onVisibilityChange,
    }
  );

  let labelledBy = menuLabelledBy;
  if (!menuLabel && !menuLabelledBy) {
    labelledBy = id;
  }

  let rightIcon = propRightIcon;
  if (!disableDropdownIcon && dropdownIcon && !rightIcon) {
    rightIcon = <IconRotator rotated={visible}>{dropdownIcon}</IconRotator>;
  }

  let anchor = propAnchor;
  if (!anchor) {
    anchor = horizontal ? HORIZONTAL_ANCHOR : VERTICAL_ANCHOR;
  }

  return (
    <Fragment>
      <MenuItem
        {...props}
        aria-haspopup="menu"
        aria-expanded={visible ? "true" : undefined}
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={forwardedRef}
        rightIcon={rightIcon}
      >
        {children}
      </MenuItem>
      {menuRenderer(
        {
          "aria-label": menuLabel,
          "aria-labelledby": labelledBy,
          id: `${id}-menu`,
          controlId: id,
          anchor,
          positionOptions,
          disableCloseOnScroll,
          disableCloseOnResize,
          horizontal,
          visible,
          defaultFocus,
          onRequestClose: hide,
          children: items.map((item, i) => itemRenderer(item, `item-${i}`)),
          portal,
          portalInto,
          portalIntoId,
          onKeyDown(event) {
            if (event.key !== "Escape" || disableEscapeCascade) {
              // don't want parent keydown listeners to be triggered as well
              event.stopPropagation();
            }

            if (!horizontal && event.key === "ArrowLeft") {
              hide();
            }
          },
        },
        items
      )}
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  portal: true,
  menuRenderer: defaultMenuRenderer,
  itemRenderer: defaultItemRenderer,
  dropdownIcon: <FontIcon>keyboard_arrow_right</FontIcon>,
  disableDropdownIcon: false,
  disableEscapeCascade: false,
};

DropdownMenuItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  DropdownMenuItem.displayName = "DropdownMenuItem";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    DropdownMenuItem.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      portal: PropTypes.bool,
      menuRenderer: PropTypes.func,
      itemRenderer: PropTypes.func,
      dropdownIcon: PropTypes.node,
      disableDropdownIcon: PropTypes.bool,
      disableEscapeCascade: PropTypes.bool,
    };
  }
}

export default DropdownMenuItem;
