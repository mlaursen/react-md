import React, { useEffect, useState } from "react";
import { NextFC } from "next";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { qsToString } from "utils/routes";

interface InstallationProps {
  packageName: string;
  readme: string | null;
}

const Installation: NextFC<InstallationProps> = ({
  readme: propReadme,
  packageName,
}) => {
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
        const changelog = await import(`../../../readmes/${packageName}.md`)
          .then((mod) => mod.default)
          .catch(() => null);

        if (!cancelled) {
          setDevReadme(changelog);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [packageName]);
  }

  if (readme === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{readme}</MarkdownPage>;
};

Installation.getInitialProps = async ({
  query,
}): Promise<InstallationProps> => {
  const packageName = qsToString(query.id);
  const readme = await import(`../../../readmes/${packageName}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

  return { readme, packageName };
};

export default Installation;
