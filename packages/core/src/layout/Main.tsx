"use client";

import {
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { useEnsuredId } from "../useEnsuredId.js";
import { type MainClassNameOptions, main } from "./mainStyles.js";
import { useMainTabIndex } from "./useMainTabIndex.js";

/**
 * @since 6.0.0
 */
export type CustomMainElement = ElementType<
  HTMLAttributes<HTMLElement> & {
    ref?: Ref<HTMLElement>;
    className?: string;
    tabIndex?: number;
  }
>;

/**
 * @since 6.0.0
 */
export interface MainProps
  extends HTMLAttributes<HTMLElement>, MainClassNameOptions {
  ref?: Ref<HTMLElement>;

  /**
   * @defaultValue `"main"`
   */
  as?: CustomMainElement;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component is really only used to dynamically set the `tabIndex` to `-1`
 * while using a keyboard for the `SkipToMainContent` component's focus behavior
 * to work correctly. If you don't need that functionality, use the {@link main}
 * style utility instead.
 *
 * @example Styles Only
 * ```tsx
 * import { main as mainStyles } from "@react-md/core/layout/mainStyles":
 *
 * function MyCustomMainElement({ children }) {
 *   return (
 *     <main
 *       className={mainStyles({
 *         navOffset: true,
 *         appBarOffset: true,
 *       })}
 *     >
 *       {children}
 *     </main>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/getting-started/layout | Layout Demos}
 * @since 6.0.0 Renamed from `LayoutMain` removed a lot of
 * functionality to keep this component simple.
 */
export function Main(props: MainProps): ReactElement {
  const {
    as: Component = "main",
    id: propId,
    ref,
    className,
    children,
    tabIndex: propTabIndex,
    navOffset,
    appBarOffset,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "main");
  const tabIndex = useMainTabIndex(propTabIndex);

  return (
    <Component
      {...remaining}
      id={id}
      ref={ref}
      className={main({ navOffset, appBarOffset, className })}
      tabIndex={tabIndex}
    >
      {children}
    </Component>
  );
}
