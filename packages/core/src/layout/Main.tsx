"use client";
import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { forwardRef } from "react";
import { useEnsuredId } from "../useEnsuredId.js";
import type { MainClassNameOptions } from "./mainStyles.js";
import { main } from "./mainStyles.js";
import { useMainTabIndex } from "./useMainTabIndex.js";

/**
 * @remarks \@since 6.0.0
 */
export type CustomMainElement = ElementType<
  HTMLAttributes<HTMLElement> & {
    ref: Ref<HTMLElement>;
    className?: string;
    tabIndex?: number;
  }
>;

/**
 * @remarks \@since 6.0.0
 */
export interface MainProps
  extends HTMLAttributes<HTMLElement>,
    MainClassNameOptions {
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
 * @example
 * Styles Only
 * ```tsx
 * import { main as mainStyles } from "@react-md/core":
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
 * @remarks \@since 6.0.0 Renamed from `LayoutMain` removed a lot of
 * functionality to keep this component simple.
 */
export const Main = forwardRef<HTMLElement, MainProps>(
  function Main(props, ref) {
    const {
      as: Component = "main",
      id: propId,
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
);
