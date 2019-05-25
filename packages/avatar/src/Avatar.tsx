import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * This should be an image `src` attribute to create an avatar from. When
   * this prop is defined, you should not add any children to the avatar as
   * the positioning will break.
   */
  src?: string;

  /**
   * An optional alt tag to display on the `<img>` when the `src` prop is also
   * applied.
   *
   * For accessibility and screen readers, you normally do not want to actually
   * provide this prop. This should only be used if the `Avatar` is not accompanied
   * by some other component or main content as it will be extra noise for screen
   * readers.
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

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<Pick<AvatarProps, "alt" | "color">>;
type AvatarWithDefaultProps = AvatarProps & DefaultProps & WithRef;

const block = bem("rmd-avatar");

/**
 * An `Avatar` is generally used to represent objects or people within your app.
 * The avatar can consist of an image, an icon, or some text to display. When
 * the avatar is not an image, different themes can be applied to make the avatar
 * more unique.
 */
const Avatar: FC<AvatarProps & WithRef> = providedProps => {
  const {
    className,
    children,
    src,
    alt,
    forwardedRef,
    color,
    ...props
  } = providedProps as AvatarWithDefaultProps;

  let img;
  if (src) {
    img = <img src={src} alt={alt} className={block("image")} />;
  }

  return (
    <span
      {...props}
      ref={forwardedRef}
      className={cn(block({ [color]: color }), className)}
    >
      {img}
      {children}
    </span>
  );
};

const defaultProps: DefaultProps = {
  color: "",
  alt: "",
};

Avatar.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Avatar.displayName = "Avatar";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Avatar.propTypes = {
      alt: PropTypes.string,
      src: PropTypes.string,
      color: PropTypes.string,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => (
  <Avatar {...props} forwardedRef={ref} />
));
