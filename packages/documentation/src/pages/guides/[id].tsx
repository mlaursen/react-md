import React from "react";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { NextFC } from "types/next";

interface GuidesProps {
  readme: string;
}

const Guides: NextFC<GuidesProps> = ({ readme }) =>
  !readme ? <NotFoundPage /> : <MarkdownPage>{readme}</MarkdownPage>;

Guides.getInitialProps = async ({ query }): Promise<GuidesProps> => {
  const readme = await import(`../../guides/${query.id}.md`)
    .then(mod => mod.default)
    .catch(() => "");

  return { readme };
};

export default Guides;
