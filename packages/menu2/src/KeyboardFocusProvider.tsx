import {
  createContext,
  ReactElement,
  ReactNode,
  Ref,
  RefCallback,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { applyRef, extractTextContent } from "@react-md/utils";

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface KeyboardFocusElementData {
  element: HTMLElement;
  content: string;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface KeyboardFocusElementLookup {
  current: KeyboardFocusElementData[];
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface KeyboardFocusContext {
  attach<E extends HTMLElement>(element: E): void;
  detach<E extends HTMLElement>(element: E): void;
  watching: KeyboardFocusElementLookup;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
const noop = (): void => {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("KeyboardFocusProvider must be a parent component.");
  }
};

/**
 * @remarks \@since 4.0.0
 * @internal
 */
const context = createContext<KeyboardFocusContext>({
  attach: noop,
  detach: noop,
  watching: { current: [] },
});
context.displayName = "KeyboardFocus";

/**
 * @remarks \@since 4.0.0
 * @internal
 */
const { Provider } = context;

/**
 * @remarks \@since 4.0.0
 */
export function useKeyboardFocusableElement<E extends HTMLElement>(
  ref?: Ref<E>
): RefCallback<E> {
  const { attach, detach } = useContext(context);
  const nodeRef = useRef<E | null>(null);

  return useCallback(
    (instance: E | null) => {
      applyRef(instance, ref);
      if (instance) {
        attach(instance);
      } else if (nodeRef.current) {
        detach(nodeRef.current);
      }

      nodeRef.current = instance;
    },
    [attach, detach, ref]
  );
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function useKeyboardFocusableElements(): KeyboardFocusElementLookup {
  return useContext(context).watching;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface KeyboardFocusProviderProps {
  children: ReactNode;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function KeyboardFocusProvider({
  children,
}: KeyboardFocusProviderProps): ReactElement {
  const watching = useRef<KeyboardFocusElementData[]>([]);
  const value = useMemo<KeyboardFocusContext>(
    () => ({
      attach(element) {
        watching.current.push({
          element,
          content: extractTextContent(element),
        });
      },
      detach(element) {
        watching.current = watching.current.filter(
          (cache) => cache.element !== element
        );
      },
      watching,
    }),
    []
  );

  return <Provider value={value}>{children}</Provider>;
}
