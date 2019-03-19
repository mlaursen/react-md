import { useCallback, HTMLAttributes, useState } from "react";
import Router from "next/router";

export function useLinkMousePrefetch(
  href: string,
  disabled: boolean = false,
  onMouseEnter?: HTMLAttributes<HTMLAnchorElement>["onMouseEnter"]
) {
  const [fetched, setFetched] = useState(false);
  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onMouseEnter) {
        onMouseEnter(event);
      }

      if (disabled || fetched) {
        return;
      }

      const { currentTarget } = event;
      const { origin } = window.location;
      if (currentTarget.href.startsWith(origin)) {
        Router.prefetch(href);
        setFetched(true);
      }
    },
    [href, onMouseEnter, disabled, fetched]
  );
}

export function useLinkKeyboardPrefetch(
  href: string,
  disabled: boolean = false,
  onKeyUp?: HTMLAttributes<HTMLAnchorElement>["onKeyUp"]
) {
  const [fetched, setFetched] = useState(false);
  return useCallback(
    (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (onKeyUp) {
        onKeyUp(event);
      }

      if (
        disabled ||
        fetched ||
        !["Tab", "ArrowDown", "ArrowUp"].includes(event.key)
      ) {
        return;
      }

      const { currentTarget } = event;
      const { origin } = window.location;
      if (currentTarget.href.startsWith(origin)) {
        Router.prefetch(href);
        setFetched(true);
      }
    },
    [href, onKeyUp, disabled, fetched]
  );
}

export interface LinkPrefetchConfig
  extends Pick<HTMLAttributes<HTMLAnchorElement>, "onMouseEnter" | "onKeyUp"> {
  href: string;
  disabled?: boolean;
}

export default function useLinkPrefetch({
  href,
  disabled = false,
  onMouseEnter,
  onKeyUp,
}: LinkPrefetchConfig) {
  return {
    onMouseEnter: useLinkMousePrefetch(href, disabled, onMouseEnter),
    onKeyUp: useLinkKeyboardPrefetch(href, disabled, onKeyUp),
  };
}
