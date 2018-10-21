import * as React from "react";
import { MarkdownPage } from "components/Markdown";

export interface IChangelogProps {
  changelog: string;
}

const Changelog: React.SFC<IChangelogProps> = ({ changelog }) => {
  let markdown = "# Changelog";
  if (changelog.split(/\r?\n/).length <= 3) {
    markdown = `${markdown}

#### This package is completely new starting with v2 and has not had any changes yet.
`;
  } else {
    markdown = `${markdown}

${changelog}`;
  }

  return <MarkdownPage markdown={markdown} />;
};

export default Changelog;
