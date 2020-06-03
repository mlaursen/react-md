import React, { useState, useEffect } from "react";
import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import { MarkdownPage } from "components/Markdown";
import { qsToString } from "utils/routes";

export interface ChangelogProps {
  packageName: string;
  changelog: string | null;
}

const Changelog: NextFC<ChangelogProps> = ({
  packageName,
  changelog: propChangelog,
}) => {
  let changelog = propChangelog;
  if (process.env.NODE_ENV !== "production") {
    // This is a hacky way to allow hot reloading for the guide in dev mode
    // since the getInitialProps isn't re-run for hot reloads...
    /* eslint-disable react-hooks/rules-of-hooks */
    const [devChangelog, setDevChangelog] = useState(changelog);
    changelog = devChangelog;

    useEffect(() => {
      let cancelled = false;
      (async function load() {
        const changelog = await import(`../../../changelogs/${packageName}.md`)
          .then((mod) => mod.default)
          .catch(() => null);

        if (!cancelled) {
          setDevChangelog(changelog);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [packageName]);
  }

  if (changelog === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{changelog}</MarkdownPage>;
};

Changelog.getInitialProps = async ({ query }): Promise<ChangelogProps> => {
  const packageName = qsToString(query.id);
  const changelog = await import(`../../../changelogs/${packageName}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

  return { packageName, changelog };
};

export default Changelog;
