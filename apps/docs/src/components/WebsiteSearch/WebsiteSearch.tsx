import { type ReactElement } from "react";

import { AlgoliaFooter } from "./AlgoliaFooter.js";
import { NotYetSearched } from "./NotYetSearched.js";
import { SearchButtonContents } from "./SearchButtonContents.js";
import { WebsiteSearchContainer } from "./WebsiteSearchContainer.js";

export function WebsiteSearch(): ReactElement {
  return (
    <WebsiteSearchContainer
      footer={<AlgoliaFooter />}
      unsearched={<NotYetSearched />}
      buttonChildren={<SearchButtonContents />}
    />
  );
}
