import { useState, useEffect } from "react";

import { IPortalProps, IStaggerablePortalProps } from "./types.d";

function getContainer({ into, intoId }: IPortalProps) {
  const isDev = process.env.NODE_ENV !== "production";
  let container: HTMLElement | null = null;
  if (typeof into === "undefined" && typeof intoId === "undefined") {
    container = document.body;
  } else if (typeof intoId === "string") {
    container = document.getElementById(intoId);
    if (!container && isDev) {
      console.error(
        "Unable to find a valid HTMLElement to render a portal into with the provided id: " +
          `\`${intoId}\`. Please provide an id of an element that exists on the page ` +
          "at the time of the portal rendering, provide a valid `into` prop, or leave both " +
          "the `intoId` and `into` props `undefined` to render in the `document.body`."
      );
      console.error(new Error().stack);
    }
  } else if (typeof into === "string") {
    container = document.querySelector(into);
    if (!container && isDev) {
      console.error(
        "Unable to find a valid HTMLElement to render a portal into with the provided " +
          `querySelector: \`${into}\`. Please provide a querySelector that will return ` +
          "a valid HTMLElement on the page at the time of the portal rendering, an " +
          "HTMLElement, an id for an element on the page with `intoId`, or leave both the " +
          "`intoId` and `into` props `undefined` to render in the `document.body`."
      );
      console.error(new Error().stack);
    }
  } else if (typeof into === "function") {
    container = into();
    if (!container && isDev) {
      console.error(
        "Unable to find a valid HTMLElement to render a portal into with the provided " +
          `into function: \`${into}\`. Please return a valid HTMLElement from this ` +
          "function, switch to a querySelector, switch to a static HTMLElement, or " +
          "leave both the `intoId` and `into` props `undefined` to render in the `document.body`."
      );
      console.error(new Error().stack);
    }
  } else if (into) {
    container = into;
  }

  return container;
}

export function usePortalState(props: IPortalProps) {
  const { visible } = props;
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(visible ? getContainer(props) : null);
  }, [visible]);

  return container;
}

export function useStaggeredVisibility({
  visible,
  onExited,
}: IStaggerablePortalProps) {
  const [portalVisible, setPortalVisible] = useState(() => visible);

  useEffect(() => {
    if (visible) {
      setPortalVisible(true);
    }
  }, [visible]);

  return {
    portalVisible,
    onExited: (node: HTMLElement) => {
      if (onExited) {
        onExited(node);
      }

      setPortalVisible(false);
    },
  };
}
