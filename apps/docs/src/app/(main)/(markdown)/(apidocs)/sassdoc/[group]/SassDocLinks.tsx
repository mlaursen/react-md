import { type ReactElement } from "react";
import {
  type FormattedItemLink,
  type ItemReferenceLink,
} from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { slug } from "@/utils/slug.js";

import { SassDocReferenceLinkList } from "./SassDocReferenceLinkList.jsx";

export interface SassDocLinksProps {
  see?: readonly ItemReferenceLink[];
  links?: readonly FormattedItemLink[];
  itemId: string;
  children: string;
}

export function SassDocLinks({
  see = [],
  links = [],
  itemId,
  children,
}: SassDocLinksProps): ReactElement | null {
  if (see.length === 0 && links.length === 0) {
    return null;
  }

  return (
    <>
      <LinkableHeading id={slug(`${itemId} ${children}`)} level={4}>
        {children}
      </LinkableHeading>
      <SassDocReferenceLinkList links={[...links, ...see]} />
    </>
  );
}
