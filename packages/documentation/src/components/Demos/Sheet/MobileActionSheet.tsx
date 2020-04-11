import React, { FC, useCallback } from "react";
import {
  ArrowDropDownSVGIcon,
  DeleteSVGIcon,
  EditSVGIcon,
  LinkSVGIcon,
  ShareSVGIcon,
} from "@react-md/material-icons";
import {
  defaultMenuRenderer,
  DropdownMenu,
  MenuRenderer,
} from "@react-md/menu";
import { Sheet, SheetProps } from "@react-md/sheet";
import { LabelRequiredForA11y, useAppSize } from "@react-md/utils";

import "./MobileActionSheet.scss";

const items = [
  { leftAddon: <ShareSVGIcon />, children: "Share" },
  { leftAddon: <LinkSVGIcon />, children: "Get link" },
  { leftAddon: <EditSVGIcon />, children: "Edit name" },
  { leftAddon: <DeleteSVGIcon />, children: "Delete collection" },
];

const MenuSheet: FC<LabelRequiredForA11y<SheetProps>> = ({
  children,
  ...props
}) => {
  const { onRequestClose } = props;
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  return (
    <Sheet
      {...props}
      className="mobile-sheet"
      onRequestClose={onRequestClose}
      role="menu"
      disableFocusOnMount
      position="bottom"
      onClick={handleClick}
    >
      {children}
    </Sheet>
  );
};

const renderSheet: MenuRenderer = ({
  // these props are only required for the `Menu` component, but not within the sheet
  // so we can just extract them and not pass them down
  horizontal: _horizontal,
  controlId: _controlId,
  anchor: _anchor,
  positionOptions: _positionOptions,
  disableCloseOnResize: _disableCloseOnResize,
  disableCloseOnScroll: _disableCloseOnScroll,
  ...props
}) => <MenuSheet {...props} />;

const MobileActionSheet: FC = () => {
  const { isTablet, isLandscape, isDesktop, isLargeDesktop } = useAppSize();
  const sheet = !isDesktop && !isLargeDesktop && !(isTablet && isLandscape);
  return (
    <DropdownMenu
      id="dropdown-menu-1"
      items={items}
      dropdownIcon={<ArrowDropDownSVGIcon />}
      menuRenderer={sheet ? renderSheet : defaultMenuRenderer}
    >
      Dropdown
    </DropdownMenu>
  );
};

export default MobileActionSheet;
