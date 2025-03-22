import { type ReactElement } from "react";
import { type ItemThrows } from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { Markdown } from "@/components/Markdown.jsx";

export interface SassDocThrowsProps {
  itemId: string;
  throws: Readonly<ItemThrows> | undefined;
}

export function SassDocThrows({
  itemId,
  throws,
}: SassDocThrowsProps): ReactElement | null {
  if (!throws?.length) {
    return null;
  }

  return (
    <>
      <LinkableHeading id={`${itemId}-throws`} level={3}>
        Throws
      </LinkableHeading>
      <ul>
        {throws.map((message) => {
          return (
            <li key={message}>
              <Markdown source={message} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
