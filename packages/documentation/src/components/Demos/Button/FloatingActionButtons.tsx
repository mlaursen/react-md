import React, { ReactElement } from "react";
import {
  StarSVGIcon,
  StarHalfSVGIcon,
  StarBorderSVGIcon,
  StarsSVGIcon,
} from "@react-md/material-icons";
import { Button } from "@react-md/button";

export default function FloatingActionButtons(): ReactElement {
  return (
    <>
      <Button floating="top-left">
        <StarSVGIcon />
      </Button>
      <Button floating="top-right">
        <StarHalfSVGIcon />
      </Button>
      <Button floating="bottom-left">
        <StarBorderSVGIcon />
      </Button>
      <Button floating="bottom-right">
        <StarsSVGIcon />
      </Button>
    </>
  );
}
