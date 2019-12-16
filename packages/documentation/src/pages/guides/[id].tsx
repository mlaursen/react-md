import React from "react";
import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import { MarkdownPage } from "components/Markdown";

interface GuidesProps {
  readme: string | null;
}

const Guides: NextFC<GuidesProps> = ({ readme }) =>
  readme === null ? <NotFoundPage /> : <MarkdownPage>{readme}</MarkdownPage>;

Guides.getInitialProps = async ({ query }): Promise<GuidesProps> => {
  const readme = await import(`../../guides/${query.id}.md`)
    .then(mod => mod.default)
    .catch(() => null);

  return { readme };
};

export default Guides;
