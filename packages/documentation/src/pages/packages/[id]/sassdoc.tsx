import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import PackageSassDoc from "components/PackageSassDoc";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";
import { PackageSassDoc as FoundSassDoc } from "utils/sassdoc";

interface SassDocProps {
  name: string;
  sassdoc: FoundSassDoc | null;
}

const getSassdoc = (name: string): Promise<FoundSassDoc | null> =>
  import(`../../../constants/sassdoc/${name}`)
    .then((mod) => mod.default)
    .catch(() => null);

const SassDoc: NextFC<SassDocProps> = ({ name, sassdoc: propSassdoc }) => {
  const sassdoc = useHotReload(name, propSassdoc, getSassdoc);
  if (!sassdoc) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "No SassDoc found. Run `yarn sassdoc` to create all SassDoc."
      );
    }

    return <NotFoundPage />;
  }

  return <PackageSassDoc {...sassdoc} packageName={name} />;
};

SassDoc.getInitialProps = async ({ query }): Promise<SassDocProps> => {
  const name = qsToString(query.id);
  const sassdoc = await getSassdoc(name);

  return { name, sassdoc };
};

export default SassDoc;
