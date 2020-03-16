import React, { FC } from "react";
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
    <>
      <ToggleTheme />
      <GithubLink />
      <ToggleRTL />
    </>
  );
};

export default Actions;
