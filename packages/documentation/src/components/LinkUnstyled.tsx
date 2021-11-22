import { AnchorHTMLAttributes, ReactElement } from "react";
import Link, { LinkProps } from "next/link";

export interface LinkUnstyledProps
  extends Omit<LinkProps, "children" | "passHref" | "onError" | "as">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onError" | "href"> {}

export default function LinkUnstyled({
  shallow,
  scroll,
  replace,
  href,
  children,
  ...props
}: LinkUnstyledProps): ReactElement {
  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a {...props} href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link shallow={shallow} scroll={scroll} replace={replace} href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
}
