"use client";
import {
  Tooltip,
  button,
  cssUtils,
  useElementInteraction,
  useOverflowTooltip,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactNode, type ReactElement } from "react";
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
  const { handlers, ripples } = useElementInteraction();
  const { nodeRef, elementProps, tooltipProps } = useOverflowTooltip({
    ...handlers,
    defaultPosition: "right",
  });
  return (
    <li>
      <LinkUnstyled
        {...handlers}
        {...elementProps}
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
        <span ref={nodeRef} className={cssUtils({ textOverflow: "ellipsis" })}>
          {children}
        </span>
        {ripples}
        <Tooltip {...tooltipProps}>{children}</Tooltip>
      </LinkUnstyled>
    </li>
  );
}
