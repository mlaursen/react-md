import Link from "next/link";
import { useRouter } from "next/router";
import { cnb } from "cnbuilder";
import type { CSSProperties, ReactElement, ReactNode } from "react";

import styles from "./StyledLink.module.scss";

export interface StyledLinkProps {
  style?: CSSProperties;
  href: string;
  children: ReactNode;
  target?: "_blank";
}

export function StyledLink(props: StyledLinkProps): ReactElement {
  const { href, children, target, style } = props;
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <a
        style={style}
        href={href}
        className={cnb(styles.link, pathname === href && styles.active)}
        target={target}
      >
        {children}
      </a>
    </Link>
  );
}
