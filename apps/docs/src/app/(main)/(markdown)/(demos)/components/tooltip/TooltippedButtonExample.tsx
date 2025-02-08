import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function TooltippedButtonExample(): ReactElement {
  return (
    <>
      <TooltippedButton aria-label="No tooltip">
        <CloseIcon />
      </TooltippedButton>
      <TooltippedButton
        aria-label="Favorite"
        tooltip="Tooltip"
        themeType="outline"
      >
        <FavoriteIcon />
      </TooltippedButton>
      <TooltippedButton
        aria-label="Favorite"
        tooltip={
          <span>
            <strong>Strong</strong> tooltip
          </span>
        }
        theme="success"
      >
        <FavoriteIcon />
      </TooltippedButton>
    </>
  );
}
