import React from "react";

import { NextFC } from "types/next";

import NotFoundPage from "components/NotFoundPage";
import { MarkdownPage } from "components/Markdown";
import { qsToString } from "utils/routes";

interface InstallationProps {
  readme: string | null;
}

const Installation: NextFC<InstallationProps> = ({ readme }) =>
  readme === null ? <NotFoundPage /> : <MarkdownPage>{readme}</MarkdownPage>;

Installation.getInitialProps = async ({
  query,
}): Promise<InstallationProps> => {
  const name = qsToString(query.id);
  const readme = await import(`../../../readmes/${name}.md`)
    .then(mod => mod.default)
    .catch(() => null);

  return { readme };
};

export default Installation;
