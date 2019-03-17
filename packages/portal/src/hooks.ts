import { useState, useEffect } from "react";

import { PortalProps, StaggerablePortalProps } from "./types.d";

function getContainer({ into, intoId }: PortalProps) {
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

/**
 * This is an internal hook that will set the portal's container and validate that the portal
 * target is valid in dev mode.
 * @private
 */
export function usePortalState(props: PortalProps) {
  const { visible, into, intoId } = props;
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(visible ? getContainer(props) : null);
  }, [visible, into, intoId]);

  return container;
}

/**
 * This hook allows you to stagger the visibility of a portal so that it will stay visible
 * until an exit animation has finished. This relies on the react-transition-group onExited
 * hook to work.
 *
 * @param visible - Boolean if the main component should be visible. This will trigger the staggered
 * animation in or out
 * @param onExited - An optional onExited callback
 * @return an object containing a boolean if the portal is visible as well as a merged `onExited` callback
 * to apply to the react-transition-group child that is animating.
 */
export function useStaggeredVisibility({
  visible,
  onExited,
}: StaggerablePortalProps) {
  const [portalVisible, setPortalVisible] = useState(visible);

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
