import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

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
function Avatar(
  { className, children, src, alt = "", color = "", ...props }: AvatarProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement {
  let img;
  if (src) {
    img = <img src={src} alt={alt} className={block("image")} />;
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
}

const ForwardedAvatar = forwardRef<HTMLSpanElement, AvatarProps>(Avatar);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedAvatar.propTypes = {
      alt: PropTypes.string,
      src: PropTypes.string,
      color: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedAvatar;
