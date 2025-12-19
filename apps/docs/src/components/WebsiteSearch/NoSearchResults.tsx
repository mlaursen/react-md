import { InlineCode } from "@react-md/code/InlineCode";
import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { RandomEmoji } from "../RandomEmoji.js";

export interface NoSearchResultsProps {
  query: string;
}

export function NoSearchResults({
  query,
}: Readonly<NoSearchResultsProps>): ReactElement {
  return (
    <>
      <Box stacked>
        <Typography type="headline-1" as="div">
          <RandomEmoji inheritFont />
        </Typography>
        <Typography type="headline-5" as="p" margin="none">
          No search results found for: <InlineCode>{query}</InlineCode>
        </Typography>
      </Box>
    </>
  );
}
