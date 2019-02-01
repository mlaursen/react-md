import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  HTMLAttributes,
  ReactNode,
} from "react";
import {
  TransitionTimeout,
  CSSTransitionClassNames,
} from "@react-md/transition";
export type RippleTrigger = "mouse" | "touch" | "keyboard" | "programmatic";
export type RippleEvent =
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>;

export interface IRipple {
  startTime: number;
  style: CSSProperties & {
    left: number;
    top: number;
    height: number;
    width: number;
  };
  type: RippleTrigger;
  holding: boolean;
  exiting: boolean;
}

export type RippleSetter = Dispatch<SetStateAction<IRipple[]>>;

export type MergableRippleHandlers<
  E extends HTMLElement = HTMLEmbedElement
> = Pick<
  HTMLAttributes<E>,
  | "onKeyDown"
  | "onKeyUp"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onClick"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
>;

export interface IRipplesOptions<E extends HTMLElement = HTMLElement>
  extends MergableRippleHandlers<E> {
  type?: string;
  disabled?: boolean;
  disableRipple?: boolean;
  disableProgrammaticRipple?: boolean;
  rippleClassName?: string;
  rippleContainerClassName?: string;
  rippleTimeout?: TransitionTimeout;
  rippleClassNames?: CSSTransitionClassNames;
}

export interface IWithRipples {
  ripples: ReactNode;
}
