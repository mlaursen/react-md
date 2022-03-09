import type { ReactElement } from "react";
import type { AppBarActionProps } from "@react-md/app-bar";
import { AppBarAction } from "@react-md/app-bar";
import { SearchSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

export default function SearchAction({
  children,
  ...props
}: AppBarActionProps): ReactElement {
  const { id } = usePhoneContext();
  return (
    <AppBarAction {...props} id={`${id}-search`}>
      {children}
    </AppBarAction>
  );
}

SearchAction.defaultProps = {
  "aria-label": "Search",
  children: <SearchSVGIcon />,
  first: true,
};
