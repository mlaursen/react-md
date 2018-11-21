import * as React from "react";
import * as Router from "react-router";
import { Text } from "@react-md/typography";

import "./not-found.scss";

const svg = require("./404.svg");

const NotFound: React.FunctionComponent<Router.RouteComponentProps<void>> = () => (
  <div className="not-found">
    <div dangerouslySetInnerHTML={{ __html: svg }} />
    <Text type="headline-2" component="h4" className="not-found__uhhh">
      Uhhh...
    </Text>
    <Text type="headline-5" component="h4" className="not-found__oops">
      Looks like the page can not be found.
    </Text>
  </div>
);

export default NotFound;
