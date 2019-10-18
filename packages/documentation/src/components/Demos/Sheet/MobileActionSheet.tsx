import React, { FC, useCallback } from "react";
import {
  DropdownMenu,
  InjectedMenuProps,
  MenuRenderer,
  defaultMenuRenderer,
} from "@react-md/menu";
import {
  ArrowDropDownSVGIcon,
  ShareSVGIcon,
  LinkSVGIcon,
  EditSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";
import { Sheet, SheetProps } from "@react-md/sheet";
import { LabelRequiredForA11y } from "@react-md/utils";

import useAppSizeContext from "components/Layout/useAppSizeContext";

import "./MobileActionSheet.scss";

const items = [
  { leftIcon: <ShareSVGIcon />, children: "Share" },
  { leftIcon: <LinkSVGIcon />, children: "Get link" },
  { leftIcon: <EditSVGIcon />, children: "Edit name" },
  { leftIcon: <DeleteSVGIcon />, children: "Delete collection" },
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
  horizontal,
  controlId,
  anchor,
  positionOptions,
  disableCloseOnResize,
  disableCloseOnScroll,
  ...props
}) => <MenuSheet {...props} />;

const MobileActionSheet: FC = () => {
  const {
    isTablet,
    isLandscape,
    isDesktop,
    isLargeDesktop,
  } = useAppSizeContext();
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
