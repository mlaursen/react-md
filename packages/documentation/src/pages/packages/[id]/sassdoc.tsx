import React from "react";
import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import PackageSassDoc from "components/PackageSassDoc";
import { qsToString } from "utils/routes";
import { PackageSassDoc as FoundSassDoc } from "utils/sassdoc";

interface SassDocProps {
  name: string;
  sassdoc: FoundSassDoc | null;
}

const SassDoc: NextFC<SassDocProps> = ({ name, sassdoc }) => {
  if (!sassdoc) {
    return <NotFoundPage />;
  }

  return <PackageSassDoc {...sassdoc} packageName={name} />;
};

SassDoc.getInitialProps = async ({ query }): Promise<SassDocProps> => {
  const name = qsToString(query.id);
  const sassdoc = await import(`../../../constants/sassdoc/${name}`)
    .then(mod => mod.default)
    .catch(() => null);

  return { name, sassdoc };
};

export default SassDoc;
