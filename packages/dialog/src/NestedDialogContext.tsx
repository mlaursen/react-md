/* eslint-disable react/prop-types */
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface NestedDialogContext {
  stack: string[];
  add: (dialogId: string) => void;
  remove: (dialogId: string) => void;
}

const noop = (): void => {
  // do nothing
};

const context = createContext<NestedDialogContext>({
  stack: [],
  add: noop,
  remove: noop,
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  context.displayName = "NestedDialogContext";
}

const { Provider } = context;

export interface NestedDialogContextProviderProps {
  children: ReactNode;
}

/**
 * This component is used to help with handling nested dialogs by:
 * - preventing all dialogs to be closed when the escape key is pressed
 * - hiding the overlays for dialogs that are not the top-most focus
 *
 * This should be added to the root of your app if you would like to enable this
 * feature.
 */
export function NestedDialogContextProvider({
  children,
}: NestedDialogContextProviderProps): ReactElement {
  const [stack, setStack] = useState<string[]>([]);
  const add = useCallback((dialogId: string) => {
    setStack((prevStack) => {
      /* istanbul ignore next */
      if (
        process.env.NODE_ENV !== "production" &&
        prevStack.includes(dialogId)
      ) {
        /* eslint-disable no-console */
        console.warn(
          "Tried to add a duplicate dialog id to the `NestedDialogContext`."
        );
        console.warn(
          `This means that you have two dialogs with the same id: \`${dialogId}\`.`
        );
        console.warn(
          "This should be fixed before moving to production since this will break accessibility and is technically invalid."
        );
      }

      return prevStack.concat(dialogId);
    });
  }, []);
  const remove = useCallback((dialogId: string) => {
    setStack((prevStack) => prevStack.filter((id) => id !== dialogId));
  }, []);
  const value = useMemo(() => ({ stack, add, remove }), [add, remove, stack]);

  return <Provider value={value}>{children}</Provider>;
}

/**
 * Gets the current nested dialog context. This shouldn't really be used
 * externally and is a private context hook.
 *
 * @internal
 */
export function useNestedDialogContext(): NestedDialogContext {
  return useContext(context);
}
