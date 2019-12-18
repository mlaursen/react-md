import React from "react";
import { NextFC } from "next";

import { TYPESCRIPT_PACKAGES } from "constants/packages";
import NotFoundPage from "components/NotFoundPage";
import APIInProgress from "components/InProgress/API";
import { qsToString } from "utils/routes";

interface APIProps {
  typedoc: {} | null;
}

const API: NextFC<APIProps> = ({ typedoc }) =>
  typedoc === null ? <NotFoundPage /> : <APIInProgress />;

API.getInitialProps = async ({ query }): Promise<APIProps> => {
  const name = qsToString(query.id);
  const typedoc = TYPESCRIPT_PACKAGES.includes(name) ? {} : null;
  // const typedoc = await import(`../../../typedocs/${query.id}`)
  //   .then(mod => mod.default)
  //   .catch(() => null);

  return { typedoc };
};

export default API;
