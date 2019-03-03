import React, { FunctionComponent, Fragment } from "react";
import { Text, TextContainer } from "@react-md/typography";
import PackageHome from "components/PackageHome";

const Theme: FunctionComponent = () => {
  return (
    <Fragment>
      <PackageHome name="theme" />
    </Fragment>
  );
};

export default Theme;
