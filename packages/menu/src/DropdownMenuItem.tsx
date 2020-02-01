import React, {
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { IconRotator, useIcon } from "@react-md/icon";
import { PositionAnchor } from "@react-md/utils";

import defaultMenuItemRenderer from "./defaultMenuItemRenderer";
import defaultMenuRenderer from "./defaultMenuRenderer";
import { BaseDropdownMenuProps } from "./DropdownMenu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import useItemVisibility from "./useItemVisibility";

export interface DropdownMenuItemProps
  extends Omit<MenuItemProps, "id">,
    BaseDropdownMenuProps {
  /**
   * The icon to show after the children in the button when the `buttonType` is
   * not set to `"icon"`.
   */
  dropdownIcon?: ReactNode;

  /**
   * Boolean if the dropdown icon should be removed from the button. The icon
   * will always be removed for icon buttons.
   */
  disableDropdownIcon?: boolean;

  /**
   * The default behavior of the dropdown menu is to close when the escape key
   * is pressed. Now that there are multiple nested menus, this will actually
   * close **all** of them by default. If this is undesired behavior, you can
   * enable this prop which will make sure only the top-level dropdown menu will
   * be closed.
   */
  disableEscapeCascade?: boolean;
}

const HORIZONTAL_ANCHOR: PositionAnchor = {
  x: "inner-right",
  y: "below",
};
const VERTICAL_ANCHOR: PositionAnchor = {
  x: "right",
  y: "top",
};

function DropdownMenuItem(
  {
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    children,
    anchor: propAnchor,
    menuLabel,
    menuLabelledBy,
    menuRenderer = defaultMenuRenderer,
    items,
    itemRenderer = defaultMenuItemRenderer,
    horizontal,
    onVisibilityChange,
    portal = true,
    portalInto,
    portalIntoId,
    positionOptions,
    rightIcon: propRightIcon,
    dropdownIcon: propDropdownIcon,
    disableEscapeCascade = false,
    disableDropdownIcon = false,
    disableCloseOnScroll = false,
    disableCloseOnResize = false,
    ...props
  }: DropdownMenuItemProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  const { id } = props;
  const dropdownIcon = useIcon("forward", propDropdownIcon);

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
        ref={ref}
        aria-haspopup="menu"
        aria-expanded={visible ? "true" : undefined}
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        rightIcon={rightIcon}
      >
        {children}
      </MenuItem>
      {menuRenderer(
        {
          "aria-label": menuLabel,
          // ok to typecast since one of these two should be a string by this
          // line
          "aria-labelledby": labelledBy as string,
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
}

const ForwardedDropdownMenuItem = forwardRef<
  HTMLLIElement,
  DropdownMenuItemProps
>(DropdownMenuItem);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedDropdownMenuItem.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      portal: PropTypes.bool,
      menuRenderer: PropTypes.func,
      itemRenderer: PropTypes.func,
      dropdownIcon: PropTypes.node,
      disableDropdownIcon: PropTypes.bool,
      disableEscapeCascade: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedDropdownMenuItem;
