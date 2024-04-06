"use client";
import {
  Tooltip,
  button,
  cssUtils,
  useElementInteraction,
  useTooltip,
} from "react-md";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { useEffect, useRef, type ReactElement, type ReactNode } from "react";
import { LinkUnstyled, type LinkUnstyledProps } from "../LinkUnstyled.jsx";
import styles from "./NavigationItemLink.module.scss";

export interface NavigationItemLinkProps extends LinkUnstyledProps {
  leftAddon?: ReactNode;
}

export function NavigationItemLink(
  props: NavigationItemLinkProps
): ReactElement {
  const { href, children, leftAddon } = props;

  const pathname = usePathname();
  const active = href === pathname;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { handlers, ripples } = useElementInteraction();
  const { elementProps, tooltipProps, overflowRef } = useTooltip({
    ...handlers,
    defaultPosition: "right",
    overflowOnly: true,
  });

  useEffect(() => {
    const link = linkRef.current;
    if (!active || !link || document.activeElement === link) {
      return;
    }

    link.scrollIntoView({ block: "center" });
  }, [active]);
  return (
    <li>
      <LinkUnstyled
        {...handlers}
        {...elementProps}
        ref={linkRef}
        href={href}
        className={cnb(
          button(),
          styles.link,
          active && styles.active,
          !!leftAddon && styles.addon,
          cssUtils({
            fontWeight: active ? "bold" : undefined,
            textDecoration: "none",
          })
        )}
      >
        {leftAddon}
        <span
          ref={overflowRef}
          className={cssUtils({ textOverflow: "ellipsis" })}
        >
          {children}
        </span>
        {ripples}
        <Tooltip {...tooltipProps}>{children}</Tooltip>
      </LinkUnstyled>
    </li>
  );
}
