import React, { FC, Fragment } from "react";
import ToggleTheme from "./ToggleTheme";
import { Tooltipped } from "@react-md/tooltip";
import GithubLink from "components/GithubLink";
import ToggleRTL from "./ToggleRTL";
import ActionMenu from "./ActionMenu";

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
      <Tooltipped id="main-github-link" tooltip="View GitHub">
        <GithubLink inherit />
      </Tooltipped>
      <ToggleRTL />
    </Fragment>
  );
};

export default Actions;
