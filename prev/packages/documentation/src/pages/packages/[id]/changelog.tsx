import type { NextFC } from "next";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";

export interface ChangelogProps {
  packageName: string;
  changelog: string | null;
}

const getChangelog = (packageName: string): Promise<string | null> =>
  import(`../../../changelogs/${packageName}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

const Changelog: NextFC<ChangelogProps> = ({
  packageName,
  changelog: propChangelog,
}) => {
  const changelog = useHotReload(packageName, propChangelog, getChangelog);
  if (changelog === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{changelog}</MarkdownPage>;
};

Changelog.getInitialProps = async ({ query }): Promise<ChangelogProps> => {
  const packageName = qsToString(query.id);
  const changelog = await getChangelog(packageName);

  return { packageName, changelog };
};

export default Changelog;
