import { useAppSize, useToggle } from "@react-md/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

const noop = (): void => {
  // do nothing
};

export interface PhoneEmulatorContext {
  showPhone(): void;
  closePhone(): void;
  isPhoneOpen: boolean;
}

const context = createContext<PhoneEmulatorContext>({
  showPhone: noop,
  closePhone: noop,
  isPhoneOpen: false,
});
context.displayName = "PhoneEmulator";

export const { Provider: PhoneEmulatorProvider } = context;

export function usePhoneEmulator(): Readonly<PhoneEmulatorContext> {
  return useContext(context);
}

export interface PhoneEmulatorProviderOptions {
  onPhoneClose?(): void;
}

export interface PhoneEmulatorProviderImplementation {
  isPhone: boolean;
  emulatorContext: PhoneEmulatorContext;
}

export function usePhoneEmulatorProvider(
  options: PhoneEmulatorProviderOptions
): PhoneEmulatorProviderImplementation {
  const { onPhoneClose = noop } = options;

  const { isPhone } = useAppSize();
  const {
    toggled: isPhoneOpen,
    enable: showPhone,
    disable: close,
  } = useToggle(false);
  const closePhone = useCallback(() => {
    onPhoneClose();
    close();
  }, [close, onPhoneClose]);
  const value = useMemo<PhoneEmulatorContext>(
    () => ({
      showPhone,
      closePhone,
      isPhoneOpen,
    }),
    [closePhone, isPhoneOpen, showPhone]
  );

  useEffect(() => {
    if (isPhoneOpen && !isPhone) {
      close();
    }
  }, [close, isPhone, isPhoneOpen]);

  return {
    isPhone,
    emulatorContext: value,
  };
}
