import { NextComponentType, NextPageContext } from "next";
import Router from "next/router";

export interface RedirectConfig {
  concat?: boolean;
  statusCode?: number;
}

type NextFunctionComponent = NextComponentType<NextPageContext, {}, {}>;

/**
 * Creates a component that will redirect with nextjs. This should be
 * used from te `pages` folder.
 */
export default function redirect(
  to: string,
  { concat = true, statusCode = 302 }: RedirectConfig = {}
): NextFunctionComponent {
  const Redirect: NextFunctionComponent = () => null;

  Redirect.getInitialProps = ({ res, pathname }) => {
    const indexPath = concat ? `${pathname}/${to}` : to;

    if (res) {
      res.writeHead(statusCode, {
        Location: indexPath,
      });
      res.end();
    } else {
      Router.replace(indexPath);
    }

    return {};
  };

  return Redirect;
}
