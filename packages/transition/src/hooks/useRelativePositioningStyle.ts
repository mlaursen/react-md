import { CSSProperties, useCallback, useRef, useEffect, useState } from "react";
import { Maybe, IPositionOptions, positionRelativeTo } from "@react-md/utils";

import { ITransitionProps, TransitionEnterHandler } from "../types.d";

export interface IRelativePositioningStyleOptions
  extends IPositionOptions,
    Pick<ITransitionProps, "onEnter" | "onEntering" | "onEntered"> {
  style?: CSSProperties;
  fixedTo: Maybe<HTMLElement>;
}

export default function useRelativePositioningStyle({
  style: propStyle,
  fixedTo,
  onEnter,
  onEntering,
  onEntered,
  ...options
}: IRelativePositioningStyleOptions) {
  const [style, setStyle] = useState(propStyle);
  const optionsRef = useRef<IPositionOptions>(options);
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
    fixedToRef.current = fixedTo;
  });

  return {
    style,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
  };
}
