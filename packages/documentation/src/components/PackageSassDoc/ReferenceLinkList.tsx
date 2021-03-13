import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

import Link from "components/Link";
import { ItemReferenceLink } from "utils/sassdoc";

import getId from "./getId";

export interface ReferenceLinkListProps {
  links: ItemReferenceLink[];
}

export default function ReferenceLinkList({
  links,
}: ReferenceLinkListProps): ReactElement {
  const { pathname } = useRouter();
  return (
    <>
      {links.map((link) => {
        const { name, type, packageName } = link;
        const id = getId(name, type, packageName);

        let children: ReactNode;
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
        const href = `${pathname.replace("[id]", packageName)}#${getId(
          name,
          type,
          packageName
        )}`;

        return (
          <li key={id}>
            <Link href={href}>{children}</Link>
          </li>
        );
      })}
    </>
  );
}
