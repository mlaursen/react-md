/* eslint-disable jsx-a11y/iframe-has-title */
import React, {
  IframeHTMLAttributes,
  forwardRef,
  Ref,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactElement,
} from "react";
import { cnb } from "cnbuilder";
import { applyRef } from "@react-md/utils";

export interface LazyIFrameProps
  extends IframeHTMLAttributes<HTMLIFrameElement> {
  /**
   * The src for the iframe that will only be set once the iframe is within the
   * viewport by default.
   */
  src: string;

  /**
   * An accessible title to display for the iframe. If you are using the
   * `jsx-a11y` eslint rules, omitting this would have thrown the
   * `iframe-has-title` error if omitted.
   */
  title: string;

  /**
   * Any custom options for the lazy loading behavior for the image.
   *
   * Note: If the parent compoent for the `LazyImage` is re-rendered a lot
   * before the Image is loaded, it is recommended to wrap dynamic custom
   * options in `useMemo` or create the options outside of the parent
   * component's closure.
   *
   * ```tsx
   * const options: IntersectionObserverInit = {
   *   // ...custom options
   * };
   *
   * const ParentComponent = () => {
   *   return (
   *     // ... implementation ...
   *     <LazyImage options={options} src={src} />
   *   )
   * }
   *
   * // OR with useMemo
   * const ParentComponent = () => {
   *   const options = useMemo(() => ({
   *     // ... custom options ...
   *   }));
   *
   *   return (
   *     // ... implementation ...
   *     <LazyImage options={options} src={src} />
   *   )
   * }
   * ```
   */
  options?: IntersectionObserverInit;

  /**
   * Boolean if the iframe should be responsive and fill the entire width of the
   * container element while hopefully maintaining aspect ratio.
   */
  responsive?: boolean;

  /**
   * Boolean if the lazy loading of the iframe should be disabled.
   */
  disableLazyLoad?: boolean;
}

/**
 * The `LazyIFrame` component is a wrapper for the `<iframe>` element that adds
 * some nice defaults to only load once the iframe is visible within the
 * viewport. If you want to prevent page shifting with dynamic loading, it is
 * recommended to also set the `height` and `width` props for the iframe.
 */
function LazyIFrame(
  {
    src: propSrc,
    options,
    className,
    responsive = false,
    disableLazyLoad = false,
    ...props
  }: LazyIFrameProps,
  forwardedRef?: Ref<HTMLIFrameElement>
): ReactElement {
  const [src, setSrc] = useState(disableLazyLoad ? propSrc : undefined);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const refCB = useCallback(
    (instance: HTMLIFrameElement | null) => {
      applyRef(instance, forwardedRef);
      ref.current = instance;
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (disableLazyLoad || !ref.current || src) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSrc(propSrc);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [src, disableLazyLoad, propSrc, options]);

  return (
    <iframe
      {...props}
      ref={refCB}
      src={src}
      className={cnb(
        {
          "rmd-media": responsive,
        },
        className
      )}
    />
  );
}
const ForwardedIFrame = forwardRef<HTMLIFrameElement, LazyIFrameProps>(
  LazyIFrame
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedIFrame.propTypes = {
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      options: PropTypes.shape({
        root: PropTypes.instanceOf(Element),
        rootMargin: PropTypes.string,
        threshold: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.arrayOf(PropTypes.number),
        ]),
      }),
      responsive: PropTypes.bool,
      disableLazyLoad: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedIFrame;
