import React, {
  createContext,
  useState,
  useEffect,
  HTMLAttributes,
  useContext,
  ReactType,
  Fragment,
  FunctionComponent,
} from "react";

export const RippleEffectContext = createContext(true);

export type RippleHandlers<E extends Element = HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onKeyDown"
>;

export interface IRippleEffectOptions<E extends Element = HTMLElement>
  extends RippleHandlers<E> {
  children?: React.ReactNode;
  disabled?: boolean;
  enabled?: boolean;

  // onTouchStart?: React.TouchEvent<HTMLElement>;
  // onTouchEnd?: React.TouchEvent<HTMLElement>;
  // onMouseDown?: React.MouseEvent<HTMLElement>;
  // onMouseUp?: React.MouseEvent<HTMLElement>;
  // onKeyDown?: React.KeyboardEvent<HTMLElement>;
}

type RippleState = ReactType<HTMLSpanElement>[];

const RippleContainer: FunctionComponent<any> = ({ children }) => (
  <span className="rmd-states-ripple-container">{children}</span>
);

function calcHypotenuse(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

function createRipple(element: HTMLElement, pageX?: number, pageY?: number) {
  const { offsetWidth, offsetHeight } = element;

  let x: number;
  let y: number;
  if (typeof pageX !== "undefined" && typeof pageY !== "undefined") {
    const rect = element.getBoundingClientRect();

    x = pageX - rect.left + window.pageXOffset;
    y = pageY - rect.top + window.pageYOffset;
  } else {
    x = offsetWidth / 2;
    y = offsetHeight / 2;
  }

  const radius = Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );

  const size = radius * 2;
  return {
    timestamp: Date.now(),
    left: x - radius,
    top: y - radius,
    height: size,
    width: size,
  };
}

export function useRippleState(props: IRippleEffectOptions) {
  const {
    disabled,
    // onTouchStart,
    // onTouchEnd,
    // onMouseDown,
    // onMouseUp,
    onKeyDown,
  } = props;
  const enabled =
    typeof props.enabled === "boolean"
      ? props.enabled
      : useContext(RippleEffectContext);

  const [ripples, setRipples] = useState<any[]>([]);
  let { children } = props;
  if (enabled) {
    // this will allow for the ripple animation to finish if the element toggles
    // to disabled
    children = (
      <Fragment>
        {children}
        <RippleContainer>{ripples}</RippleContainer>
      </Fragment>
    );
  }

  if (!enabled || disabled) {
    return {
      children,
      // onTouchStart,
      // onTouchEnd,
      // onMouseDown,
      // onMouseUp,
      onKeyDown,
    };
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.key !== " " && event.key !== "Enter") {
      return;
    }

    const { timestamp, ...style } = createRipple(event.currentTarget);
    setRipples(prevRipples =>
      prevRipples.concat([
        <span className="rmd-states-ripple" style={style} key={timestamp} />,
      ])
    );
  }

  useEffect(
    () => {
      const last = ripples[ripples.length - 1];
      if (!last) {
        return;
      }

      console.log("last:", last);
    },
    [ripples]
  );

  return {
    children,
    onKeyDown: handleKeyDown,
  };
}
