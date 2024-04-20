"use client";
import { LinkUnstyled } from "@/components/LinkUnstyled.jsx";
import { cssUtils } from "@react-md/core/cssUtils";
import { ListItemLink } from "@react-md/core/list/ListItemLink";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactElement, type ReactNode } from "react";
import styles from "./SimpleNavItem.module.scss";

export interface SimpleNavItemProps {
  href: string;
  active?: boolean;
  children: ReactNode;
  leftAddon: ReactNode;
}

export function SimpleNavItem(props: SimpleNavItemProps): ReactElement {
  const { href, active: propActive, children, leftAddon } = props;
  const pathname = usePathname();
  const active = propActive ?? href === pathname;

  return (
    <ListItemLink
      as={LinkUnstyled}
      href={href}
      className={cnb(
        styles.link,
        active && styles.active,
        active && cssUtils({ fontWeight: "bold" })
      )}
      leftAddon={leftAddon}
    >
      {children}
    </ListItemLink>
  );
}
