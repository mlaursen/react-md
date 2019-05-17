import React, {
  createContext,
  ReactNode,
  FunctionComponent,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useTimeout } from "@react-md/utils";

/**
 * This is a private hook that is used to cache and update the tooltip
 * delay context state when needed.
 *
 * @param defaultDelay The default delay to use for all tooltips
 * @return the tooltip delay state
 */
export function useTooltipDelayState(
  defaultDelay: number,
  delayTimeout: number
) {
  const [delay, setDelay] = useState(defaultDelay);
  const delayRef = useRef(delay);
  useEffect(() => {
    delayRef.current = delay;
  });

  const disable = useCallback(() => {
    if (delayRef.current === 0) {
      setDelay(defaultDelay);
    }
  }, [defaultDelay]);
  const { start, stop } = useTimeout(disable, delayTimeout);
  const startTimer = useCallback(() => {
    start();
  }, []);
  const enable = useCallback(() => {
    stop();
    if (delayRef.current !== 0) {
      setDelay(0);
    }
  }, []);

  return {
    delay,
    enable,
    disable,
    startTimer,
  };
}

const DelayContext = createContext(1000);
const DelayActionsContext = createContext({
  enable: () => {},
  disable: () => {},
  startTimer: () => {},
});

interface TooltipDelayConfigProps {
  children: ReactNode;
  delayTimeout?: number;
  defaultDelay?: number;
}

type DefaultProps = Required<
  Pick<TooltipDelayConfigProps, "defaultDelay" | "delayTimeout">
>;
type WithDefaultProps = TooltipDelayConfigProps & DefaultProps;

export const TooltipDelayConfig: FunctionComponent<
  TooltipDelayConfigProps
> = props => {
  const { defaultDelay, delayTimeout, children } = props as WithDefaultProps;
  const { delay, enable, disable, startTimer } = useTooltipDelayState(
    defaultDelay,
    delayTimeout
  );
  const actions = useMemo(
    () => ({
      enable,
      disable,
      startTimer,
    }),
    [enable, disable, startTimer]
  );

  return (
    <DelayContext.Provider value={delay}>
      <DelayActionsContext.Provider value={actions}>
        {children}
      </DelayActionsContext.Provider>
    </DelayContext.Provider>
  );
};

const defaultProps: DefaultProps = {
  delayTimeout: 5000,
  defaultDelay: 1000,
};

TooltipDelayConfig.defaultProps = defaultProps;

export function useTooltipDelayContext() {
  return useContext(DelayContext);
}

export function useTooltipDelayActions() {
  return useContext(DelayActionsContext);
}
