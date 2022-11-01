import type { Ref, RefCallback, RefObject } from "react";
import { useEffect, useRef } from "react";
import { useEnsuredRef } from "./useEnsuredRef";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

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
export interface IntersectionObserverOptions<E extends HTMLElement> {
  /**
   * An optional ref to merge with the ref returned by this hook.
   */
  ref?: Ref<E>;

  /**
   * This is the same as the normal `root` for an IntersectionObserverInit, but
   * also supports refs.
   *
   */
  root?: RefObject<IntersectionObserverRoot> | IntersectionObserverRoot;

  /**
   * Set this to `true` if the intersection observer behavior should be
   * disabled.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /** @see {@link getThreshold} */
  threshold?: IntersectionObserverThreshold;

  /** @see {@link getRootMargin} */
  rootMargin?: IntersectionObserverRootMargin;

  /**
   * This can be used to dynamically generate the {@link threshold} which is
   * generally useful if you need access to the DOM or do some expensive
   * computation.
   *
   * @example
   * Simple Example
   * ```tsx
   * const targetRef = useIntersectionObserver({
   *   getThreshold() {
   *     // pretend some expensive computation
   *     return [0, 0.25, 0.5, 0.75, 1];
   *   },
   *   OnUpdate() {
   *     // do something
   *   },
   * });
   * ```
   *
   * Note: If this option is provided, {@link threshold}'s value will be
   * ignored.
   */
  getThreshold?(): IntersectionObserverThreshold;

  /**
   * This can be used to dynamically generate the {@link rootMargin} which is
   * generally useful if you need access to the DOM.
   *
   * @example
   * Simple Example
   * ```tsx
   * const targetRef = useIntersectionObserver({
   *   getRootMargin() {
   *     return `-${nodeRef.current.offsetHeight - 1}px 0px 0px`;
   *   },
   *   OnUpdate() {
   *     // do something
   *   },
   * });
   * ```
   *
   * Note: If this option is provided, {@link rootMargin} will be ignored.
   */
  getRootMargin?(): IntersectionObserverRootMargin;

  /**
   * @example
   * Simple Example
   * ```tsx
   * const [intersecting, setIntersecting]
   * const targetRef = useIntersectionObserver({
   *   threshold: [0, 0.25, 0.5, 0.75, 1],
   *   onUpdate(entry) {
   *     setIntersecting(entry.isIntersecting);
   *   },
   * });
   * ```
   */
  onUpdate(entry: IntersectionObserverEntry): void;
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
 * const INCREASEING = "rgba(40, 40, 190, ratio)";
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
 *     onUpdate(entry) {
 *       const { intersectionRatio } = entry;
 *       setState((prevState) => {
 *         return {
 *           ratio: intersectionRatio,
 *           increasing: intersectionRatio > prevState.ratio,
 *         };
 *       });
 *     },
 *   });
 *
 *   return (
 *     <div
 *       ref={targetRef}
 *       className={styles.box}
 *       style={{
 *         backgroundColor: (increasing ? INCREASEING : DECREASING).replace(
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
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API}
 */
export function useIntersectionObserver<E extends HTMLElement>(
  options: IntersectionObserverOptions<E>
): RefCallback<E> {
  const {
    ref,
    root,
    disabled = false,
    onUpdate,
    threshold,
    rootMargin,
    getThreshold,
    getRootMargin,
  } = options;

  const [targetNodeRef, targetRef] = useEnsuredRef(ref);

  const configuration = useRef({
    onUpdate,
    getThreshold,
    getRootMargin,
  } as const);
  useIsomorphicLayoutEffect(() => {
    configuration.current = {
      onUpdate,
      getThreshold,
      getRootMargin,
    };
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const element = targetNodeRef.current;
    if (disabled || !element) {
      return;
    }

    const {
      onUpdate,
      getThreshold = () => threshold,
      getRootMargin = () => rootMargin,
    } = configuration.current;

    let resolvedRoot: IntersectionObserverRoot;
    if (root && "current" in root) {
      resolvedRoot = root.current;
    } else {
      resolvedRoot = root;
    }

    const options: IntersectionObserverInit = {
      root: resolvedRoot,
      threshold: getThreshold(),
      rootMargin: getRootMargin(),
    };

    const callback: IntersectionObserverCallback = ([entry]) => {
      onUpdate(entry);
    };

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;
    if (element) {
      observer.observe(element);
    }

    return () => {
      observerRef.current = null;
      observer.disconnect();
    };
  }, [disabled, root, rootMargin, targetNodeRef, threshold]);

  return targetRef;
}
