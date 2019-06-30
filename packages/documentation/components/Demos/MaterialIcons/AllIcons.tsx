import React, { FC, Fragment } from "react";
import * as MaterialIcons from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

import Code from "components/Code/Code";

import "./all-icons.scss";

const allIcons = Object.entries(MaterialIcons).filter(([name]) =>
  name.endsWith("SVGIcon")
);

const AllIcons: FC = () => (
  <div className="all-icons-container">
    {allIcons.map(([name, Icon]) => (
      <div key={name} className="all-icons__info">
        <Icon />
        <Tooltipped id={`icon-${name}`} tooltip={name}>
          {({ tooltip, ...a11y }) => (
            <Fragment>
              <Code {...a11y} className="all-icons__name" tabIndex={0}>
                {name.replace(/SVGIcon/, "")}
              </Code>
              {tooltip}
            </Fragment>
          )}
        </Tooltipped>
      </div>
    ))}
  </div>
);

export default AllIcons;
