import { Link } from "@react-md/core/link/Link";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function LinkWithIconExample(): ReactElement {
  return (
    <Link href="#" flex>
      <FavoriteIcon />
      Favorite
    </Link>
  );
}
