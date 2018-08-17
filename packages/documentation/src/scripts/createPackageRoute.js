const fs = require('fs-extra');
const path = require('path');
const commander = require('commander');
const _ = require('lodash');
const createInstallationPage = require('./createInstallationPage');

let name = '';
let packageName = '';
commander
  .usage('<package> [options]')
  .option('--no-sassdoc', 'Updates the component creation to not do anything with SassDoc')
  .option('--no-proptypes', 'Updates the component creation to not do anything with PropTypes')
  .arguments('<package>')
  .action((n) => {
    name = n.split('-').map(_.upperFirst).join('');
    packageName = n;
  })
  .parse(process.argv);

if (!name) {
  throw new Error('A package name is required!');
  process.exit(1);
}

let propTypesRoute = '';
let propTypesLoader = '';
let sassDocRoute = '';
let sassDocLoader = '';
if (commander.proptypes) {
  propTypesLoader = `
const PropTypes = Loadable(() => import("./PropTypes"));
`;
  propTypesRoute = `
    <Route path={\`\${match.path}/proptypes\`} component={PropTypes} />`;
}

if (commander.sassdoc) {
  sassDocLoader = `
const SassDoc = Loadable(() => import("./SassDoc"));
`;

  sassDocRoute = `
    <Route path={\`\${match.path}/sassdoc\`} component={SassDoc} />`;
}

const ROUTE_TEMPLATE = `import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Installation = Loadable(() => import("./Installation"));

const Examples = Loadable(() => import("./Examples"));
${propTypesLoader}${sassDocLoader}
const ${name}: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={\`\${match.path}/installation\`} />
    <Route exact={true} path={\`\${match.path}/installation\`} component={Installation} />
    <Route path={\`\${match.path}/examples\`} component={Examples} />${propTypesRoute}${sassDocRoute}
    <Route component={NotFound} />
  </Switch>
);

export default ${name};
`;

const MAIN_INDEX = `import ${name} from "./${name}"

export default ${name};
`;
const EXAMPLES_INDEX = `import Examples from "./Examples"

export default Examples;
`;

const EXAMPLES_TEMPLATE = `import * as React from "react";

import { default as ExamplesPage, ExampleList } from "components/ExamplesPage";

const examples: ExampleList = [];

const Examples = () => <ExamplesPage title="${name}" examples={examples} />;

export default Examples;
`;

const PROPTYPES_PAGE_TEMPLATE = `import * as React from "react";

const PropTypes = () => null;

export default PropTypes;
`;

const SASSDOC_PAGE_TEMPLATE = `import * as React from "react";

const SassDoc = () => null;

export default SassDoc;
`;

const componentsFolder= path.join(process.cwd(), 'src', 'components');
const rootFolder = path.join(componentsFolder, 'packages', name);
const examplesFolder = path.join(rootFolder, 'Examples');

(async function() {
  await fs.ensureDir(rootFolder);
  await fs.ensureDir(examplesFolder);

  await Promise.all([
    fs.outputFile(path.join(rootFolder, "index.ts"), MAIN_INDEX),
    fs.outputFile(path.join(rootFolder, `${name}.tsx`), ROUTE_TEMPLATE),
    createInstallationPage(packageName),
    fs.outputFile(path.join(examplesFolder, "index.ts"), EXAMPLES_INDEX),
    fs.outputFile(path.join(examplesFolder, "Examples.tsx"), EXAMPLES_TEMPLATE),
    !commander.proptypes ? Promise.resolve() : fs.outputFile(path.join(rootFolder, "PropTypes.tsx"), PROPTYPES_PAGE_TEMPLATE),
    !commander.sassdoc ? Promise.resolve() : fs.outputFile(path.join(rootFolder, "SassDoc.tsx"), SASSDOC_PAGE_TEMPLATE),
  ]);
  console.log('Done!');
})();
