import * as React from "react";

import { IFlattenedSassDoc } from "types/sassdoc";
import PackageSassDoc from "components/PackageSassDoc";

const sassdoc = require("./sassdoc.json") as IFlattenedSassDoc;

const LinkSassDoc = () => <PackageSassDoc name="Link" sassdoc={sassdoc} />;

export default LinkSassDoc;
