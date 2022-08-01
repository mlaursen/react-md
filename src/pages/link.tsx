import { TextContainer } from "@react-md/core";
import { Link, SkipToMainContent } from "@react-md/link";
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
      <SkipToMainContent mainId="main-content" />
      <main id="main-content" />
    </TextContainer>
  );
}
