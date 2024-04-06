"use client";
import {
  LinkUnstyled,
  type LinkUnstyledProps,
} from "@/components/LinkUnstyled.jsx";
import { button } from "@react-md/core/button/buttonStyles";
import { cssUtils } from "@react-md/core/cssUtils";
import { useElementInteraction } from "@react-md/core/interaction/useElementInteraction";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { useEffect, useRef, type ReactElement, type ReactNode } from "react";
import styles from "./MainNavigationLink.module.scss";

export interface MainNavigationLinkProps extends LinkUnstyledProps {
  leftAddon?: ReactNode;
}

export function MainNavigationLink({
  href,
  children,
  leftAddon,
}: MainNavigationLinkProps): ReactElement {
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
