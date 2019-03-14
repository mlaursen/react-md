import React, { FunctionComponent } from "react";
import { SimpleListItem } from "@react-md/list";
import scssVariables from "@react-md/list/dist/scssVariables";
import * as MaterialIcons from "@react-md/material-icons";
import { unitToNumber } from "@react-md/utils";

import "./all-icons.scss";
import Code from "components/Code/Code";

const allIcons = Object.entries(MaterialIcons).filter(([name]) =>
  name.endsWith("SVGIcon")
);

const AllIcons = () => (
  <div className="all-icons-container">
    {allIcons.map(([name, Icon]) => (
      <div key={name} className="all-icons__info">
        <Icon />
        <Code className="all-icons__name">{name.replace(/SVGIcon/, "")}</Code>
      </div>
    ))}
  </div>
);

export default AllIcons;
