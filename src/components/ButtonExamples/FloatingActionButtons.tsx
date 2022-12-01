import { Button } from "@react-md/button";
import { Card } from "@react-md/card";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { CSSProperties, ReactElement } from "react";

const style: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: 360,
  height: 580,
  margin: "0 auto",
};

export function FloatingActionButtons(): ReactElement {
  return (
    <>
      <Card style={style}>
        <Button
          aria-label="Favorite"
          floating="top-left"
          floatingProps={{ absolute: true }}
        >
          <FavoriteIcon />
        </Button>
        <Button
          aria-label="Favorite"
          floating="top-right"
          theme="primary"
          floatingProps={{ absolute: true }}
        >
          <FavoriteIcon />
        </Button>
        <Button
          aria-label="Favorite"
          floatingProps={{ absolute: true }}
          floating="bottom-left"
          theme="clear"
        >
          <FavoriteIcon />
        </Button>
        <Button
          aria-label="Favorite"
          floatingProps={{ absolute: true }}
          floating="bottom-right"
        >
          <FavoriteIcon />
        </Button>
      </Card>
      <Card style={style}>
        <Button
          floatingProps={{ absolute: true }}
          floating="top-left"
          buttonType="text"
        >
          Top left
        </Button>
        <Button
          floatingProps={{ absolute: true }}
          floating="top-right"
          theme="primary"
          buttonType="text"
        >
          Top right
        </Button>
        <Button
          floatingProps={{ absolute: true }}
          floating="bottom-left"
          theme="clear"
          buttonType="text"
        >
          Bottom left
        </Button>
        <Button
          floatingProps={{ absolute: true }}
          floating="bottom-right"
          buttonType="text"
        >
          Bottom right
        </Button>
      </Card>
    </>
  );
}
