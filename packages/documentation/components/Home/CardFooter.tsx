import React, { FunctionComponent, Fragment, ReactNode } from "react";
import Link from "next/link";
import { buttonThemeClassNames } from "@react-md/button";
import { Divider } from "@react-md/divider";

export interface ICardFooterProps {
  href: string;
  children: ReactNode;
}

const CardFooter: FunctionComponent<ICardFooterProps> = ({
  href,
  children,
}) => (
  <Fragment>
    <Divider />
    <footer className="home__card-footer">
      <Link href={href} prefetch>
        <a className={buttonThemeClassNames({ themeType: "outline" })}>
          {children}
        </a>
      </Link>
    </footer>
  </Fragment>
);

export default CardFooter;
