import type { NextFC } from "next";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";

interface InstallationProps {
  packageName: string;
  readme: string | null;
}

const getReadme = (packageName: string): Promise<string | null> =>
  import(`../../../readmes/${packageName}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

const Installation: NextFC<InstallationProps> = ({
  readme: propReadme,
  packageName,
}) => {
  const readme = useHotReload(packageName, propReadme, getReadme);
  if (readme === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{readme}</MarkdownPage>;
};

Installation.getInitialProps = async ({
  query,
}): Promise<InstallationProps> => {
  const packageName = qsToString(query.id);
  const readme = await getReadme(packageName);

  return { readme, packageName };
};

export default Installation;
