import { useCallback, HTMLAttributes, useState } from "react";
import Router from "next/router";

type MouseEventHandler = React.MouseEventHandler<HTMLAnchorElement>;
type KeyboardEventHandler = React.KeyboardEventHandler<HTMLAnchorElement>;

export function useLinkMousePrefetch(
  href: string,
  disabled: boolean = false,
  onMouseEnter?: MouseEventHandler
): MouseEventHandler {
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
  onKeyUp?: KeyboardEventHandler
): KeyboardEventHandler {
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

interface ReturnValue {
  onMouseEnter: MouseEventHandler;
  onKeyUp: KeyboardEventHandler;
}

export default function useLinkPrefetch({
  href,
  disabled = false,
  onMouseEnter,
  onKeyUp,
}: LinkPrefetchConfig): ReturnValue {
  return {
    onMouseEnter: useLinkMousePrefetch(href, disabled, onMouseEnter),
    onKeyUp: useLinkKeyboardPrefetch(href, disabled, onKeyUp),
  };
}
