import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

const AppBarSassDoc = () => <PackageSassDoc name="AppBar" sassdoc={sassdoc} />;

export default AppBarSassDoc;
