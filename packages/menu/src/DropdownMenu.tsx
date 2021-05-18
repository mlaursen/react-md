import React, { CSSProperties, forwardRef } from "react";
import { useIcon } from "@react-md/icon";
import { RenderConditionalPortalProps } from "@react-md/portal";

import {
  defaultMenuItemRenderer,
  MenuItemRenderer,
  ValidMenuItem,
} from "./defaultMenuItemRenderer";
import {
  defaultMenuRenderer,
  MenuPositionProps,
  MenuRenderer,
} from "./defaultMenuRenderer";
import { MenuButton, MenuButtonProps } from "./MenuButton";
import { useButtonVisibility } from "./useButtonVisibility";

export interface BaseDropdownMenuProps
  extends MenuPositionProps,
    RenderConditionalPortalProps {
  /**
   * The id to use for the menu button and used to create the id for the menu.
   * The menu's id will just be `${id}-menu`.
   */
  id: string;

  /**
   * The label to use for the menu. Either this or the `menuLabelledBy` props
   * are required for a11y.
   */
  menuLabel?: string;

  /**
   * The id for an element to label the menu. Either this or the `menuLabel`
   * props are required for a11y. This will be defaulted to the `id` of the menu
   * button for convenience since it _should_ normally label the menu but should
   * be changed if it does not.
   */
  menuLabelledBy?: string;

  /**
   * An optional style object to pass to the `menuRenderer`/`Menu` component.
   */
  menuStyle?: CSSProperties;

  /**
   * An optional className to pass to the `menuRenderer`/`Menu` component.
   */
  menuClassName?: string;

  /**
   * A custom menu renderer to use. This defaults to just rendering the `Menu`
   * component with the base required props and a generated id from the button
   * id.
   */
  menuRenderer?: MenuRenderer;

  /**
   * A list of menu items to render. Each item will be passed to the
   * `menuItemRenderer` function.
   */
  items: ValidMenuItem[];

  /**
   * A function to call for each `item` in the `items` list to render a
   * ReactElement.
   */
  itemRenderer?: MenuItemRenderer;

  /**
   * Boolean if the menu should be visible immediately once this component
   * mounts.
   */
  defaultVisible?: boolean;

  /**
   * An optional function to call when the visibility of the menu changes.
   */
  onVisibilityChange?: (visible: boolean) => void;
}

export interface DropdownMenuProps
  extends Omit<MenuButtonProps, "id" | "visible" | "aria-haspopup">,
    BaseDropdownMenuProps {}

export const DropdownMenu = forwardRef<HTMLButtonElement, DropdownMenuProps>(
  function DropdownMenu(
    {
      onClick: propOnClick,
      onKeyDown: propOnKeyDown,
      children,
      anchor,
      menuLabel,
      menuLabelledBy,
      menuStyle,
      menuClassName,
      menuRenderer = defaultMenuRenderer,
      items,
      itemRenderer = defaultMenuItemRenderer,
      horizontal,
      onVisibilityChange,
      portal,
      portalInto,
      portalIntoId,
      positionOptions,
      defaultVisible = false,
      closeOnScroll,
      closeOnResize,
      dropdownIcon: propDropdownIcon,
      disableDropdownIcon = false,
      ...props
    },
    ref
  ) {
    const { id } = props;
    const dropdownIcon = useIcon("dropdown", propDropdownIcon);

    const { visible, defaultFocus, onClick, onKeyDown, hide } =
      useButtonVisibility({
        onClick: propOnClick,
        onKeyDown: propOnKeyDown,
        defaultVisible,
        onVisibilityChange,
      });

    let labelledBy = menuLabelledBy;
    if (!menuLabel && !menuLabelledBy) {
      labelledBy = id;
    }

    return (
      <>
        <MenuButton
          {...props}
          ref={ref}
          aria-haspopup="menu"
          visible={visible}
          onClick={onClick}
          onKeyDown={onKeyDown}
          dropdownIcon={dropdownIcon}
          disableDropdownIcon={disableDropdownIcon}
        >
          {children}
        </MenuButton>
        {menuRenderer(
          {
            "aria-label": menuLabel,
            // ok to typecast since one of these two should be a string by this
            // line
            "aria-labelledby": labelledBy as string,
            id: `${id}-menu`,
            controlId: id,
            style: menuStyle,
            className: menuClassName,
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
          },
          items
        )}
      </>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    DropdownMenu.propTypes = {
      id: PropTypes.string.isRequired,
      defaultVisible: PropTypes.bool,
      menuLabel: PropTypes.string,
      menuLabelledBy: PropTypes.string,
      menuRenderer: PropTypes.func,
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.node,
          PropTypes.object,
        ])
      ).isRequired,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
      children: PropTypes.node,
      horizontal: PropTypes.bool,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
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
      positionOptions: PropTypes.shape({
        vwMargin: PropTypes.number,
        vhMargin: PropTypes.number,
        xMargin: PropTypes.number,
        yMargin: PropTypes.number,
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        disableSwapping: PropTypes.bool,
      }),
      itemRenderer: PropTypes.func,
      dropdownIcon: PropTypes.node,
      disableDropdownIcon: PropTypes.bool,
      onVisibilityChange: PropTypes.func,
      closeOnScroll: PropTypes.bool,
      closeOnResize: PropTypes.bool,
    };
  } catch (e) {}
}
