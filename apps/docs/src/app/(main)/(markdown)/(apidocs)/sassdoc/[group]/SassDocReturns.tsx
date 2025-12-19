import { InlineCode } from "@react-md/code/InlineCode";
import { type ReactElement } from "react";
import {
  type ItemReturn,
  type SupportedItemDataType,
} from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.js";
import { Markdown } from "@/components/Markdown.js";
import { M_DASH } from "@/constants/unicode.js";

export interface SassDocReturnsProps {
  returns: ItemReturn<SupportedItemDataType> | undefined;
  itemId: string;
}

export function SassDocReturns({
  itemId,
  returns,
}: SassDocReturnsProps): ReactElement | null {
  if (!returns) {
    return null;
  }

  const { type, description } = returns;

  return (
    <>
      <LinkableHeading id={`${itemId}-returns`} level={3}>
        {`Returns ${M_DASH} `}
        <InlineCode>{type}</InlineCode>
      </LinkableHeading>
      {description && <Markdown source={description} />}
    </>
  );
}
