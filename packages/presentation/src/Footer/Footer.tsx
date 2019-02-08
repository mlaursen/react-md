import React, { FunctionComponent } from "react";
import cn from "classnames";
import { withRouter } from "react-router";
import { HomeSVGIcon } from "@react-md/material-icons";
import { Portal } from "@react-md/portal";
import { Text } from "@react-md/typography";
import Link from "../Link";

import "./footer.scss";

const Footer: FunctionComponent<any> = ({ location: { pathname } }) => {
  const isHome = pathname === "/";
  return (
    <Portal visible>
      <footer
        className={cn("footer", {
          "footer--intro": isHome,
          "footer--to-home": !isHome,
        })}
      >
        {!isHome && (
          <Link to="/">
            <HomeSVGIcon />
          </Link>
        )}
        {isHome && (
          <Text>
            This presentation was created with{" "}
            <code className="code">React</code> and{" "}
            <code className="code">create-react-app</code>
          </Text>
        )}
      </footer>
    </Portal>
  );
};

export default withRouter(Footer);
