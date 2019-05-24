import React, { forwardRef, Fragment, FunctionComponent } from "react";
import { ButtonProps } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { RequireAtLeastOne, WithForwardedRef } from "@react-md/utils";

import defaultItemRenderer, {
  Item,
  MenuItemRenderer,
} from "./defaultItemRenderer";
import defaultMenuRenderer, {
  MenuPositionProps,
  MenuRenderer,
} from "./defaultMenuRenderer";
import MenuButton, { MenuButtonProps } from "./MenuButton";
import useMenuState from "./useMenuState";

export interface DropdownMenuProps
  extends ButtonProps,
    MenuPositionProps,
    Pick<MenuButtonProps, "dropdownIcon" | "disableDropdownIcon"> {
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
   * props * are required for a11y.
   */
  menuLabelledby?: string;

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
   * An optional click handler that will be called any time an item has been clicked.
   * This is really just useful if you'd like to centralize your click event handlers.
   */
  onItemClick?: (
    item: Item,
    itemElement: HTMLLIElement,
    event: React.MouseEvent<HTMLElement>
  ) => void;

  /**
   * An optional function to call when the visibility of the menu changes.
   */
  onVisibilityChange?: (visible: boolean) => void;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<
    DropdownMenuProps,
    "menuRenderer" | "itemRenderer" | "dropdownIcon" | "disableDropdownIcon"
  >
>;
type StrictProps = DropdownMenuProps &
  RequireAtLeastOne<DropdownMenuProps, "menuLabel" | "menuLabelledby">;
type WithDefaultProps = StrictProps & DefaultProps & WithRef;

const DropdownMenu: FunctionComponent<
  StrictProps & WithRef
> = providedProps => {
  const {
    onClick: propOnclick,
    onKeyDown: propOnKeyDown,
    children,
    forwardedRef,
    anchor,
    onResize,
    onPageScroll,
    menuLabel,
    menuLabelledby,
    menuRenderer,
    items,
    itemRenderer,
    horizontal,
    onItemClick,
    onVisibilityChange,
    ...props
  } = providedProps as WithDefaultProps;
  const { id } = props;
  const {
    visible,
    hide,
    onClick,
    onKeyDown,
    onMenuClick,
    defaultFocus,
  } = useMenuState({
    items,
    onClick: propOnclick,
    onKeyDown: propOnKeyDown,
    onVisibilityChange,
    onItemClick,
  });

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
          // cheating a bit here. Not sure how to type it otherwise
          "aria-label": menuLabel as string,
          "aria-labelledby": menuLabelledby,
          id: `${id}-menu`,
          controlId: id,
          anchor,
          onResize,
          onPageScroll,
          horizontal,
          visible,
          defaultFocus,
          onClick: onMenuClick,
          onRequestClose: hide,
          children: items.map((item, i) => itemRenderer(item, `item-${i}`)),
        },
        items
      )}
    </Fragment>
  );
};

const defaultProps: DefaultProps = {
  menuRenderer: defaultMenuRenderer,
  itemRenderer: defaultItemRenderer,
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
  disableDropdownIcon: false,
};

DropdownMenu.defaultProps = defaultProps;

export default forwardRef<HTMLButtonElement, StrictProps>((props, ref) => (
  <DropdownMenu {...props} forwardedRef={ref} />
));
