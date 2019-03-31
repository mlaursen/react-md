import React, { FunctionComponent } from "react";
import { AppBarAction, AppBarActionProps } from "@react-md/app-bar";
import { SearchSVGIcon } from "@react-md/material-icons";

import { usePhoneContext } from "./context";

const SearchAction: FunctionComponent<AppBarActionProps> = ({
  children,
  ...props
}) => {
  const { id } = usePhoneContext();
  return (
    <AppBarAction {...props} id={`${id}-search`}>
      {children}
    </AppBarAction>
  );
};

SearchAction.defaultProps = {
  "aria-label": "Search",
  children: <SearchSVGIcon />,
  first: true,
};

export default SearchAction;
