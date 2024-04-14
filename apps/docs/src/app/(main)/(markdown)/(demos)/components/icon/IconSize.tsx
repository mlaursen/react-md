import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function IconSize(): ReactElement {
  return (
    <>
      <FavoriteIcon dense />
      <FavoriteIcon />
      <FavoriteIcon style={{ fontSize: "2rem" }} />
    </>
  );
}
