/* eslint-disable jsx-a11y/anchor-is-valid */
import { TextContainer } from "@react-md/core";
import { Link } from "@react-md/link";
import { SkipToMainLink } from "packages/link/src/SkipToMainLink";
import type { ReactElement } from "react";
import { FavoriteSVGIcon } from "src/components/FavoriteSVGIcon";

export default function LinkPage(): ReactElement {
  return (
    <TextContainer>
      <Link href="#">Link</Link>
      <Link href="#">
        <FavoriteSVGIcon />
        Link
      </Link>
      <SkipToMainLink mainId="main-content" />
      <main id="main-content" />
    </TextContainer>
  );
}
