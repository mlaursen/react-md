import React, { FC } from "react";
import { MenuItemLink } from "@react-md/menu";

import { GITHUB_URL } from "constants/github";
import GithubSVGIcon from "icons/GithubSVGIcon";

const GithubLinkMenuItem: FC = () => (
  <MenuItemLink
    id="main-github-link"
    href={GITHUB_URL}
    leftIcon={<GithubSVGIcon />}
  >
    View Github
  </MenuItemLink>
);

export default GithubLinkMenuItem;
