import { Button, SrOnly } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function ResponsiveButton(): ReactElement {
  return (
    <>
      <Button responsive>
        <FavoriteIcon />
        <SrOnly phoneOnly>Favorite</SrOnly>
      </Button>
      <Button responsive buttonType="icon">
        <FavoriteIcon />
        <SrOnly phoneOnly>Favorite</SrOnly>
      </Button>
      <Button responsive buttonType="icon-square">
        <FavoriteIcon />
        <SrOnly phoneOnly>Favorite</SrOnly>
      </Button>
      <Button responsive buttonType="icon-square">
        <SrOnly phoneOnly>Favorite</SrOnly>
        <FavoriteIcon />
      </Button>
    </>
  );
}
