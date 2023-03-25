import { Link, SkipToMainContent, TextContainer } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export default function LinkPage(): ReactElement {
  return (
    <TextContainer>
      <Link href="#">Link</Link>
      <Link href="#" flex>
        <FavoriteIcon />
        Link
      </Link>
      <SkipToMainContent mainId="main-content" />
      <main id="main-content" />
    </TextContainer>
  );
}
