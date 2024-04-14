import { Button } from "@react-md/core/button/Button";
import { SrOnly } from "@react-md/core/typography/SrOnly";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Button buttonType="icon">
      <SrOnly>Example Text</SrOnly>
      <FavoriteIcon />
    </Button>
  );
}
