import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

// const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;
const sassdoc: IFlattenedSassDoc = {
  mixins: [],
  functions: [],
  variables: [],
};

const MenuSassDoc = () => <PackageSassDoc name="Menu" sassdoc={sassdoc} />;

export default MenuSassDoc;
