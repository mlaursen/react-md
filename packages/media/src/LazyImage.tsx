import React, {
  forwardRef,
  ImgHTMLAttributes,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { applyRef } from "@react-md/utils";

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The image's source. This will be applied to the image only once the image
   * is within the viewport by default.
   */
  src: string;

  /**
   *
   * @see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
   */
  srcSet?: string;

  /**
   *
   * @see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
   */
  sizes?: string;

  /**
   * An optional description for the image. This will be defaulted to the empty
   * string to help with presentational images, but should be defined for all
   * other images.
   */
  alt?: string;

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
   * Boolean if the image should be responsive and fill the entire width of the
   * container element while hopefully maintaining aspect ratio.
   */
  responsive?: boolean;

  /**
   * Boolean if the lazy loading of the image should be disabled.
   */
  disableLazyLoad?: boolean;
}

interface SourceState {
  src?: string;
  srcSet?: string;
}

/**
 * The LazyImage component is a wrapper for the `<img>` element that adds some
 * nice defaults to only load once the image is visible within the viewport. If
 * you want to prevent page shifting with dynamic loading, it is recommended to
 * apply some styles that set the height and width of this image.
 */
function LazyImage(
  {
    alt = "",
    src: propSrc,
    srcSet: propSrcSet,
    options,
    className,
    responsive = false,
    disableLazyLoad = false,
    ...props
  }: LazyImageProps,
  forwardedRef?: Ref<HTMLImageElement>
): ReactElement {
  const [{ src, srcSet }, setSrc] = useState<SourceState>(() => {
    if (disableLazyLoad || typeof IntersectionObserver === "undefined") {
      return {
        propSrc,
        propSrcSet,
      };
    }

    return {
      src: undefined,
      srcSet: undefined,
    };
  });

  const ref = useRef<HTMLImageElement | null>(null);
  const refCB = useCallback(
    (instance: HTMLImageElement | null) => {
      applyRef(instance, forwardedRef);
      ref.current = instance;
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (
      disableLazyLoad ||
      !ref.current ||
      src ||
      srcSet ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSrc({ src: propSrc, srcSet: propSrcSet });
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [disableLazyLoad, options, propSrc, propSrcSet, src, srcSet]);

  return (
    <img
      {...props}
      ref={refCB}
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={cn(
        {
          "rmd-media": responsive,
        },
        className
      )}
    />
  );
}

const ForwardedLazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  LazyImage
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedLazyImage.propTypes = {
      alt: PropTypes.string,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string,
      sizes: PropTypes.string,
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

export default ForwardedLazyImage;
