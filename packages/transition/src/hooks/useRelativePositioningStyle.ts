import { CSSProperties, useCallback, useRef, useEffect, useState } from "react";
import { Maybe, PositionOptions, positionRelativeTo } from "@react-md/utils";

import { TransitionProps, TransitionEnterHandler } from "../types.d";

export interface RelativePositioningStyleOptions
  extends PositionOptions,
    Pick<TransitionProps, "onEnter" | "onEntering" | "onEntered"> {
  style?: CSSProperties;
  fixedTo: Maybe<HTMLElement> | (() => Maybe<HTMLElement>);
}

export default function useRelativePositioningStyle({
  style: propStyle,
  fixedTo,
  onEnter,
  onEntering,
  onEntered,
  ...options
}: RelativePositioningStyleOptions) {
  fixedTo = typeof fixedTo === "function" ? fixedTo() : fixedTo;
  const [style, setStyle] = useState(propStyle);
  const optionsRef = useRef<PositionOptions>(options);
  const fixedToRef = useRef<Maybe<HTMLElement>>(fixedTo);

  const handleEnter = useCallback<TransitionEnterHandler>(
    (node, isAppearing) => {
      if (onEnter) {
        onEnter(node, isAppearing);
      }

      setStyle(
        positionRelativeTo(fixedToRef.current, node, optionsRef.current)
      );
    },
    [onEnter]
  );

  const handleEntering = useCallback<TransitionEnterHandler>(
    (node, isAppearing) => {
      if (onEntering) {
        onEntering(node, isAppearing);
      }

      setStyle(
        positionRelativeTo(fixedToRef.current, node, optionsRef.current)
      );
    },
    [onEntering]
  );

  const handleEntered = useCallback<TransitionEnterHandler>(
    (node, isAppearing) => {
      if (onEntered) {
        onEntered(node, isAppearing);
      }

      setStyle(
        positionRelativeTo(fixedToRef.current, node, optionsRef.current)
      );
    },
    [onEntered]
  );

  useEffect(() => {
    optionsRef.current = options;
    fixedToRef.current = typeof fixedTo === "function" ? fixedTo() : fixedTo;
  });

  return {
    style,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
  };
}
