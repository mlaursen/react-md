import React, { FC, HTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import useLinkPrefetch from "hooks/useLinkPrefetch";

export interface LinkUnstyledProps
  extends Omit<LinkProps, "children" | "passHref" | "onError">,
    Omit<HTMLAttributes<HTMLAnchorElement>, "onError"> {
  href: string;
}

const LinkUnstyled: FC<LinkUnstyledProps> = ({
  prefetch,
  shallow,
  scroll,
  replace,
  href,
  as,
  children,
  onMouseEnter,
  onKeyUp,
  ...props
}) => {
  const handlers = useLinkPrefetch({
    href,
    onMouseEnter,
    onKeyUp,
    disabled: !prefetch,
  });

  return (
    <Link
      shallow={shallow}
      scroll={scroll}
      replace={replace}
      href={href}
      as={as}
    >
      <a
        {...props}
        {...handlers}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    </Link>
  );
};

LinkUnstyled.defaultProps = {
  scroll: false,
  prefetch: true,
};

export default LinkUnstyled;
