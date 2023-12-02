import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { type PropsWithRef } from "../types.js";
import { avatar, avatarImage, type AvatarClassNameOptions } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-avatar-background-color"?: string;
    "--rmd-avatar-color"?: string;
    "--rmd-avatar-border-color"?: string;
    "--rmd-avatar-border-radius"?: string | number;
    "--rmd-avatar-size"?: string | number;
    "--rmd-avatar-font-size"?: string | number;
  }
}

export type AvatarImgAttributes = ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    AvatarClassNameOptions {
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
   *
   * @defaultValue `""`
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
  referrerPolicy?: AvatarImgAttributes["referrerPolicy"];

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
  imgProps?: PropsWithRef<AvatarImgAttributes, HTMLImageElement>;
}

/**
 * **Server Component**
 *
 * An `Avatar` is generally used to represent objects or people within your app.
 * The avatar can consist of an image, an icon, or some text to display. When
 * the avatar is not an image, different themes can be applied to make the
 * avatar more unique.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Avatar } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * export function Example(): ReactElement {
 *   return <Avatar src="/path-to-img.png" />;
 * }
 * ```
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      className,
      children,
      src,
      alt = "",
      size = "avatar",
      color = "",
      theme,
      imgProps,
      referrerPolicy,
      ...remaining
    } = props;

    let img;
    if (src || imgProps) {
      img = (
        <img
          src={src}
          alt={alt}
          referrerPolicy={referrerPolicy}
          {...imgProps}
          className={avatarImage({ className: imgProps?.className })}
        />
      );
    }

    return (
      <span
        {...remaining}
        ref={ref}
        role="presentation"
        className={avatar({
          size,
          color,
          theme,
          className,
        })}
      >
        {img}
        {children}
      </span>
    );
  }
);
