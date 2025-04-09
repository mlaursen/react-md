import { type ReactElement } from "react";

import { AlgoliaFooter } from "./AlgoliaFooter.jsx";
import { NotYetSearched } from "./NotYetSearched.jsx";
import { SearchButtonContents } from "./SearchButtonContents.jsx";
import { WebsiteSearchContainer } from "./WebsiteSearchContainer.jsx";

export function WebsiteSearch(): ReactElement {
  return (
    <WebsiteSearchContainer
      footer={<AlgoliaFooter />}
      unsearched={<NotYetSearched />}
      buttonChildren={<SearchButtonContents />}
    />
  );
}
