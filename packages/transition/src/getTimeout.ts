import { TransitionTimeout } from "./types";

/**
 * @internal
 */
export interface DefinedTimeout {
  appear: number;
  enter: number;
  exit: number;
}

const error = (part?: keyof DefinedTimeout): never => {
  throw new RangeError(`Minimum ${part ? `${part} ` : ""}timeout allowed is 0`);
};

/**
 * @internal
 */
export function getTimeout(
  timeout: TransitionTimeout,
  appear: boolean
): DefinedTimeout {
  if (typeof timeout === "number") {
    if (timeout < 0) {
      error();
    }

    return {
      appear: appear ? timeout : 0,
      enter: timeout,
      exit: timeout,
    };
  }

  const appearTime = timeout.appear ?? ((appear && timeout.enter) || 0);
  const enter = timeout.enter ?? 0;
  const exit = timeout.exit ?? 0;
  if (appearTime < 0 && typeof timeout.appear === "number") {
    error("appear");
  }

  if (enter < 0) {
    error("enter");
  }

  if (exit < 0) {
    error("exit");
  }

  return {
    appear: appearTime,
    enter,
    exit,
  };
}
