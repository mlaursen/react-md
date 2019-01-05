import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

// remove all color variable constants
sassdoc.variables = sassdoc.variables.filter(variable => !/base|[0-9]$/.test(variable.name));

const ThemeSassDoc = () => <PackageSassDoc name="Theme" sassdoc={sassdoc} />;

export default ThemeSassDoc;
