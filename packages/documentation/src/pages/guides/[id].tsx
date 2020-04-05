import React, { useEffect, useState } from "react";
import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import { MarkdownPage } from "components/Markdown";
import { qsToString } from "utils/routes";

interface GuidesProps {
  guideId: string;
  readme: string | null;
}

const Guides: NextFC<GuidesProps> = ({ readme: propReadme, guideId }) => {
  let readme = propReadme;
  if (process.env.NODE_ENV !== "production") {
    // This is a hacky way to allow hot reloading for the guide in dev mode
    // since the getInitialProps isn't re-run for hot reloads...
    /* eslint-disable react-hooks/rules-of-hooks */
    const [devReadme, setDevReadme] = useState(readme);
    readme = devReadme;

    useEffect(() => {
      let cancelled = false;
      (async function load() {
        const readme = await import(`../../guides/${guideId}.md`)
          .then((mod) => mod.default)
          .catch(() => null);

        if (!cancelled) {
          setDevReadme(readme);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [guideId]);
  }

  if (readme === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{readme}</MarkdownPage>;
};

Guides.getInitialProps = async ({ query }): Promise<GuidesProps> => {
  const guideId = qsToString(query.id);
  const readme = await import(`../../guides/${guideId}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

  return { guideId, readme };
};

export default Guides;
