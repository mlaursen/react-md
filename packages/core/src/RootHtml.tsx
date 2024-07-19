import {
  type HTMLAttributes,
  type HtmlHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { type PropsWithRef } from "./types.js";

/**
 * @since 6.0.0
 */
export interface RootHtmlProps extends HtmlHTMLAttributes<HTMLHtmlElement> {
  /** @defaultValue `"ltr"` */
  dir?: string;

  /** @defaultValue `"en"` */
  lang?: string;

  /**
   * Any additional props to provide to the `<body>` element and also supports a
   * `ref` if that is required for some reason. Using a `ref` would make your
   * root layout a client component though.
   */
  bodyProps?: PropsWithRef<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;

  /**
   * Convenience prop to replace `bodyProps={{ className: "custom-class-name" }}`.
   */
  bodyClassName?: string;

  /**
   * Any content to render before the `<body>` tag. This can be useful if you
   * need to render a custom `<head>` element.
   */
  beforeBodyChildren?: ReactNode;

  /**
   * Any content to render after the `<body>` tag. This can be useful to insert
   * `<script>` tags for analytics or other external libraries.
   */
  afterBodyChildren?: ReactNode;
}

/**
 * This is mostly for creating the root html for next.js applications that
 * defaults to setting the `dir="ltr"` and `lang="en"`. Additional props can be
 * passed to the root `<html>` and `<body>` elements and children can be
 * rendered before and after the `<body>` if needed.
 *
 * @example Simple Example
 * ```tsx
 * // src/app/layout.tsx
 * import { RootHtml } from "@react-md/core";
 * import { type ReactElement, type PropsWithChildren } from "react";
 * import { Roboto_Flex } from "next/font/google";
 *
 * const roboto = Roboto_Flex({
 *   subsets: ["latin"],
 *   variable: "--roboto",
 * });
 *
 * export default function RootLayout(props: PropsWithChildren): ReactElement {
 *   const { children } = props;
 *
 *   return <RootHtml className={roboto.variable}>{children}</RootHtml>;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function RootHtml(props: RootHtmlProps): ReactElement {
  const {
    dir = "ltr",
    lang = "en",
    children,
    bodyProps,
    bodyClassName,
    beforeBodyChildren,
    afterBodyChildren,
    ...remaining
  } = props;

  return (
    <html dir={dir} lang={lang} {...remaining}>
      {beforeBodyChildren}
      <body {...bodyProps} className={bodyClassName || bodyProps?.className}>
        {children}
      </body>
      {afterBodyChildren}
    </html>
  );
}
