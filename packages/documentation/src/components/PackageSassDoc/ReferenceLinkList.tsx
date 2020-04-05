import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import Link from "components/Link";
import { ItemReferenceLink } from "utils/sassdoc";

import getId from "./getId";

export interface ReferenceLinkListProps {
  links: ItemReferenceLink[];
}

const getHref = (
  pathname: string,
  { name, type, packageName }: ItemReferenceLink
): string => {
  return `${pathname.replace("[id]", packageName)}#${getId(
    name,
    type,
    packageName
  )}`;
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
            children = `[Mixin] - ${name}`;
            break;
          case "function":
            children = `[Function] - ${name}`;
            break;
          default:
            children = `$${name}`;
        }

        return (
          <li key={id}>
            <Link href={getHref(router.pathname, link)}>{children}</Link>
          </li>
        );
      })}
    </>
  );
};

export default ReferenceLinkList;
