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
import { type ReactElement } from "react";
import { LinkUnstyled, type LinkUnstyledProps } from "../LinkUnstyled.jsx";
import styles from "./NavigationItemLink.module.scss";

export function NavigationItemLink(props: LinkUnstyledProps): ReactElement {
  const { href, children } = props;

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
          cssUtils({
            fontWeight: active ? "bold" : undefined,
            textDecoration: "none",
          })
        )}
      >
        <span ref={nodeRef} className={cssUtils({ textOverflow: "ellipsis" })}>
          {children}
        </span>
        {ripples}
        <Tooltip {...tooltipProps}>{children}</Tooltip>
      </LinkUnstyled>
    </li>
  );
}
