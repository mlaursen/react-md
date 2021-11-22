import { ReactElement } from "react";
import { useAppSize } from "@react-md/utils";

import { CodePreferenceToggle } from "components/CodePreference";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import ActionMenu from "./ActionMenu";
import GithubLink from "./GithubLink";
import Search from "./Search";

export default function Actions(): ReactElement {
  const { isPhone } = useAppSize();
  if (isPhone) {
    return (
      <>
        <Search />
        <ActionMenu />
      </>
    );
  }

  return (
    <>
      <Search />
      <ToggleTheme as="action" />
      <CodePreferenceToggle as="action" />
      <GithubLink as="action" />
      <ToggleRTL as="action" />
    </>
  );
}
