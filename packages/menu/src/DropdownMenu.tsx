import React, { FC, forwardRef, Fragment } from "react";
import { FontIcon } from "@react-md/icon";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { WithForwardedRef } from "@react-md/utils";

import defaultItemRenderer, {
  Item,
  MenuItemRenderer,
} from "./defaultItemRenderer";
import defaultMenuRenderer, {
  MenuPositionProps,
  MenuRenderer,
} from "./defaultMenuRenderer";
import MenuButton, { MenuButtonProps } from "./MenuButton";
import useButtonVisibility from "./useButtonVisibility";

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
   * props are required for a11y. This will be defaulted to the `id` of the
   * menu button for convenience since it _should_ normally label the menu but
   * should be changed if it does not.
   */
  menuLabelledBy?: string;

  /**
   * A custom menu renderer to use. This defaults to just rendering the `Menu`
   * component with the base required props and a generated id from the button
   * id.
   */
  menuRenderer?: MenuRenderer;

  /**
   * A list of menu items to render. Each item will be passed to the `menuItemRenderer`
   * function.
   */
  items: Item[];

  /**
   * A function to call for each `item` in the `items` list to render a ReactElement.
   */
  itemRenderer?: MenuItemRenderer;

  /**
   * Boolean if the menu should be visible immediately once this component mounts.
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

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<
    DropdownMenuProps,
    | "menuRenderer"
    | "itemRenderer"
    | "dropdownIcon"
    | "disableDropdownIcon"
    | "defaultVisible"
  >
>;
type WithDefaultProps = DropdownMenuProps &
  DefaultProps &
  WithRef & { menuLabelledBy: string };

const DropdownMenu: FC<DropdownMenuProps & WithRef> = providedProps => {
  const {
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    children,
    forwardedRef,
    anchor,
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
    defaultVisible,
    disableCloseOnScroll,
    disableCloseOnResize,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const {
    visible,
    defaultFocus,
    onClick,
    onKeyDown,
    hide,
  } = useButtonVisibility({
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
    <Fragment>
      <MenuButton
        {...props}
        aria-haspopup="menu"
        visible={visible}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={forwardedRef}
      >
        {children}
      </MenuButton>
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
        },
        items
      )}
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  defaultVisible: false,
  menuRenderer: defaultMenuRenderer,
  itemRenderer: defaultItemRenderer,
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
  disableDropdownIcon: false,
};

DropdownMenu.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  DropdownMenu.displayName = "DropdownMenu";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
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
      itemRenderer: PropTypes.func,
      dropdownIcon: PropTypes.node,
      disableDropdownIcon: PropTypes.bool,
      onVisibilityChange: PropTypes.func,
    };
  }
}

export default forwardRef<HTMLButtonElement, DropdownMenuProps>(
  (props, ref) => <DropdownMenu {...props} forwardedRef={ref} />
);
