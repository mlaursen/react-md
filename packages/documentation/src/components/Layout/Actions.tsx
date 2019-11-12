import React, { FC, Fragment } from "react";
import { useAppSize } from "@react-md/utils";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import ActionMenu from "./ActionMenu";
import GithubLink from "./GithubLink";

const Actions: FC = () => {
  const { isPhone } = useAppSize();
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
