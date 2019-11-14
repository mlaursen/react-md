import { LinkSVGIcon } from "@react-md/material-icons";
import { MenuItem, MenuItemProps } from "@react-md/menu";
import { WithForwardedRef } from "@react-md/utils";
import React, { FC, forwardRef, useCallback } from "react";

interface Props extends MenuItemProps {
  small?: boolean;
}

const Version1MenuItem: FC<Props & WithForwardedRef<HTMLLIElement>> = ({
  small,
  forwardedRef,
  ...props
}) => {
  const onClick = useCallback(() => {
    window.location.href = "https://react-md.mlaursen.com";
  }, []);

  return (
    <MenuItem
      {...props}
      id="version-1-link"
      ref={forwardedRef}
      leftIcon={!small && <LinkSVGIcon />}
      onClick={onClick}
    >
      {`${!small ? "react-md" : ""}@v1`}
    </MenuItem>
  );
};

export default forwardRef<HTMLLIElement, Props>((props, ref) => (
  <Version1MenuItem {...props} forwardedRef={ref} />
));
