import { Button } from "@react-md/core/button/Button";
import { SrOnly } from "@react-md/core/typography/SrOnly";
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
