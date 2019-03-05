import React, { Fragment, FunctionComponent } from "react";
import PackageHome from "components/PackageHome";

const description = `
The \`@react-md/theme\` package is used to create a theme for your application as
well as define all the base material design colors as variables for quick usage.
`;

const Theme: FunctionComponent = () => {
  return (
    <Fragment>
      <PackageHome name="theme" description={description} />
    </Fragment>
  );
};

export default Theme;
