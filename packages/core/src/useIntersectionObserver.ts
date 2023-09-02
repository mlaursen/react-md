"use client";
import type { Ref, RefCallback, RefObject } from "react";
import { useEffect } from "react";
import { useEnsuredRef } from "./useEnsuredRef.js";

/** @remarks \@since 6.0.0 */
export type IntersectionObserverRoot = IntersectionObserverInit["root"];
/** @remarks \@since 6.0.0 */
export type IntersectionObserverThreshold =
  IntersectionObserverInit["threshold"];
/** @remarks \@since 6.0.0 */
export type IntersectionObserverRootMargin =
  IntersectionObserverInit["rootMargin"];

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_options}
 * @remarks \@since 6.0.0
 */
export interface BaseIntersectionObserverHookOptions {
  /**
   * This is the same as the normal `root` for an IntersectionObserverInit, but
   * also supports refs.
   */
  root?: RefObject<IntersectionObserverRoot> | IntersectionObserverRoot;

  /**
   * Set this to `true` if the intersection observer behavior should be
   * disabled.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * **When using a list of thresholds, they must either be defined outside of
   * the component or wrapped in a `useMemo` to prevent the IntersectionObserver
   * from being re-created each render.**
   *
   * @example
   * Moving Out of Render
   * ```tsx
   * const threshold = [0, 0.25, 0.5, 0.75, 1];
   *
   * function Example() {
   *   const targetRef = useIntersectionObserver({
   *     threshold,
   *     onUpdate: useCallback(([entry]) => {
   *       // do something
   *     }, []),
   *   })
   * }
   * ```
   *
   * @example
   * Wrapping in useMemo
   * ```tsx
   * interface ExampleProps {
   *   min: number;
   *   max: number;
   * }
   *
   * function Example({ min, max }: ExampleProps): ReactElement {
   *   const targetRef = useIntersectionObserver({
   *     threshold: useMemo(() => [min, max], [min, max]),
   *     onUpdate: useCallback(([entry]) => {
   *       // do something
   *     }, []),
   *   });
   * }
   * ```
   *
   * @see {@link getThreshold}
   */
  threshold?: IntersectionObserverThreshold;

  /** @see {@link getRootMargin} */
  rootMargin?: IntersectionObserverRootMargin;

  /**
   * **Must be wrapped in `useCallback` to prevent re-creating the
   * IntersectionObserver each render.**
   *
   * This can be used to dynamically generate the {@link threshold} which is
   * generally useful if you need access to the DOM or do some expensive
   * computation.
   *
   * @example
   * Simple Example
   * ```tsx
   * const targetRef = useIntersectionObserver({
   *   getThreshold: useCallback(() => {
   *     // pretend some expensive computation
   *     return [0, 0.25, 0.5, 0.75, 1];
   *   }, []),
   *   OnUpdate: useCallback(() => {
   *     // do something
   *   }, []),
   * });
   * ```
   *
   * If this option is provided, {@link threshold}'s value will be ignored.
   */
  getThreshold?(): IntersectionObserverThreshold;

  /**
   * **Must be wrapped in `useCallback` to prevent re-creating the
   * IntersectionObserver each render.**
   *
   * This can be used to dynamically generate the {@link rootMargin} which is
   * generally useful if you need access to the DOM.
   *
   * @example
   * Simple Example
   * ```tsx
   * const nodeRef = useRef<HTMLElement>();
   * const targetRef = useIntersectionObserver({
   *   getRootMargin: useCallback(() => {
   *     return `-${nodeRef.current.offsetHeight - 1}px 0px 0px`;
   *   }, []),
   *   onUpdate: useCallback(() => {
   *     // do something
   *   }, []),
   * });
   * ```
   *
   * Note: If this option is provided, {@link rootMargin} will be ignored.
   */
  getRootMargin?(): IntersectionObserverRootMargin;
}

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_options}
 * @remarks \@since 6.0.0
 */
