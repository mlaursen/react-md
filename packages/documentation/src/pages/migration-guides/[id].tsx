import type { NextFC } from "next";

import { MarkdownPage } from "components/Markdown";
import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";

interface GuidesProps {
  guideId: string;
  readme: string | null;
}

const getGuide = (guideId: string): Promise<string | null> =>
  import(`../../migration-guides/${guideId}.md`)
    .then((mod) => mod.default)
    .catch(() => null);

const Guides: NextFC<GuidesProps> = ({ readme: propReadme, guideId }) => {
  const readme = useHotReload(guideId, propReadme, getGuide);
  if (readme === null) {
    return <NotFoundPage />;
  }

  return <MarkdownPage>{readme}</MarkdownPage>;
};

Guides.getInitialProps = async ({ query }): Promise<GuidesProps> => {
  const guideId = qsToString(query.id);
  const readme = await getGuide(guideId);

  return { guideId, readme };
};

export default Guides;
