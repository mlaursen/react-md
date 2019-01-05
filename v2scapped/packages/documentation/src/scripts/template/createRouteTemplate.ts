/**
 * Creates the file contents for a react-md package's "main" route file. This will
 * conditionally render the PropTypes and SassDoc routes as needed.
 */
export default function createRouteTemplate(name: string, propTypes: boolean, sassdoc: boolean) {
  let propTypesRoute = "";
  let propTypesComponent = "";
  if (propTypes) {
    propTypesRoute = `
    <Route path={\`\${match.path}/proptypes\`} component={${name}PropTypes} />`;

    propTypesComponent = `
const ${name}PropTypes = Loadable(() => import("./${name}PropTypes"));`;
  }

  let sassdocRoute = "";
  let sassdocComponent = "";
  if (sassdoc) {
    sassdocRoute = `
    <Route path={\`\${match.path}/sassdoc\`} component={${name}SassDoc} />`;
    sassdocComponent = `
const ${name}SassDoc = Loadable(() => import("./${name}SassDoc"));`;
  }

  return `import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));${propTypesComponent}${sassdocComponent}

const ${name}: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={\`\${match.path}/examples\`} />
    <Route path={\`\${match.path}/examples\`} component={Examples} />${propTypesRoute}${sassdocRoute}
    <Route component={NotFound} />
  </Switch>
);

export default ${name};
`;
}
