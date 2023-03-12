import { Dialog, useAppSize } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import styles from "./HowToUse.module.scss";
import { HowToUseIcon } from "./HowToUseIcon";
import type { MaterialIconAndSymbolName } from "./metadata";

interface State {
  iconName: MaterialIconAndSymbolName;
  visible: boolean;
}

export interface HowToUseContext extends State {
  selectIcon(iconName: MaterialIconAndSymbolName): void;
}

const context = createContext<HowToUseContext | undefined>(undefined);
const { Provider } = context;

export function useHowToUseIcon(): HowToUseContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface HowToUseProps {
  children: ReactNode;
}

export function HowToUse(props: HowToUseProps): ReactElement {
  const { children } = props;

  const [state, setState] = useState<State>({
    iconName: "123",
    visible: false,
  });
  const { iconName, visible } = state;
  const { isPhone } = useAppSize();

  const context = useMemo<HowToUseContext>(
    () => ({
      iconName,
      visible,
      selectIcon(iconName) {
        setState({ iconName, visible: true });
      },
    }),
    [iconName, visible]
  );
  const onRequestClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, visible: false }));
  }, []);

  return (
    <Provider value={context}>
      <Dialog
        aria-labelledby="how-to-use-title"
        visible={visible}
        onRequestClose={onRequestClose}
        className={cnb(!isPhone && styles.dialog)}
        type={isPhone ? "full-page" : "centered"}
      >
        <HowToUseIcon iconName={iconName} onRequestClose={onRequestClose} />
      </Dialog>
      {children}
    </Provider>
  );
}