export interface IntersectionObserverHookOptions<E extends HTMLElement>
  extends BaseIntersectionObserverHookOptions {
  /**
   * An optional ref to merge with the ref returned by this hook.
   */
  ref?: Ref<E>;

  /**
   * **Must be wrapped in `useCallback` to prevent re-creating the
   * IntersectionObserver each render.**
   *
   * @example
   * Simple Example
   * ```tsx
   * const threshold = [0, 0.25, 0.5, 0.75, 1];
   *
   * function Example(): ReactElement {
   *   const [intersecting, setIntersecting] = useState(false);
   *   const targetRef = useIntersectionObserver({
   *     threshold,
   *     onUpdate: useCallback(([entry]) {
   *       setIntersecting(entry.isIntersecting);
   *     }, []),
   *   });
   *
   *   // implementation
   * }
   * ```
   */
  onUpdate(entries: readonly IntersectionObserverEntry[]): void;

  /**
   * **Must be wrapped in `useCallback` to prevent re-creating the
   * IntersectionObserver each render.**
   *
   * If this is defined, the {@link ref} will be ignored along with the returned
   * ref.
   *
   * @example
   * Watching Queried Elements
   * ```tsx
   * function Example(): ReactElement {
   *   useIntersectionObserver({
   *     onUpdate: useCallback((entries) => {
   *       entries.forEach((entry) => {
   *         // do stuff
   *       });
   *
   *       setIntersectingIds(intersecting);
   *     }, []),
   *     getTargets: useCallback(() => {
   *       return document.querySelectorAll('h1, h2, h3, h4, h5, h6');
   *     }, []),
   *   }),
   *
   *   return <div {...props} />;
   * }
   * ```
   */
  getTargets?(): readonly Element[];
}

/**
 * @example
 * Simple Example
 * ```tsx
 * // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#a_simple_example
 *
 * import { useIntersectionObserver } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * import styles from "./Example.module.scss";
 *
 * const numSteps = 20;
 * const thresholds = Array.from({ length: numSteps }, (_, i) => i / numSteps);
 * thresholds.push(0);
 *
 * const INCREASING = "rgba(40, 40, 190, ratio)";
 * const DECREASING = "rgba(190, 40, 40, ratio)";
 *
 * export default function Example(): ReactElement {
 *   const [{ ratio, increasing }, setState] = useState({
 *     ratio: 0.0,
 *     increasing: true,
 *   });
 *
 *   const targetRef = useIntersectionObserver({
 *     threshold: thresholds,
 *     rootMargin: "0px",
 *     onUpdate: useCallback(([entry]) => {
 *       const { intersectionRatio } = entry;
 *       setState((prevState) => {
 *         return {
 *           ratio: intersectionRatio,
 *           increasing: intersectionRatio > prevState.ratio,
 *         };
 *       });
 *     }, []),
 *   });
 *
 *   return (
 *     <div
 *       ref={targetRef}
 *       className={styles.box}
 *       style={{
 *         backgroundColor: (increasing ? INCREASING : DECREASING).replace(
 *           "ratio",
 *           `${ratio}`
 *         ),
 *       }}
 *     >
 *       <div className={styles.vertical}>
 *         Welcome to <strong>The Box!</strong>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export function useIntersectionObserver<E extends HTMLElement>(
  options: IntersectionObserverHookOptions<E>
): RefCallback<E> {
  const {
    ref,
    root,
    disabled = false,
    onUpdate,
    threshold,
    rootMargin,
    getTargets,
    getThreshold,
    getRootMargin,
  } = options;

  const [targetNodeRef, targetRef] = useEnsuredRef(ref);

  useEffect(() => {
    const element = targetNodeRef.current;
    let targets: readonly Element[] = [];
    if (getTargets) {
      targets = getTargets();
    } else if (element) {
      targets = [element];
    }

    if (disabled || !targets.length) {
      return;
    }

    let resolvedRoot: IntersectionObserverRoot;
    if (root && "current" in root) {
      resolvedRoot = root.current;
    } else {
      resolvedRoot = root;
    }

    const options: IntersectionObserverInit = {
      root: resolvedRoot,
      threshold: (getThreshold || (() => threshold))(),
      rootMargin: (getRootMargin || (() => rootMargin))(),
    };

    // Just like the ResizeObserver, you can see performance improvements by
    // sharing a single intersection observer but I don't think it's worth the
    // effort to implement here since I'd need to:
    // - check if there is an observer with the same options
    //   - if there is, add the callback to that existing observer
    //   - if there isn't, create a new observer
    // - when cleaning up, check if there are any other existing callbacks
    //   - disconnect and remove the observer if there are none left
    const observer = new IntersectionObserver(onUpdate, options);
    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, [
    disabled,
    getRootMargin,
    getTargets,
    getThreshold,
    onUpdate,
    root,
    rootMargin,
    targetNodeRef,
    threshold,
  ]);

  return targetRef;
}
