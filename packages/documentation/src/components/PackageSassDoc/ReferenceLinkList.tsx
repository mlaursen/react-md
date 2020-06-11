import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import Link from "components/Link";
import { ItemReferenceLink } from "utils/sassdoc";

import getId from "./getId";

export interface ReferenceLinkListProps {
  links: ItemReferenceLink[];
}

const getLinkProps = (
  pathname: string,
  { name, type, packageName }: ItemReferenceLink
): { href: string; as: string } => {
  const hash = `#${getId(name, type, packageName)}`;

  return {
    as: `${pathname.replace("[id]", packageName)}${hash}`,
    href: `${pathname}${hash}`,
  };
};

const ReferenceLinkList: FC<ReferenceLinkListProps> = ({ links }) => {
  const router = useRouter();
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

        return (
          <li key={id}>
            <Link {...getLinkProps(router.pathname, link)}>{children}</Link>
          </li>
        );
      })}
    </>
  );
};

export default ReferenceLinkList;
