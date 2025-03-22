import Link from "next/link.js";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import {
  type FormattedItemLink,
  type ItemReferenceLink,
} from "sassdoc-generator/types";

import { getGroupName } from "./utils.js";

export interface SassDocReferenceLinkListProps
  extends HTMLAttributes<HTMLUListElement> {
  links: readonly (ItemReferenceLink | FormattedItemLink)[] | undefined;
}

export const SassDocReferenceLinkList = forwardRef<
  HTMLUListElement,
  SassDocReferenceLinkListProps
>(function SassDocReferenceLinkList({ links, ...props }, ref) {
  if (!links?.length) {
    return null;
  }

  return (
    <ul {...props} ref={ref}>
      {links.map((link) => {
        let href: string;
        let children: ReactNode;

        if ("href" in link) {
          href = link.href;
          children = link.name || href;
        } else {
          const { name, type, group } = link;
          switch (type) {
            case "mixin":
              children = `@mixin ${name}`;
              break;
            case "function":
              children = `@function ${name}`;
              break;
            default:
              children = `$${name}`;
          }

          href = `/sassdoc/${getGroupName(group)}#${type}s-${name}`;
        }

        return (
          <li key={href}>
            <Link href={href}>{children}</Link>
          </li>
        );
      })}
    </ul>
  );
});
