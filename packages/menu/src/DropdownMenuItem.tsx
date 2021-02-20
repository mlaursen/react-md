import React, { forwardRef, ReactNode } from "react";
import { IconRotator, useIcon } from "@react-md/icon";
import { BELOW_INNER_RIGHT_ANCHOR, TOP_RIGHT_ANCHOR } from "@react-md/utils";

import { defaultMenuItemRenderer } from "./defaultMenuItemRenderer";
import { defaultMenuRenderer } from "./defaultMenuRenderer";
import { BaseDropdownMenuProps } from "./DropdownMenu";
import { MenuItem, MenuItemProps } from "./MenuItem";
import { useItemVisibility } from "./useItemVisibility";

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

/**
 * The `DropdownMenuItem` component is used to be able to render nested dropdown menus.
 */
export const DropdownMenuItem = forwardRef<
  HTMLLIElement,
  DropdownMenuItemProps
>(function DropdownMenuItem(
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
    rightAddon: propRightAddon,
    dropdownIcon: propDropdownIcon,
    closeOnScroll = false,
    closeOnResize = false,
    disableEscapeCascade = false,
    disableDropdownIcon = false,
    ...props
  },
  ref
) {
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

  let rightAddon = propRightAddon;
  if (!disableDropdownIcon && dropdownIcon && !rightAddon) {
    rightAddon = <IconRotator rotated={visible}>{dropdownIcon}</IconRotator>;
  }

  let anchor = propAnchor;
  if (!anchor) {
    anchor = horizontal ? BELOW_INNER_RIGHT_ANCHOR : TOP_RIGHT_ANCHOR;
  }

  return (
    <>
      <MenuItem
        {...props}
        ref={ref}
        aria-haspopup="menu"
        aria-expanded={visible ? "true" : undefined}
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        rightAddon={rightAddon}
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
          closeOnScroll,
          closeOnResize,
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
    </>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    DropdownMenuItem.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
      children: PropTypes.node,
      anchor: PropTypes.shape({
        x: PropTypes.oneOf([
          "left",
          "right",
          "center",
          "inner-left",
          "inner-right",
        ]).isRequired,
        y: PropTypes.oneOf(["above", "below", "center", "top", "bottom"])
          .isRequired,
      }),
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.node,
          PropTypes.object,
        ])
      ).isRequired,
      menuLabel: PropTypes.string,
      menuLabelledBy: PropTypes.string,
      menuRenderer: PropTypes.func,
      itemRenderer: PropTypes.func,
      dropdownIcon: PropTypes.node,
      horizontal: PropTypes.bool,
      positionOptions: PropTypes.shape({
        vwMargin: PropTypes.number,
        vhMargin: PropTypes.number,
        xMargin: PropTypes.number,
        yMargin: PropTypes.number,
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        disableSwapping: PropTypes.bool,
      }),
      rightAddon: PropTypes.node,
      onVisibilityChange: PropTypes.func,
      disableDropdownIcon: PropTypes.bool,
      disableEscapeCascade: PropTypes.bool,
      closeOnScroll: PropTypes.bool,
      closeOnResize: PropTypes.bool,
    };
  } catch (e) {}
}
