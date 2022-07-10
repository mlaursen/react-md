/* eslint-disable jsx-a11y/anchor-is-valid */
import { TextContainer } from "@react-md/core";
import { Link, SkipToMainLink } from "@react-md/link";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export default function LinkPage(): ReactElement {
  return (
    <TextContainer>
      <Link href="#">Link</Link>
      <Link href="#">
        <FavoriteIcon />
        Link
      </Link>
      <SkipToMainLink mainId="main-content" />
      <main id="main-content" />
    </TextContainer>
  );
}
