import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

const ListSassDoc = () => <PackageSassDoc name="List" sassdoc={sassdoc} />;

export default ListSassDoc;
