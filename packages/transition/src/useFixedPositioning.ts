import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import { FixedPositionOptions, getFixedPosition, Omit } from "@react-md/utils";

type FixedToFunction = () => HTMLElement | null;
type FixedTo = string | HTMLElement | null | FixedToFunction;
type OptionalFixedPositionOptions = Omit<
  FixedPositionOptions,
  "container" | "element"
>;

interface FixedPositioningOptions
  extends OptionalFixedPositionOptions,
    Pick<TransitionProps, "onEnter" | "onEntering" | "onEntered" | "onExited"> {
  fixedTo: FixedTo;
  getOptions?: (node: HTMLElement) => OptionalFixedPositionOptions;
}

function getFixedTo(fixedTo: FixedTo) {
  if (!fixedTo) {
    return null;
  }

  const t = typeof fixedTo;
  switch (t) {
    case "string":
      fixedTo = fixedTo as string;
      return (
        document.getElementById(fixedTo) ||
        document.querySelector<HTMLElement>(fixedTo)
      );
    case "function":
      return (fixedTo as FixedToFunction)();
    default:
      return fixedTo as HTMLElement;
  }
}

export default function useFixedPositioning({
  onEnter,
  onEntering,
  onEntered,
  onExited,
  fixedTo,
  getOptions,
  ...remainingOptions
}: FixedPositioningOptions) {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const handlers = useRef({ onEnter, onEntering, onEntered, onExited });
  const options = useRef({
    fixedTo,
    getOptions,
    ...remainingOptions,
  });
  useEffect(() => {
    handlers.current = {
      onEnter,
      onEntering,
      onEntered,
      onExited,
    };

    options.current = {
      fixedTo,
      getOptions,
      ...remainingOptions,
    };
  });

  const element = useRef<HTMLElement | null>(null);

  const updateStyle = useCallback(() => {
    const node = element.current;
    if (!node) {
      return;
    }

    const { fixedTo, getOptions, ...remaining } = options.current;
    const opts = {
      ...remaining,
      ...(typeof getOptions === "function" ? getOptions(node) : undefined),
    };

    const { style } = getFixedPosition({
      container: getFixedTo(fixedTo),
      element: node,
      ...opts,
    });

    setStyle(style);
  }, []);

  const updateNodeAndStyle = useCallback((node: HTMLElement) => {
    element.current = node;
    updateStyle();
  }, []);

  const handleEnter = useCallback((node: HTMLElement, appear: boolean) => {
    const { onEnter } = handlers.current;
    if (onEnter) {
      onEnter(node, appear);
    }

    updateNodeAndStyle(node);
  }, []);

  const handleEntering = useCallback((node: HTMLElement, appear: boolean) => {
    const { onEntering } = handlers.current;
    if (onEntering) {
      onEntering(node, appear);
    }

    updateNodeAndStyle(node);
  }, []);

  const handleEntered = useCallback((node: HTMLElement, appear: boolean) => {
    const { onEntered } = handlers.current;
    if (onEntered) {
      onEntered(node, appear);
    }

    updateNodeAndStyle(node);
  }, []);

  const handleExited = useCallback((node: HTMLElement) => {
    const { onExited } = handlers.current;
    if (onExited) {
      onExited(node);
    }

    element.current = null;
  }, []);

  useEffect(() => {
    if (!element.current) {
      return;
    }

    window.addEventListener("scroll", updateStyle, true);
    window.addEventListener("resize", updateStyle, true);
    return () => {
      window.removeEventListener("scroll", updateStyle, true);
      window.removeEventListener("resize", updateStyle, true);
    };
  }, [element.current]);

  return {
    style,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExited: handleExited,
  };
}
