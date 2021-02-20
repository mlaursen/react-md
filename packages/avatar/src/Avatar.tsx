import React, { forwardRef, HTMLAttributes, ImgHTMLAttributes } from "react";
import cn from "classnames";
import { bem, PropsWithRef } from "@react-md/utils";

type ImgAttributes = ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * This should be an image `src` attribute to create an avatar from. When this
   * prop is defined, you should not add any children to the avatar as the
   * positioning will break.
   */
  src?: string;

  /**
   * An optional alt tag to display on the `<img>` when the `src` prop is also
   * applied.
   *
   * For accessibility and screen readers, you normally do not want to actually
   * provide this prop. This should only be used if the `Avatar` is not
   * accompanied by some other component or main content as it will be extra
   * noise for screen readers.
   */
  alt?: string;

  /**
   * An optional `referrerPolicy` to provide to the `<img>` element if the `src`
   * or `imgProps` props are provided.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-referrerpolicy|Referrer Policy}
   *
   * @remarks \@since 2.2.0
   */
  referrerPolicy?: ImgAttributes["referrerPolicy"];

  /**
   * An optional object of image props and ref that can be used to create an
   * image within the `Avatar`. This can be useful to add a custom `style`
   * or`className` to the `<img>` element if that additional customization is
   * needed.
   *
   * Note: The values in this object will override the `src`, `alt`, and
   * `referrerPolicy` root level avatar props if they exist on this object.
   *
   * @remarks \@since 2.2.0
   */
  imgProps?: PropsWithRef<ImgAttributes, HTMLImageElement>;

  /**
   * An optional color to apply to the avatar. This will apply a className of
   * `rmd-avatar--${color}`, so only the keys from the `$rmd-avatar-colors` Map
   * are supported by default. It is recommended to create custom colors using
   * the `rmd-avatar-theme-update-var` mixin with custom class names if the
   * default colors aren't extensive enough.
   */
  color?: string;
}

const block = bem("rmd-avatar");

/**
 * An `Avatar` is generally used to represent objects or people within your app.
 * The avatar can consist of an image, an icon, or some text to display. When
 * the avatar is not an image, different themes can be applied to make the
 * avatar more unique.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    className,
    children,
    src,
    alt = "",
    color = "",
    imgProps,
    referrerPolicy,
    ...props
  },
  ref
) {
  let img;
  if (src || imgProps) {
    img = (
      <img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        {...imgProps}
        className={cn(block("image"), imgProps?.className)}
      />
    );
  }

  return (
    <span
      {...props}
      ref={ref}
      className={cn(block({ [color]: color }), className)}
    >
      {img}
      {children}
    </span>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Avatar.propTypes = {
      alt: PropTypes.string,
      src: PropTypes.string,
      color: PropTypes.string,
      className: PropTypes.string,
      children: PropTypes.node,
      // Note: The MDN website has a lot more values, but this is what Typescript
      // says is valid at the time of writing this
      referrerPolicy: PropTypes.oneOf(["no-referrer", "origin", "unsafe-url"]),
      imgProps: PropTypes.object,
    };
  } catch (e) {}
}
