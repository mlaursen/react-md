import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

const TreeViewSassDoc = () => <PackageSassDoc name="TreeView" sassdoc={sassdoc} />;

export default TreeViewSassDoc;
