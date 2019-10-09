import React, { FC, Fragment } from "react";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import ActionMenu from "./ActionMenu";
import GithubLink from "./GithubLink";

export interface ActionsProps {
  isPhone: boolean;
}

const Actions: FC<ActionsProps> = ({ isPhone }) => {
  if (isPhone) {
    return <ActionMenu />;
  }

  return (
    <Fragment>
      <ToggleTheme />
      <GithubLink />
      <ToggleRTL />
    </Fragment>
  );
};

export default Actions;
