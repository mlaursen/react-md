import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function IconTheme(): ReactElement {
  return (
    <>
      <FavoriteIcon theme="primary" />
      <FavoriteIcon theme="secondary" />
      <FavoriteIcon theme="warning" />
      <FavoriteIcon theme="success" />
      <FavoriteIcon theme="error" />
      <FavoriteIcon theme="text-primary" />
      <FavoriteIcon theme="text-secondary" />
      <FavoriteIcon theme="text-hint" />
      <FavoriteIcon theme="text-disabled" />
    </>
  );
}
