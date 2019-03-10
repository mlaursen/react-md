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

export type RippleEventType = "mouse" | "touch" | "keyboard" | "programmatic";
export type RippleableEvent =
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>;

export interface RippleConfig {
  startTime: number;
  style: CSSProperties & {
    left: number;
    top: number;
    height: number;
    width: number;
  };
  type: RippleEventType;
  holding: boolean;
  exiting: boolean;
}

export type RippleSetter = Dispatch<SetStateAction<RippleConfig[]>>;

export type MergableRippleHandlers<E extends HTMLElement = HTMLElement> = Pick<
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

export interface RipplesOptions<E extends HTMLElement = HTMLElement> {
  handlers?: MergableRippleHandlers<E>;
  type?: string;
  disabled?: boolean;
  disableRipple?: boolean;
  disableProgrammaticRipple?: boolean;
  disableSpacebarClick?: boolean;
  rippleClassName?: string;
  rippleContainerClassName?: string;
  rippleTimeout?: TransitionTimeout;
  rippleClassNames?: CSSTransitionClassNames;
}
