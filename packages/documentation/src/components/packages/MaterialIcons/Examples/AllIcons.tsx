import * as React from "react";
import cn from "classnames";
import { ExampleTitle } from "components/ExamplesPage";
import { IFontIconProps } from "@react-md/icon";
import { MagicTooltip } from "@react-md/tooltip";
import * as MaterialIcons from "@react-md/material-icons";

interface IIcon {
  name: string;
  icon: React.ComponentType<IFontIconProps>;
}

import "./all-icons.scss";

const { font, svg } = Object.keys(MaterialIcons).reduce(
  (icons, key) => {
    const icon = (MaterialIcons as { [key: string]: React.StatelessComponent })[key];
    if (key.endsWith("FontIcon")) {
      icons.font.push({ icon, name: key });
    } else {
      icons.svg.push({ icon, name: key });
    }

    return icons;
  },
  { font: [] as IIcon[], svg: [] as IIcon[] }
);

const AllIcons = () => (
  <React.Fragment>
    <ExampleTitle>Font Icons</ExampleTitle>
    {font.map(({ icon, name }, i) => {
      const tooltipId = `font-icon-tooltip-${i}`;

      return (
        <div
          key={name}
          className={cn("material-icons__example", {
            "material-icons__example--last": i === font.length - 1,
          })}
          aria-describedby={tooltipId}
        >
          {React.createElement(icon)}
          <div className="material-icons__label">{name}</div>
          <MagicTooltip id={tooltipId}>{name}</MagicTooltip>
        </div>
      );
    })}
    <ExampleTitle>SVG Icons</ExampleTitle>
    {svg.map(({ icon, name }, i) => {
      const tooltipId = `svg-icon-tooltip-${i}`;

      return (
        <div
          key={name}
          className={cn("material-icons__example", {
            "material-icons__example--last": i === font.length - 1,
          })}
          aria-describedby={tooltipId}
        >
          {React.createElement(icon)}
          <div className="material-icons__label">{name}</div>
          <MagicTooltip id={tooltipId}>{name}</MagicTooltip>
        </div>
      );
    })}
  </React.Fragment>
);

export default AllIcons;
